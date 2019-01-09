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

export default { fetchPopularRepos }
