import React, { Component } from 'react'

import PropTypes from 'prop-types'

const SelectedLanguage = props => {
    const languages = ['All', 'JavaScript', 'Ruby', 'Java', 'CSS', 'Python']

    return (
        <ul className='languages'>
            {languages.map(lang => (
                <li
                    style={
                        lang === props.selectedLanguage
                            ? { color: '#d8021b' }
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

SelectedLanguage.prototype = {
    selectedLanguage: PropTypes.string.isRequired,
    onSelect: PropTypes.func.isRequired,
}

class Popular extends Component {
    constructor(props) {
        super(props)

        this.state = {
            selectedLanguage: 'All',
        }

        this.updateLanguage = this.updateLanguage.bind(this)
    }

    updateLanguage(lang) {
        this.setState({
            selectedLanguage: lang,
        })
    }

    render() {
        return (
            <div>
                <SelectedLanguage
                    selectedLanguage={this.state.selectedLanguage}
                    onSelect={this.updateLanguage}
                />
            </div>
        )
    }
}

export default Popular
