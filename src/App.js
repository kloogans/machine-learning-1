import React, { Component } from 'react'
import Footer from './Footer'
import Loader from './loader/Loader'
import Main from './Main'

class App extends Component {
  state = {
    loaded: false
  }

  componentDidMount () {
    this.setState({ loaded: true })
  }

  render() {
    return (
      <div className='app__wrapper'>
        <Main toggleLoaded={this.toggleLoaded} />
       <Footer />
    </div>
    )
  }
}

export default App
