import React from 'react'
import Button from './Button'
import PropTypes from 'prop-types'

const Wrap = (Button) => {
  return class RedButton extends React.Component {

    static propTypes = {
      children: PropTypes.string.isRequired
    }

    static defaultProps = {
      onClick: () => console.log(1)
    }

    render() {
      const props = {
        ...this.props
      }
      delete props["color"]
      props.children = 'Button: ' + props.children
      return <Button color="red" {...props} />
    }
  }
}

export default Wrap(Button)