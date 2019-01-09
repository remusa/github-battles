import React, { Component } from 'react'

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
        const languages = ['All', 'JavaScript', 'Ruby', 'Java', 'CSS', 'Python']

        return (
            <ul className='languages'>
                {/* this.updateLanguage.bind(null, lang) returns a new function but doesn't invoke
                            it */}

                {languages.map(
                    lang => (
                        <li
                            style={
                                lang === this.state.selectedLanguage
                                    ? { color: '#d8021b' }
                                    : null
                            }
                            key={lang}
                            onClick={this.updateLanguage.bind(null, lang)}>
                            {lang}
                        </li>
                    )}
            </ul>
        )
    }
}

export default Popular
