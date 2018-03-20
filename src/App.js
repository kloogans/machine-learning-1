import React, { Component } from 'react'
import brain from 'brain.js'
import randomColor from 'randomcolor'
import './App.css'

// Initialize a new neural network
const network = new brain.NeuralNetwork()

class App extends Component {
  state = {
    backgroundColor: null,
    fontColor: null
  }

  componentDidMount () {

    network.train([
      { input: { r: 0.62, g: 0.72, b: 0.88 }, output: { light: 1 } },
      { input: { r: 0.1, g: 0.84, b: 0.72 }, output: { light: 1 } },
      { input: { r: 0.33, g: 0.24, b: 0.29 }, output: { dark: 1 } },
      { input: { r: 0.74, g: 0.78, b: 0.86 }, output: { light: 1 } },
      { input: { r: 0.31, g: 0.35, b: 0.41 }, output: { dark: 1 } },
      { input: { r: 0.23, g: 0.27, b: 0.91 }, output: { light: 1 } }
    ])

    // Generate a random color initially and determine font color via brain
    const rgb = this.hexToRgb(randomColor())
    const result = brain.likely(rgb, network)
    const fontColor = result === 'dark' ? '#f7f7f7' : '#333333'
    this.setState({
      backgroundColor: randomColor(),
      fontColor: fontColor
    })
  }

  // Converts default hex values into separate RGB values between 0 and 1
  hexToRgb = hex => {
      let result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
      return result ? {
        r: parseInt(result[1], 16) / 255,
        g: parseInt(result[2], 16) / 255,
        b: parseInt(result[3], 16) / 255
      } : null
    }

    // Determine font color on change via brain
    changeColorData = e => {
      const hex = e.target.value
      const rgb = this.hexToRgb(hex)
      const result = brain.likely(rgb, network)
      const fontColor = result === 'dark' ? '#f7f7f7' : '#333333'
      this.setState({
        backgroundColor: hex,
        fontColor: fontColor
      })
    }

  render() {
    const containerStyle = {
      backgroundColor: this.state.backgroundColor
    }
    const fontStyle = {
      color: this.state.fontColor
    }
    const inputStyle= {
      backgroundColor: this.state.fontColor,
      color: this.state.fontColor
    }
    return (
      <div className='container' style={containerStyle}>
        <h1 className='heading' style={fontStyle}>
          Font color will change based on color lightness via machine learning.
        </h1>
        <input ref='colorInput'
               type='color'
               onChange={this.changeColorData}
               className='app__input--color'
               defaultValue={randomColor()}
               style={inputStyle}/>
      </div>
    )
  }
}

export default App
