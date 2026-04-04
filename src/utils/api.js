import { fetchUserProfile, fetchRepos } from './githubApi';

/**
 * Aggregate GitHub data into a single payload for the App.
 * Returns { profile, repos, languages }
 */
export async function fetchGitHubData() {
  const [profile, repos] = await Promise.all([
    fetchUserProfile(),
    fetchRepos(),
  ]);

  // Aggregate language usage across all repos
  const languages = {};
  repos.forEach((repo) => {
    if (repo.language) {
      languages[repo.language] = (languages[repo.language] || 0) + 1;
    }
  });

  return { profile, repos, languages };
}
