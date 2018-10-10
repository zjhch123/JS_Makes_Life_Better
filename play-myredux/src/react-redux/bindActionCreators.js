function bindActionCreator(creator) {
  return (...args) => creator(...args)
}

export function bindActionCreators(actions, dispatch) {
  const creators = actions(dispatch)
  return Object.keys(creators).reduce((ret, item) => {
    ret[item] = bindActionCreator(creators[item])
    return ret
  }, {})
}