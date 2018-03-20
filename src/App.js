import React, { Component } from 'react'
import Footer from './Footer'
import brain from 'brain.js'
import trainingData from './trainingData'
import { getComplimentaryColor, convertHexToRgb } from './utils/convert'
import randomColor from 'randomcolor'
import './App.css'

const network = new brain.NeuralNetwork()

class App extends Component {
  state = {
    primaryColor: null,
    secondaryColor: null,
    primaryColorText: null,
    secondaryColorText: null
  }

  componentDidMount () {
    network.train(trainingData)
    this.setColors(randomColor())
  }

  setColors = color => {
    const rgbPrimary = convertHexToRgb(color)
    const rgbSecondary = convertHexToRgb(getComplimentaryColor(color))
    const resultPrimary = brain.likely(rgbPrimary, network)
    const resultSecondary = brain.likely(rgbSecondary, network)
    console.log(rgbPrimary)

    this.setState({
      primaryColor: color,
      secondaryColor: getComplimentaryColor(color),
      primaryColorText: resultPrimary.toString(),
      secondaryColorText: resultSecondary.toString()
    })
  }

  setSecondaryColors = color => {
    const rgbPrimary = convertHexToRgb(color)
    const rgbSecondary = convertHexToRgb(getComplimentaryColor(color))
    const resultPrimary = brain.likely(rgbPrimary, network)
    const resultSecondary = brain.likely(rgbSecondary, network)
    console.log(rgbPrimary)

    this.setState({
      primaryColor: getComplimentaryColor(color),
      secondaryColor: color,
      primaryColorText: resultSecondary,
      secondaryColorText: resultPrimary
    })
  }

  changePrimaryColor = e => {
    const hex = e.target.value
    this.setColors(hex)
  }

  changeSecondaryColor = e => {
    const hex = e.target.value
    this.setSecondaryColors(hex)
  }

  render() {
    const primaryColors = {
      backgroundColor: this.state.primaryColor,
      color: this.state.primaryColor
    }
    const secondaryColors = {
      backgroundColor: this.state.secondaryColor,
      color: this.state.secondaryColor
    }
    return (
      <div className='app__wrapper'>
        <div className='section__wrapper'>
        <h1 className='heading--lrg'>
          Smart Colors
        </h1>
        <div className='colors__wrapper'>
          <div className='color__container'>
            {/* <h3 className='heading--med'>Primary</h3> */}
            <p style={{ color: this.state.primaryColor }}
               className='text--regular'>
              {this.state.primaryColorText}
            </p>
            <div style={primaryColors} className='color__box'>
              <div className='text__color--hex'
                    style={{ color: this.state.secondaryColor }}>
                {this.state.primaryColor}
              </div>
              <input ref='colorInput'
                     type='color'
                     onChange={this.changePrimaryColor}
                     className='input--color'
                     defaultValue='#ffffff'
                     style={{ backgroundColor: this.state.primaryColor,
                              color: this.state.secondaryColor
                            }}/>
            </div>
          </div>
          <div className='color__container'>
            {/* <h3 className='heading--med'>Secondary</h3> */}
            <p style={{ color: this.state.secondaryColor }}
               className='text--regular'>
              {this.state.secondaryColorText}
            </p>
            <div style={secondaryColors}
                 className='color__box'>
              <div className='text__color--hex'
                    style={{ color: this.state.primaryColor }}>
                {this.state.secondaryColor}
              </div>
              <input ref='colorInput'
                     type='color'
                     onChange={this.changeSecondaryColor}
                     className='input--color'
                     defaultValue='#ffffff'
                     style={{ backgroundColor: this.state.secondaryColor,
                              color: this.state.primaryColor
                            }}/>
            </div>
          </div>
        </div>
       </div>
       <Footer />
    </div>
    )
  }
}

export default App
