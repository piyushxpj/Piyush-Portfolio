import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { fetchGithubContributions } from './api/github-contributions.js';

function githubContributionsDevApi(token) {
  return {
    name: 'github-contributions-dev-api',
    configureServer(server) {
      server.middlewares.use('/api/github-contributions', async (request, response) => {
        const url = new URL(request.url || '/', 'http://localhost');
        const username = url.searchParams.get('username') || 'piyushxpj';

        try {
          const data = await fetchGithubContributions(username, token);
          response.statusCode = 200;
          response.setHeader('Content-Type', 'application/json');
          response.end(JSON.stringify(data));
        } catch (error) {
          response.statusCode = error.code === 'USER_NOT_FOUND' ? 404 : error.code === 'TOKEN_MISSING' ? 503 : 502;
          response.setHeader('Content-Type', 'application/json');
          response.end(JSON.stringify({ error: 'GitHub activity is temporarily unavailable.' }));
        }
      });
    },
  };
}

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');

  return {
    plugins: [react(), tailwindcss(), githubContributionsDevApi(env.GITHUB_TOKEN)],
    server: { port: 5176 },
  };
});
