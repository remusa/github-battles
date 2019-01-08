import React, { Component } from 'react'
import ReactDOM from 'react-dom'

import './index.css'

// state
// lifecycle events
// UI

// Separations of concerns doesn't happen at the technology level, but at the component level

class App extends Component {
    render() {
        return <div>Hello World!</div>
    }
}

ReactDOM.render(<App />, document.getElementById('app'))
