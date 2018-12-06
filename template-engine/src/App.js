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
greet.greeting();

function tmpl(str) {
  let string = "var p = [];with(obj) {p.push('"
  string = 
    string + 
    str.replace(/[\r\t\n]/g, "")
       .replace(/<%=(.*?)%>/g, "');p.push($1);p.push('")
       .replace(/<%/g, "');")
       .replace(/%>/g, "p.push('") + 
    "');} return p.join('')"
  
  const fn = new Function("obj", string) //eslint-disable-line
  return function(data) {
    return fn.call(this, data)
  }
}

const tpl = document.querySelector('.J_template').innerHTML
const data = {
  users: [
    {
      name: 'Plus',
      url: 'https://blog.hduzplus.xyz'
    }
  ]
}

document.querySelector('.container').innerHTML = tmpl(tpl)(data)