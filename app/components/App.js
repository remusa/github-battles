import React, { Component } from 'react'

import Popular from './Popular'

// state
// lifecycle events
// UI

// Separations of concerns doesn't happen at the technology level, but at the component level

class App extends Component {
    render() {
        return (
            <div className='container'>
                <Popular />
            </div>
        )
    }
}

export default App
