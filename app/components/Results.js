import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import queryString from 'query-string'

import PlayerPreview from './PlayerPreview'
import Loading from './Loading'

import api from '../utils/api'

const Profile = props => {
    const { info } = props

    return (
        <PlayerPreview avatar={info.avatar_url} username={info.login}>
            <ul className='space-list-items'>
                {info.name && <li>{info.name}</li>}
                {info.location && <li>{info.location}</li>}
                {info.company && <li>{info.company}</li>}
                <li>Followers: {info.followers}</li>
                <li>Following: {info.following}</li>
                <li>Public Repos: {info.public_repos}</li>
                {info.blog && (
                    <li>
                        <a href={info.blog}>{info.blog}</a>
                    </li>
                )}
            </ul>
        </PlayerPreview>
    )
}

Profile.propTypes = {
    info: PropTypes.object.isRequired,
}

const Player = props => (
    <div>
        <h1 className='header'>{props.label}</h1>
        <img className='avatar' src={props.profile.avatar_url} />
        <h3 style={{ textAlign: 'center' }}>Score: {props.score}</h3>
    </div>
)

Player.propTypes = {
    label: PropTypes.string.isRequired,
    score: PropTypes.number.isRequired,
    profile: PropTypes.object.isRequired,
}

class Results extends Component {
    constructor(props) {
        super(props)

        this.state = {
            winner: null,
            loser: null,
            error: null,
            loading: true,
        }
    }

    componentDidMount() {
        const playersArr = queryString.parse(this.props.location.search)

        api.battle([playersArr.playerOneName, playersArr.playerTwoName]).then(
            players => {
                if (players === null) {
                    this.setState({
                        error:
                            'Looks like there was an error. Check that both users exist on Github.',
                        loading: false,
                    })
                }

                this.setState({
                    error: null,
                    winner: players[0],
                    loser: players[1],
                    loading: false,
                })
            }
        )
    }

    render() {
        const { winner, loser, error, loading } = this.state

        if (loading) {
            return <Loading text='Loading' speed={500} />
        }

        if (error) {
            return (
                <div>
                    <p>{error}</p>
                    <Link to='/battle'>Reset</Link>
                </div>
            )
        }

        return (
            <div className='row'>
                <Player
                    label='Winner'
                    score={winner.score}
                    profile={winner.profile}
                />

                <Player
                    label='Loser'
                    score={loser.score}
                    profile={loser.profile}
                />
            </div>
        )
    }
}

export default Results
