import React from 'react'
import ReactDOM from 'react-dom'

export default class Portal extends React.Component {

  componentDidMount() {
    if (!this.node) {
      this.node = document.createElement('div')
      document.body.appendChild(this.node)
    }
    let children = this.props.children
    ReactDOM.unstable_renderSubtreeIntoContainer(this, children, this.node, () => {})
  }

  render() {
    return null
  }
}