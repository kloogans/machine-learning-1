import React, { Component } from 'react'
import brain from 'brain.js'
import neuralData from './utils/neuralData'
import { getComplimentaryColor, convertHexToRgb } from './utils/convert'
import randomColor from 'randomcolor'

const network = new brain.NeuralNetwork()

class Main extends Component {
  state = {
    primaryColor: null,
    secondaryColor: null,
    primaryColorText: null,
    secondaryColorText: null
  }

  componentDidMount () {
    network.train(neuralData)
    this.setColors(randomColor(), true)
  }

  setColors = (color, isPrimary) => {
    const rgbPrimary = convertHexToRgb(color)
    const rgbSecondary = convertHexToRgb(getComplimentaryColor(color))
    if (isPrimary) {
      this.setState({
        primaryColor: color,
        secondaryColor: getComplimentaryColor(color),
        primaryColorText: brain.likely(rgbPrimary, network),
        secondaryColorText: brain.likely(rgbSecondary, network)
      })
    } else {
      this.setState({
        primaryColor: getComplimentaryColor(color),
        secondaryColor: color,
        primaryColorText: brain.likely(rgbSecondary, network),
        secondaryColorText: brain.likely(rgbPrimary, network)
      })
    }
  }

  render () {
    const primaryColors = {
      backgroundColor: this.state.primaryColor,
      color: this.state.primaryColor
    }
    const secondaryColors = {
      backgroundColor: this.state.secondaryColor,
      color: this.state.secondaryColor
    }
      return <div className='section__wrapper'>
        <h1 className='heading--lrg'>
          Smart Colors
        </h1>
        <div className='colors__wrapper'>
          <div className='color__container'>
            <p style={{ color: this.state.primaryColor }}
              className='text--regular'>
              {this.state.primaryColorText}
            </p>
            <div style={primaryColors} className='color-box'>
              <div className='text__color--hex'
                style={{ color: this.state.secondaryColor }}>
                {this.state.primaryColor}
              </div>
              <input ref='colorInput'
                type='color'
                onChange={(e) => this.setColors(e.target.value, true)}
                className='input--color'
                defaultValue='#ffffff'
                style={{ backgroundColor: this.state.primaryColor,
                  color: this.state.secondaryColor }}
              />
            </div>
          </div>
          <div className='color__container'>
            <p style={{ color: this.state.secondaryColor }}
              className='text--regular'>
              {this.state.secondaryColorText}
            </p>
            <div style={secondaryColors}
              className='color-box'>
              <div className='text__color--hex'
                style={{ color: this.state.primaryColor }}>
                {this.state.secondaryColor}
              </div>
              <input ref='colorInput'
                type='color'
                onChange={(e) => this.setColors(e.target.value, false)}
                className='input--color'
                defaultValue='#ffffff'
                style={{ backgroundColor: this.state.secondaryColor,
                  color: this.state.primaryColor }}
              />
            </div>
          </div>
        </div>
      </div>
  }
}

export default Main
