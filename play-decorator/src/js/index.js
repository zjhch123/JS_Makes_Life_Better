const mixin = (...args) => (target, name, desc) => {
  args.forEach(obj => {
    for (let key in obj) {
      if (obj.hasOwnProperty(key)) {
        target.prototype[key] = obj[key]
      }
    }
  })
  return desc
}

const func4 = { func4: () => console.log('func4') }

const func5 = { func5: () => console.log('func5') }

@mixin(func4, func5)
class Func {
  func1() {
    console.log('func1')
  }
  func2() {
    console.log('func2')
  }
  func3() {
    console.log('func3')
  }
}

const f = new Func()
console.log(f)
f.func4()
f.func5()
export default function() {
  console.log('HelloWorld!');
}