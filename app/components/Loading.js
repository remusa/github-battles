import PropTypes from 'prop-types'
import React, { Component } from 'react'

const containerStyles = {
    content: {
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
}

const styles = {
    content: {
        textAlign: 'center',
        fontSize: '35px',
        color: '#d8021b',
    },
}

class Loading extends Component {
    static defaultProps = {
        text: 'Loading',
        speed: 300,
    }

    static propTypes = {
        text: PropTypes.string.isRequired,
        speed: PropTypes.number.isRequired,
    }

    state = {
        text: this.props.text,
        speed: this.props.speed,
    }

    componentDidMount() {
        const stopper = `${this.props.text}...`

        this.interval = window.setInterval(() => {
            if (this.state.text === stopper) {
                this.setState({
                    text: this.props.text,
                })
            } else {
                this.setState({
                    text: this.state.text.concat('.'),
                })
            }
        }, this.state.speed)
    }

    componentWillUnmount() {
        if (this.interval) {
            window.clearInterval(this.interval)
        }
    }

    render() {
        return (
            <div style={containerStyles.content}>
                <p style={styles.content}>{this.state.text}</p>
            </div>
        )
    }
}

export default Loading
