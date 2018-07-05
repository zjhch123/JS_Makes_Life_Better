import React from 'react'

export default class Radio extends React.Component {
  constructor() {
    super()
    this.state = {
      radioValue: ''
    }
  }

  handleChange(e) {
    this.setState({
      radioValue: e.target.value
    })
  } 

  render() {
    const {
      radioValue
    } = this.state
    return (
      <div>
        <label>male: 
          <input 
            type="radio" 
            value="male" 
            checked={radioValue === 'male'}
            onChange={this.handleChange.bind(this)}
          />
        </label>
        <label>female: 
          <input 
            type="radio" 
            value="female" 
            checked={radioValue === 'female'}
            onChange={this.handleChange.bind(this)}
          />
        </label>
      </div>
    )
  }

}