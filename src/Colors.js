import React, { Component } from 'react'

class Colors extends Component {
  render () {
    const primary = this.props.primary
    const secondary = this.props.secondary
    return (
    <div className='colors__wrapper'>
      <div className='color-box__container'>
        <p style={{ color: primary }} className='text--regular'>
          {this.props.primaryColorText}
        </p>
        <div style={{ backgroundColor: primary }} className='color-box'>
          <div className='text--hex' style={{ color: secondary }}>
            {primary}
          </div>
          <input type='color'
                 onChange={e => this.props.setColors(e.target.value, true)}
                 className='input__color'
                 defaultValue='#ffffff'
                 style={{ backgroundColor: primary, color: secondary }} />
        </div>
      </div>
      <div className='color-box__container'>
        <p style={{ color: secondary }} className='text--regular'>
          {this.props.secondaryColorText}
        </p>
        <div style={{ backgroundColor: secondary }} className='color-box'>
          <div className='text--hex' style={{ color: primary }}>
            {secondary}
          </div>
          <input type='color'
                 onChange={e => this.props.setColors(e.target.value, false)}
                 className='input__color'
                 defaultValue='#ffffff'
                 style={{ backgroundColor: secondary, color: primary }} />
        </div>
      </div>
    </div>
    )
  }
}

export default Colors
