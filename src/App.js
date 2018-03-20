import React, { Component } from 'react'
import brain from 'brain.js'
import trainingData from './trainingData'
import getComplimentaryColor from './utils/convert'
import randomColor from 'randomcolor'
import './App.css'

const network = new brain.NeuralNetwork()

class App extends Component {
  state = {
    backgroundColor: null,
    fontColor: null
  }

  componentDidMount () {
    network.train(trainingData)
    this.setColors(randomColor())
  }

  hexToRgb = hex => {
      let result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
      return result ? {
        r: parseInt(result[1], 16) / 255,
        g: parseInt(result[2], 16) / 255,
        b: parseInt(result[3], 16) / 255
      } : null
    }

    setColors = color => {
      const rgb = this.hexToRgb(color)
      const result = brain.likely(rgb, network)
      const complimentaryColor = getComplimentaryColor(color)
      const fontColor = result === 'dark' ? '#f7f7f7' : '#333333'
      this.setState({
        backgroundColor: color,
        fontColor: complimentaryColor,
        complimentaryColor: complimentaryColor
      })

    }

    changeColor = e => {
      const hex = e.target.value
      const rgb = this.hexToRgb(hex)
      const result = brain.likely(rgb, network)
      const colorResult = result === 'red' ? 'RED!' : 'NOT RED!'
      this.setColors(hex)
    }



  render() {
    const containerStyle = {
      backgroundColor: this.state.backgroundColor,
      color: this.state.backgroundColor
    }
    const fontStyle = {
      color: this.state.fontColor
    }
    const inputStyle= {
      backgroundColor: this.state.fontColor,
      color: this.state.fontColor
    }
    const complimentaryColorStyle = {
      backgroundColor: this.state.complimentaryColor,
      color: this.state.complimentaryColor
    }
    return (
      <div className='container'>
        <h1 className='heading'>
          Complimentary Colors
        </h1>
        <div className='app__colors-wrapper'>
          <div className='colors-container'>
            <h3>Primary</h3>
            <div style={containerStyle} className='app__complimentary-color'>
              <span className='color--hex' style={{ color: this.state.fontColor }}>{this.state.backgroundColor}</span>
            </div>
          </div>
          <div className='colors-container'>
            <h3>Secondary</h3>
            <div style={complimentaryColorStyle} className='app__complimentary-color'>
              <span className='color--hex' style={{ color: this.state.backgroundColor }}>{this.state.complimentaryColor}</span>
            </div>
          </div>
        </div>
        <input ref='colorInput'
               type='color'
               onChange={this.changeColor}
               className='app__input--color'
               defaultValue={randomColor()}
               style={{ color: this.state.complimentaryColor }}/>
      </div>
    )
  }
}

export default App
