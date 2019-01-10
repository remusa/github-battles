import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

import PlayerPreview from './PlayerPreview'

class PlayerInput extends Component {
    constructor(props) {
        super(props)

        this.state = {
            username: '',
        }

        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleChange(event) {
        this.setState({
            username: event.target.value,
        })
    }

    handleSubmit(event) {
        event.preventDefault()

        this.props.onSubmit(this.props.id, this.state.username) // passing the 2 values to the parent component
    }

    render() {
        return (
            <form className='column' onSubmit={this.handleSubmit}>
                <label className='header' htmlFor='username'>
                    {this.props.label}
                </label>

                <input
                    id='username'
                    placeholder='github username'
                    type='text'
                    autoComplete='off'
                    value={this.state.username}
                    onChange={this.handleChange}
                />

                <button
                    className='button'
                    type='submit'
                    disabled={!this.state.username}>
                    Submit
                </button>
            </form>
        )
    }
}

PlayerInput.propTypes = {
    id: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    onSubmit: PropTypes.func.isRequired,
}

class Battle extends Component {
    constructor(props) {
        super(props)

        this.state = {
            playerOneName: '',
            playerOneImage: null,
            playerTwoName: '',
            playerTwoImage: null,
        }

        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleReset = this.handleReset.bind(this)
    }

    handleSubmit(id, username) {
        this.setState(() => {
            const newState = {}

            newState[id + 'Name'] = username
            newState[
                id + 'Image'
            ] = `https://github.com/${username}.png?size=200`

            return newState
        })
    }

    handleReset(id) {
        this.setState(() => {
            const newState = {}

            newState[id + 'Name'] = ''
            newState[id + 'Image'] = null

            return newState
        })
    }

    render() {
        const {
            playerOneName,
            playerOneImage,
            playerTwoName,
            playerTwoImage,
        } = this.state

        const match = this.props.match

        return (
            <div>
                <div className='row'>
                    {!playerOneName && (
                        <PlayerInput
                            id='playerOne'
                            label='Player One'
                            onSubmit={this.handleSubmit}
                        />
                    )}

                    {playerOneImage !== null && (
                        <PlayerPreview
                            avatar={playerOneImage}
                            username={playerOneName}>
                            <button
                                className='reset'
                                // onClick={props.onReset.bind(null, props.id)}
                                onClick={() => this.handleReset('playerOne')}>
                                Reset
                            </button>
                        </PlayerPreview>
                    )}

                    {!playerTwoName && (
                        <PlayerInput
                            id='playerTwo'
                            label='Player Two'
                            onSubmit={this.handleSubmit}
                        />
                    )}

                    {playerTwoImage !== null && (
                        <PlayerPreview
                            avatar={playerTwoImage}
                            username={playerTwoName}>
                            <button
                                className='reset'
                                // onClick={props.onReset.bind(null, props.id)}
                                onClick={() => this.handleReset('playerTwo')}>
                                Reset
                            </button>
                        </PlayerPreview>
                    )}
                </div>
                <div className='row'>
                    {playerOneImage && playerTwoImage && (
                        <Link
                            className='button'
                            to={{
                                pathname: `${match.url}/results`,
                                search: `?playerOneName=${playerOneName}&playerTwoName=${playerTwoName}`,
                            }}>
                            Battle
                        </Link>
                    )}
                </div>
            </div>
        )
    }
}

export default Battle
