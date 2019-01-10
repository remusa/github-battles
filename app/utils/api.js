const CLIENT_ID = 'CLIENT_ID'
const CLIENT_SECRET = 'CLIENT_SECRET'

const params = `?client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}`

const getProfile = username => {
    const URL = `https://api.github.com/users/${username}${params}`
    return fetch(URL)
        .then(res => res.json())
        .catch(err => console.log('Error fetching username: ', err))
}

const getRepos = username => {
    const URL = `https://api.github.com/users/${username}/repos${params}&per_page=100`

    return fetch(URL)
        .then(res => res.json())
        .catch(err => console.log('Error fetching repos: ', err))
}

const getStarCount = repos =>
    repos.reduce((count, repo) => count + repo.stargazers_count, 0)

const calculateScore = (profile, repos) =>
    profile.followers * 3 + getStarCount(repos)

const handleError = error => {
    console.warn(error)
    return null
}

const getUserData = player => {
    const promisesArray = [getProfile(player), getRepos(player)]

    return Promise.all(promisesArray).then(data => {
        const [profile, repos] = data
        return {
            profile,
            score: calculateScore(profile, repos),
        }
    })
}

const sortPlayers = players => players.sort((a, b) => b.score - a.score)

const battle = players => {
    const promise = players.map(getUserData)

    return Promise.all(promise)
        .then(sortPlayers)
        .catch(handleError)
}

const fetchPopularRepos = language => {
    const encodedURI = `https://api.github.com/search/repositories?q=stars:>1+language:${language}&sort=star&order=desc&type=Repositories`

    return fetch(encodedURI)
        .then(res => res.json())
        .then(res => res.items)
        .catch(err => console.log('Error fetching popular repos: ', err))
}

export default { battle, fetchPopularRepos }
