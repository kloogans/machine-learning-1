import React, { Component } from 'react'
import Colors from './Colors'
import { getComplimentaryColor, convertHexToRgb } from './utils/convert'
import brain from 'brain.js'
import neuralData from './utils/neuralData'
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

  setColors = (color, isPrimaryInput) => {
    const rgbPrimary = convertHexToRgb(color)
    const rgbSecondary = convertHexToRgb(getComplimentaryColor(color))
    isPrimaryInput
    ? this.setState({
        primaryColor: color,
        secondaryColor: getComplimentaryColor(color),
        primaryColorText: brain.likely(rgbPrimary, network),
        secondaryColorText: brain.likely(rgbSecondary, network)
      })
    : this.setState({
        primaryColor: getComplimentaryColor(color),
        secondaryColor: color,
        primaryColorText: brain.likely(rgbSecondary, network),
        secondaryColorText: brain.likely(rgbPrimary, network)
      })
  }

  render () {
      return <div className='section__wrapper'>
        <h1 className='heading--lrg'>Smart Colors</h1>
        <Colors primary={this.state.primaryColor}
                secondary={this.state.secondaryColor}
                setColors={this.setColors}
                primaryColorText={this.state.primaryColorText}
                secondaryColorText={this.state.secondaryColorText} />
      </div>
  }
}

export default Main
