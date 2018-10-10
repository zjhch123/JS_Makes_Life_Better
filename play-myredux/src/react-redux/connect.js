import React from 'react'
import PropTypes from 'prop-types'
import { bindActionCreators } from './bindActionCreators';

export default (mapStateToProps = (state) => state, mapDispatchToProps = {}) => (WrapperComponent) => {
  return class extends React.Component {

    static contextTypes = {
      store: PropTypes.object
    }

    constructor(props, context) {
      super(props, context)

      const { store } = this.context

      this.state = {
        props: {
          ...bindActionCreators(mapDispatchToProps, store.dispatch.bind(store))
        }
      }

      this._update = this.update.bind(this)
    }

    componentWillMount() {
      const { store } = this.context
      store.subscribe(this._update)
      this._update()
    }

    componentWillUnmount() {
      const { store } = this.context
      store.unsubscribe(this._update)
    }

    update() {
      const { store } = this.context
      const stateProps = mapStateToProps(store.getState())
      this.setState({
        props: {
          ...this.state.props,
          ...stateProps,
        }
      })
    }

    render() {
      return <WrapperComponent {...this.state.props} {...this.props}/>
    }
  }
}