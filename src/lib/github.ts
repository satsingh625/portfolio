import type { GitHubActivity, GitHubRepo } from '@/types';

const GITHUB_API = 'https://api.github.com';

function headers(): HeadersInit {
  const base: HeadersInit = {
    Accept: 'application/vnd.github+json',
    'X-GitHub-Api-Version': '2022-11-28',
  };
  if (process.env.GITHUB_TOKEN) {
    return { ...base, Authorization: `Bearer ${process.env.GITHUB_TOKEN}` };
  }
  return base;
}

/**
 * Fetches a compact snapshot of a user's public GitHub activity.
 * Results are cached by Next's fetch layer for an hour to stay well within
 * the unauthenticated rate limit.
 */
export async function getGitHubActivity(
  username: string,
): Promise<GitHubActivity | null> {
  try {
    const [userRes, reposRes] = await Promise.all([
      fetch(`${GITHUB_API}/users/${username}`, {
        headers: headers(),
        next: { revalidate: 3600 },
      }),
      fetch(
        `${GITHUB_API}/users/${username}/repos?sort=updated&per_page=100`,
        { headers: headers(), next: { revalidate: 3600 } },
      ),
    ]);

    if (!userRes.ok || !reposRes.ok) return null;

    const user = (await userRes.json()) as {
      public_repos: number;
      followers: number;
    };
    const repos = (await reposRes.json()) as Array<
      GitHubRepo & { fork: boolean; archived: boolean }
    >;

    const topRepos = repos
      .filter((r) => !r.fork && !r.archived)
      .sort((a, b) => b.stargazers_count - a.stargazers_count)
      .slice(0, 6)
      .map((r) => ({
        name: r.name,
        description: r.description,
        html_url: r.html_url,
        stargazers_count: r.stargazers_count,
        forks_count: r.forks_count,
        language: r.language,
        updated_at: r.updated_at,
      }));

    return {
      username,
      publicRepos: user.public_repos,
      followers: user.followers,
      topRepos,
      contributionsLastYear: null,
    };
  } catch {
    return null;
  }
}
