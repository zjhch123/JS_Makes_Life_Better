import '@css/base.css';
import '@css/style.scss';
import greet from '@js/index';

// 这是为了更新html之后页面能自动刷新而写的。不要删
if (process.env.NODE_ENV !== 'production') {
  require('./index.html')
}
// 如果需要的话可以开启模块热替换, 开启之后html页面不会自动刷新
// if (module.hot) {
//   module.hot.accept()
// }

// 从这里开始写正式代码



function defineReactive(obj, key, val, cb = () => {}) {
  // 递归子属性
  Object.defineProperty(obj, key, {
    enumerable: true,
    configurable: true,
    get: function reactiveGetter() {
      return val
    },
    set: function reactiveSetter(newVal) {
      val = newVal
      cb(obj, key, newVal)
    }
  })
}

class Page {
  constructor({ el, data, tpl }) {
    this.el = el
    this.data = window.data = data
    this.tpl = tpl

    this.observe(this.data)
  }

  isObject(a) {
    return Object.prototype.toString.call(a) === '[object Object]'
  }

  observe(data, prefix = '') {
    Object.keys(data).forEach(item => {
      if (this.isObject(data[item])) {
        this.observe(data[item], `${item}.`)
      }
      defineReactive(data, item, data[item], (obj, key, value) => { console.log(obj, key, value) })
      this.renderTpl(data, prefix, item)
    })
  }

  renderTpl(data, prefix, item) {
    this.tpl = this.tpl.split(`{{${prefix}${item}}}`).join(`<!-- ${prefix}${item} -->${data[item]}<!-- ${prefix}${item} -->`)
  }

  render() {
    document.querySelector(this.el).innerHTML = this.tpl
    return this
  }
}

const p = new Page({
  el: '#root',
  data: {
    name: 'Zjh',
    msg: 'Hello, World',
    grade: [1, 2, 3],
    obj: {
      a: [4, 5, 6],
      b: 'zzz'
    }
  },
  tpl: `
    <div>
      {{name}} {{msg}}, {{grade}} {{obj.a}} {{obj.b}}
    </div>
  `
}).render()


