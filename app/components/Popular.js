import React, { Component } from 'react'
import PropTypes from 'prop-types'

import Loading from './Loading'

import api from '../utils/api'

const SelectedLanguage = props => {
    const languages = ['All', 'JavaScript', 'Ruby', 'Java', 'CSS', 'Python']

    return (
        <ul className='languages'>
            {languages.map(lang => (
                <li
                    style={
                        lang === props.selectedLanguage
                            ? { color: 'var(--color-red)' }
                            : null
                    }
                    key={lang}
                    onClick={props.onSelect.bind(null, lang)}>
                    {lang}
                </li>
            ))}
        </ul>
    )
}

SelectedLanguage.propTypes = {
    selectedLanguage: PropTypes.string.isRequired,
    onSelect: PropTypes.func.isRequired,
}

const RepoGrid = props => {
    const { repos } = props

    return (
        <ul className='popular-list'>
            {repos.map((repo, i) => (
                <li key={repo.name} className='popular-item'>
                    <div className='popular-rank'>#{i + 1}</div>
                    <ul className='space-list-items'>
                        <li>
                            <img
                                className='avatar'
                                src={repo.owner.avatar_url}
                                alt={`Avatar for ${repo.owner.login}`}
                            />
                        </li>
                        <li>
                            <a href={repo.html_url}>{repo.name}</a>
                        </li>
                        <li>@{repo.owner.login}</li>
                        <li>{repo.stargazers_count} stars</li>
                    </ul>
                </li>
            ))}
        </ul>
    )
}

RepoGrid.propTypes = {
    repos: PropTypes.array.isRequired,
}

class Popular extends Component {
    constructor(props) {
        super(props)

        this.state = {
            selectedLanguage: 'All',
            repos: null,
        }

        this.updateLanguage = this.updateLanguage.bind(this)
    }

    updateLanguage(lang) {
        this.setState({
            selectedLanguage: lang,
            repos: null,
        })

        api.fetchPopularRepos(lang).then(repos => {
            this.setState({
                repos: repos,
            })
        })
    }

    componentDidMount() {
        this.updateLanguage(this.state.selectedLanguage)
    }

    componentWillUnmount() {
        return null
    }

    render() {
        return (
            <div>
                <SelectedLanguage
                    selectedLanguage={this.state.selectedLanguage}
                    onSelect={this.updateLanguage}
                />
                {!this.state.repos ? (
                    <Loading text='Downloading' speed={500} />
                ) : (
                    <RepoGrid repos={this.state.repos} />
                )}
            </div>
        )
    }
}

export default Popular
