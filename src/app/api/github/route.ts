import { getGitHubActivity } from '@/lib/github';
import { siteConfig } from '@/lib/site.config';

export const revalidate = 3600;

export async function GET(): Promise<Response> {
  const activity = await getGitHubActivity(siteConfig.githubUsername);
  if (!activity) {
    return Response.json(
      { error: 'Unable to reach GitHub right now.' },
      { status: 502 },
    );
  }
  return Response.json(activity, {
    headers: {
      'Cache-Control':
        'public, s-maxage=3600, stale-while-revalidate=86400',
    },
  });
}
