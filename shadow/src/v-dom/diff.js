import listDiff from './list-diff'
import _ from './util'
import patch from './patch'

const diff = (oldTree, newTree) => {
  const index = 0
  const patches = {}
  dfsWalk(oldTree, newTree, index, patches)
}

const dfsWalk = (oldNode, newNode, index, patches) => {
  const currentPatch = []

  if (newNode === null) {
    // TODO
  } else if (_.isString(newNode) && _.isString(oldNode)) {
    if (newNode !== oldNode) {
      currentPatch.push({ type: patch.TEXT, content: newNode })
    }
  } else if (
    oldNode.tagName === newNode.tagName &&
    oldNode.key === newNode.key
  ) {
    const propsPatches = diffProps(oldNode, newNode)
    if (propsPatches) {
      currentPatch.push({ type: patch.PROPS, props: propsPatches })
    }
    if (!isIgnoreChildren(newNode)) {
      diffChildren(
        oldNode.children, 
        newNode.children, 
        index, 
        patches, 
        currentPatch
      )
    }
  } else {
    currentPatch.push({ type: patch.REPLACE, node: newNode })
  }

  if (currentPatch.length) {
    patches[index] = currentPatch
  }
}

const diffProps = (oldNode, newNode) => {
  let count = 0
  let oldProps = oldNode.props
  let newProps = newNode.props

  let key, value
  let propsPatches = {}

  // 查找不同的props
  for (key in oldProps) {
    value = oldProps[key]
    if (newProps[key] !== value) {
      count += 1
      propsPatches[key] = newProps[key]
    }
  }

  // 查找新的props
  for (key in newProps) {
    value = newProps[key]
    if (!oldProps.hasOwnProperty(key)) {
      count += 1
      propsPatches[key] = newProps[key]
    }
  }

  if (count === 0) {
    return null
  }

  return propsPatches
}

const diffChildren = (oldChildren, newChildren, index, patches, currentPatch) => {
  const diffs = listDiff(oldChildren, newChildren, 'key')
  newChildren = diffs.children
}

const isIgnoreChildren = (node) => node.props && node.props.hasOwnProperty('ignore')