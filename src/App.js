import React, { Component } from 'react'
import Footer from './Footer'
import Main from './Main'

class App extends Component {
  render() {
    return (
      <div className='app__wrapper'>
        <Main />
        <Footer />
      </div>
    )
  }
}

export default App
