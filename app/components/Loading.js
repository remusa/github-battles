import React, { Component } from 'react'
import PropTypes from 'prop-types'

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
    constructor(props) {
        super(props)

        this.state = {
            text: props.text,
            speed: props.speed,
        }
    }

    componentDidMount() {
        const stopper = this.props.text + '...'

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

Loading.defaultProps = {
    text: 'Loading',
    speed: 300,
}

Loading.propTypes = {
    text: PropTypes.string.isRequired,
    speed: PropTypes.number.isRequired,
}

export default Loading
