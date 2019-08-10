import miniTpl from './js/miniTpl';

if (process.env.NODE_ENV !== 'production') {
  require('./index.html')
}
if (module.hot) {
  module.hot.accept()
}

const data = [{ name: 'tom', age: 12 }, { name: 'jerry', age: 11 }, { name: 'tony', age: 10 }]
const content = document.getElementById('tplContent').innerHTML
const result = miniTpl(content, data)
document.getElementById('root').innerHTML = result
