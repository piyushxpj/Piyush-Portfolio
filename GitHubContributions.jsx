import React, { memo, useEffect, useMemo, useState } from 'react';

const USERNAME = 'piyushxpj';
const EMPTY_WEEKS = Array.from({ length: 53 }, (_, weekIndex) => ({
  firstDay: '',
  contributionDays: Array.from({ length: 7 }, (_, weekday) => ({
    date: '',
    contributionCount: 0,
    contributionLevel: 'NONE',
    weekday,
    key: `${weekIndex}-${weekday}`,
  })),
}));

const LEVEL_CLASS = {
  NONE: 'github-contributions__day--0',
  FIRST_QUARTILE: 'github-contributions__day--1',
  SECOND_QUARTILE: 'github-contributions__day--2',
  THIRD_QUARTILE: 'github-contributions__day--3',
  FOURTH_QUARTILE: 'github-contributions__day--4',
};

function formatDate(date) {
  return new Intl.DateTimeFormat('en', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  }).format(new Date(`${date}T00:00:00`));
}

function getMonthLabels(weeks) {
  const labels = [];
  let lastMonth = null;

  weeks.forEach((week, index) => {
    if (!week.firstDay) return;
    const date = new Date(`${week.firstDay}T00:00:00`);
    const month = date.getMonth();
    if (month !== lastMonth) {
      labels.push({
        index,
        label: date.toLocaleDateString('en', { month: 'short' }),
      });
      lastMonth = month;
    }
  });

  return labels;
}

function GitHubContributions({ compact = false }) {
  const [state, setState] = useState({ status: 'loading', data: null });

  useEffect(() => {
    const controller = new AbortController();

    fetch(`/api/github-contributions?username=${USERNAME}`, { signal: controller.signal })
      .then(async (response) => {
        if (!response.ok) throw new Error('GitHub activity unavailable');
        return response.json();
      })
      .then((data) => setState({ status: 'ready', data }))
      .catch((error) => {
        if (error.name !== 'AbortError') setState({ status: 'error', data: null });
      });

    return () => controller.abort();
  }, []);

  const weeks = state.data?.weeks || EMPTY_WEEKS;
  const monthLabels = useMemo(() => getMonthLabels(weeks), [weeks]);
  const total = state.data?.totalContributions;
  const isReady = state.status === 'ready';
  const accessibleSummary = isReady
    ? `${total.toLocaleString()} GitHub contributions by ${USERNAME} in the last year.`
    : state.status === 'error'
      ? `GitHub contribution calendar for ${USERNAME} is temporarily unavailable.`
      : `GitHub contribution calendar for ${USERNAME} is loading.`;

  return (
    <section
      className={`github-contributions${compact ? ' github-contributions--compact' : ''}`}
      aria-labelledby={`github-contributions-title-${compact ? 'compact' : 'canvas'}`}
    >
      <div className="github-contributions__header">
        <div>
          <p className="github-contributions__kicker">GitHub activity</p>
          <h2 id={`github-contributions-title-${compact ? 'compact' : 'canvas'}`}>
            {isReady ? `${total.toLocaleString()} contributions` : 'Contribution graph'}
          </h2>
        </div>
        <a
          className="github-contributions__profile-link"
          href={`https://github.com/${USERNAME}`}
          target="_blank"
          rel="noreferrer"
        >
          @{USERNAME}
          <svg aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M7 17 17 7M8 7h9v9" />
          </svg>
        </a>
      </div>

      <div className="github-contributions__scroller" tabIndex="0" aria-label="Scrollable GitHub contribution graph">
        <div className={`github-contributions__chart${isReady ? '' : ' github-contributions__chart--muted'}`} role="img" aria-label={accessibleSummary}>
          <div className="github-contributions__months" aria-hidden="true">
            {monthLabels.map((month) => (
              <span key={`${month.label}-${month.index}`} style={{ gridColumnStart: month.index + 1 }}>
                {month.label}
              </span>
            ))}
          </div>

          <div className="github-contributions__body">
            <div className="github-contributions__weekdays" aria-hidden="true">
              <span>Mon</span>
              <span>Wed</span>
              <span>Fri</span>
            </div>
            <div className="github-contributions__weeks" aria-hidden="true">
              {weeks.map((week, weekIndex) => (
                <div className="github-contributions__week" key={week.firstDay || `week-${weekIndex}`}>
                  {week.contributionDays.map((day, dayIndex) => {
                    const label = day.date
                      ? `${day.contributionCount} contribution${day.contributionCount === 1 ? '' : 's'} on ${formatDate(day.date)}`
                      : '';
                    return (
                      <span
                        className={`github-contributions__day ${LEVEL_CLASS[day.contributionLevel] || LEVEL_CLASS.NONE}`}
                        key={day.date || day.key || `${weekIndex}-${dayIndex}`}
                        title={label}
                      />
                    );
                  })}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="github-contributions__footer">
        <p className="github-contributions__status" role="status">
          {state.status === 'loading' && 'Loading activity…'}
          {state.status === 'error' && 'GitHub activity is temporarily unavailable.'}
          {state.status === 'ready' && 'Public and enabled private contributions from the last year.'}
        </p>
        <div className="github-contributions__legend" aria-hidden="true">
          <span>Less</span>
          {[0, 1, 2, 3, 4].map((level) => (
            <i className={`github-contributions__day github-contributions__day--${level}`} key={level} />
          ))}
          <span>More</span>
        </div>
      </div>
    </section>
  );
}

export default memo(GitHubContributions);
