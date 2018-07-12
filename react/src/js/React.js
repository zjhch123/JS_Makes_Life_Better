export class Component {
  setState(state) {
    Object.assign(this.state, state)
    if (this.onStateChange) {
      this.onStateChange()
    }
  }
}

const listenEvents = (node, component) => {
  Object.keys(component.props).forEach(prop => {
    if (prop.startsWith('on')) {
      const eventName = prop.replace('on', '').toLowerCase()
      node.addEventListener(eventName, component.props[prop], false)
    }
  }) 
}

const findNode = (component) => {
  while (component.renderedElement) {
    component = component.renderedElement
  }
  return component.node
}

const updateWhenSetState = (component) => {
  component.onStateChange = () => {
    const oldNode = findNode(component)
    component.renderedElement = mountComponent(component).renderedElement
    const newNode = createDOM(component.renderedElement)
    oldNode.parentNode.insertBefore(newNode, oldNode)
    oldNode.parentNode.removeChild(oldNode)
  }
}

const createDOM = (el) => {
  if (typeof el.type === 'string') {
    const node = document.createElement(el.type)
    for (let prop in el.props) {
      if (prop === 'children') continue
      let key = prop
      if (key === 'className') key = 'class'
      node.setAttribute(key, el.props[prop])
    }
    el.children.forEach(child => {
      node.appendChild(createDOM(child))
    })
    el.node = node
    listenEvents(node, el)
    return node
  } else if (el.renderedElement) {
    updateWhenSetState(el)
    return createDOM(el.renderedElement)
  } else if (typeof el === 'string' || typeof el === 'number') {
    return document.createTextNode('' + el)
  } else {
    return null
  }
}

const mountChildrenComponent = (children, newChildren = []) => {
  if (Array.isArray(children)) {
    children.forEach((child, i) => {
      if (Array.isArray(child)) {
        mountChildrenComponent(child, newChildren)
      } else {
        newChildren.push(mountComponent(child))
      }
    })
  } else {
    newChildren.push(mountComponent(children))
  }
  return newChildren
}

const mountComponent = (component) => {
  if (typeof component === 'string' || typeof component === 'number') return component
  if (component === null || component === undefined) return ''
  if (typeof component.type === 'string') {
    component.children = mountChildrenComponent(component.props.children)
    return component
  }
  if (typeof component.render === 'function') {
    const renderedElement = component.render()
    component.renderedElement = renderedElement
    mountComponent(renderedElement)
    return component
  }
}


export const mount = (wrapper, component) => {
  const el = mountComponent(component)
  console.log(el)
  // el.node = createDOM(el)
  // wrapper.appendChild(el.node)
}

export default class React {
  static createElement(Component, props, ...children) {
    const el = typeof Component === 'function' 
            ? new Component(props)
            : { type: Component }
    el.props = props
    if (children) {
      if (el.props) {
        el.props.children = children
      } else {
        el.props = { children }
      }
    }
    return el
  }
}