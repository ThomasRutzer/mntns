export interface GithubApiClientInterface {
    getUserRepos(userName: string)
    getCommits(repoName: string, userName: string)
}
