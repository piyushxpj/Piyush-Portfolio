const CONTRIBUTIONS_QUERY = `
  query Contributions($login: String!) {
    user(login: $login) {
      login
      url
      contributionsCollection {
        contributionCalendar {
          totalContributions
          weeks {
            firstDay
            contributionDays {
              date
              contributionCount
              contributionLevel
            }
          }
        }
      }
    }
  }
`;

const USERNAME_PATTERN = /^[a-z\d](?:[a-z\d-]{0,37}[a-z\d])?$/i;

export async function fetchGithubContributions(username, token, fetchImpl = fetch) {
  if (!USERNAME_PATTERN.test(username)) {
    throw new Error('Invalid GitHub username.');
  }
  if (!token) {
    const error = new Error('GitHub token is not configured.');
    error.code = 'TOKEN_MISSING';
    throw error;
  }

  const upstream = await fetchImpl('https://api.github.com/graphql', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
      'User-Agent': 'piyushjain-portfolio',
    },
    body: JSON.stringify({
      query: CONTRIBUTIONS_QUERY,
      variables: { login: username },
    }),
  });

  if (!upstream.ok) {
    throw new Error(`GitHub returned ${upstream.status}.`);
  }

  const payload = await upstream.json();
  if (payload.errors?.length) {
    throw new Error(payload.errors[0].message || 'GitHub GraphQL request failed.');
  }
  if (!payload.data?.user) {
    const error = new Error('GitHub user not found.');
    error.code = 'USER_NOT_FOUND';
    throw error;
  }

  const calendar = payload.data.user.contributionsCollection.contributionCalendar;
  return {
    login: payload.data.user.login,
    profileUrl: payload.data.user.url,
    totalContributions: calendar.totalContributions,
    weeks: calendar.weeks,
  };
}

export default async function handler(request, response) {
  if (request.method !== 'GET') {
    response.setHeader('Allow', 'GET');
    return response.status(405).json({ error: 'Method not allowed.' });
  }

  const username = String(request.query?.username || 'piyushxpj');

  try {
    const data = await fetchGithubContributions(username, process.env.GITHUB_TOKEN);
    response.setHeader('Cache-Control', 'public, s-maxage=3600, stale-while-revalidate=86400');
    return response.status(200).json(data);
  } catch (error) {
    const status = error.code === 'USER_NOT_FOUND' ? 404 : error.code === 'TOKEN_MISSING' ? 503 : 502;
    return response.status(status).json({ error: 'GitHub activity is temporarily unavailable.' });
  }
}
