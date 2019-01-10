import axios from 'axios'

const CLIENT_ID = 'CLIENT_ID'
const CLIENT_SECRET = 'CLIENT_SECRET'

const params = `?client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}`

const getProfile = username => {
    const URL = `https://api.github.com/users/${username}${params}`

    // return fetch(URL)
    //     .then(res => res.json())
    //     .catch(err => console.log('Error fetching username: ', err))

    // axios version
    return axios
        .get(URL)
        .then(user => user.data)
        .catch(err => console.log('Error fetching username: ', err))
}

const getRepos = username => {
    const URL = `https://api.github.com/users/${username}/repos${params}&per_page=100`

    // return fetch(URL)
    //     .then(res => res.json())
    //     .catch(err => console.log('Error fetching repos: ', err))

    // axios version
    return axios.get(URL).then(repos => repos.data)
}

const getStarCount = repos =>
    repos.reduce((count, repo) => count + repo.stargazers_count, 0)

const calculateScore = (profile, repos) => {
    const followers = profile.followers
    const totalStars = getStarCount(repos)

    return followers * 3 + totalStars
}

const handleError = error => {
    console.warn(error)
    return null
}

const getUserData = player => {
    // const promisesArray = [getProfile(player), getRepos(player)]

    // Promise.all(promisesArray).then(data => {
    //     const profile = data[0]
    //     const repos = data[1]
    //     // const [profile, repos] = data

    //     return {
    //         profile: profile,
    //         score: calculateScore(profile, repos),
    //     }
    // })

    // axios version
    axios.all([getProfile(player), getRepos(player)]).then(data => {
        const profile = data[0]
        const repos = data[1]

        return {
            profile: profile,
            score: calculateScore(profile, repos),
        }
    })
}

const sortPlayers = players => players.sort((a, b) => b.score - a.score)

const battle = players => {
    // const promise = players.map(getUserData)

    // return Promise.all(promise)
    //     .then(sortPlayers)
    //     .catch(handleError)

    // axios version
    axios
        .all(players.map(getUserData))
        .then(sortPlayers)
        .catch(handleError)
}

const fetchPopularRepos = language => {
    // Using window.encodeURI() is only necessary when using Axios
    // const encodedURI = window.encodeURI(
    //     `https://api.github.com/search/repositories?q=stars:>1+language:${language}&sort=star&order=desc&type=Repositories`
    // )

    const encodedURI = `https://api.github.com/search/repositories?q=stars:>1+language:${language}&sort=star&order=desc&type=Repositories`

    return fetch(encodedURI)
        .then(res => res.json())
        .then(res => res.items)
        .catch(err => console.log('Error fetching popular repos: ', err))
}

export default { battle, fetchPopularRepos }
