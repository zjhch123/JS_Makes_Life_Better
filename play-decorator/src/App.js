
// 这是为了更新html之后页面能自动刷新而写的。不要删
if (process.env.NODE_ENV !== 'production') {
  require('./index.html')
}
// 如果需要的话可以开启模块热替换, 开启之后html页面不会自动刷新
if (module.hot) {
  module.hot.accept()
}

// 从这里开始写正式代码

const log = (target, name, descriptor) => {
  const method = descriptor.value
  let ret
  descriptor.value = (...args) => {
    const startTime = Date.now()
    ret = method.apply(target, args)
    const endTime = Date.now()
    console.log(`${args}: ${endTime - startTime}ms`)
    return ret
  }
  return descriptor
}

const memory = () => {
  const cache = Object.create(null)
  return (target, name, descriptor) => {
    const method = descriptor.value
    descriptor.value = (...args) => {
      const key = args.join('')
      if (cache[key]) {
        return cache[key]
      }
      const ret = method.apply(target, args)
      cache[key] = ret
      return ret
    }
    return descriptor
  }
}

class A {
  static moduleName = 'A'

  constructor() {
    this.description = 'This is A!'
  }

  @log
  @memory()
  fib(n) {
    if (n === 1) return 1
    if (n === 2) return 1
    return this.fib(n - 1) + this.fib(n - 2)
  }

  add(a, b) {
    return a + b
  }
}

const a = new A()

console.log(a.fib(100))