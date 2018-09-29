import '@css/base.css';
import '@css/style.scss';

// function log(target, name, descriptor, ...rest) {
//   // console.log(target) // class 的 this 对象
//   // console.log(name) // 函数名
//   // console.log(descriptor) // 原函数

//   const old = descriptor.value

//   descriptor.value = (...rest) => {
//     console.log(this)
//     console.log(rest)
//     console.log('哈哈哈被我劫持啦')
//     return old.apply(target, rest)
//   }

//   return descriptor
// }

// class Person {
//   constructor() {
//     this.name = 'zjhch123'
//   }

//   @log
//   play(name, time) {
//     this.name = 412412
//     console.log('i am playing!', name, time);
//   }
// }

// const aa = new Person()
// aa.play('xs', '2018')
// console.log(aa)



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
  @memory()
  fib(n) {
    if (n === 1) return 1
    if (n === 2) return 1
    return this.fib(n - 1) + this.fib(n - 2)
  }
}

const a = new A()
console.log(a.fib(100))

function log(target, name, descriptor) {
  const old = descriptor.value
  descriptor.value = function(...arg) {
    console.log('哈哈哈哈被我劫持啦')
    return old.apply(this, arg)
  }
}

class Car {
  @log
  run() {
    console.log('Car is running')
  }
}

const c1 = new Car()
c1.run()