import React from 'react'
import Data from './Data'

const LoadingData = (Wrap) => {
  return class L extends React.Component {
    render() {
      const {
        data,
        ...rest
      } = this.props
      if (!!data) {
        return <Data data={data} {...rest} />
      } else {
        return  <div>Loading.....</div>
      }
    }
  }
}

export default LoadingData(Data)