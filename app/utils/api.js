const CLIENT_ID = 'CLIENT_ID'
const CLIENT_SECRET = 'CLIENT_SECRET'

const params = `?client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}`

async function getProfile(username) {
    const URL = `https://api.github.com/users/${username}${params}`

    const response = await fetch(URL)

    return response.json()
}

async function getRepos(username) {
    const URL = `https://api.github.com/users/${username}/repos${params}&per_page=100`

    const response = await fetch(URL).catch(handleError)

    return response.json()
}

const getStarCount = repos =>
    repos.reduce((count, repo) => count + repo.stargazers_count, 0)

const calculateScore = (profile, repos) =>
    profile.followers * 3 + getStarCount(repos)

const handleError = error => {
    console.warn(error)
    return null
}

async function getUserData(player) {
    const [profile, repos] = await Promise.all(
        getProfile(player),
        getRepos(player)
    )

    return {
        profile,
        score: calculateScore(profile, repos),
    }
}

const sortPlayers = players => players.sort((a, b) => b.score - a.score)

export async function battle(players) {
    const result = await Promise.all(players.map(getUserData)).catch(
        handleError
    )

    return results === null ? result : sortPlayers(players)
}

export async function fetchPopularRepos(language) {
    const encodedURI = `https://api.github.com/search/repositories?q=stars:>1+language:${language}&sort=star&order=desc&type=Repositories`

    const response = await fetch(encodedURI).catch(handleError)

    const repos = await response.json()

    return repos.items        .
}
