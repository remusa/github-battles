import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { fetchPopularRepos } from '../utils/api'
import Loading from './Loading'

const SelectedLanguage = (selectedLanguage, onSelect) => {
    const languages = ['All', 'JavaScript', 'Ruby', 'Java', 'CSS', 'Python']

    return (
        <ul className='languages'>
            {languages.map(lang => (
                <li
                    style={
                        lang === selectedLanguage
                            ? { color: 'var(--color-red)' }
                            : null
                    }
                    key={lang}
                    onClick={() => onSelect(lang)}>
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

const RepoGrid = ({ repos }) => (
    <ul className='popular-list'>
        {repos.map(({ name, stargazers_count, owner, html_url }, i) => (
            <li key={name} className='popular-item'>
                <div className='popular-rank'>#{i + 1}</div>
                <ul className='space-list-items'>
                    <li>
                        <img
                            className='avatar'
                            src={owner.avatar_url}
                            alt={`Avatar for ${owner.login}`}
                        />
                    </li>
                    <li>
                        <a href={html_url}>{name}</a>
                    </li>
                    <li>@{owner.login}</li>
                    <li>{stargazers_count} stars</li>
                </ul>
            </li>
        ))}
    </ul>
)

RepoGrid.propTypes = {
    repos: PropTypes.array.isRequired,
}

class Popular extends Component {
    state = {
        selectedLanguage: 'All',
        repos: null,
    }
    updateLanguage = async lang => {
        this.setState(() => ({
            selectedLanguage: lang,
            repos: null,
        }))

        const repos = await fetchPopularRepos(lang)

        this.setState({
            repos: repos,
        })
    }

    componentDidMount() {
        this.updateLanguage(this.state.selectedLanguage)
    }

    componentWillUnmount() {
        return null
    }

    render() {
        const { selectedLanguage, repos } = this.state

        return (
            <div>
                <SelectedLanguage
                    selectedLanguage={selectedLanguage}
                    onSelect={this.updateLanguage}
                />
                {!this.state.repos ? (
                    <Loading text='Downloading' speed={500} />
                ) : (
                    <RepoGrid repos={repos} />
                )}
            </div>
        )
    }
}

export default Popular
