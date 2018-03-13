export interface GithubApiClientInterface {
    getUserRepos(userName: string, maxItemCount?: number)
    getCommits(repoName: string, userName: string, maxItemCount?: number)
}
