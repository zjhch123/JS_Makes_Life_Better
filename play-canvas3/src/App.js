import '@css/base.css';
import '@css/style.scss';
import greet from '@js/index';
import {
  Promise
} from 'core-js';

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

const canvas = document.querySelector('canvas')
const ctx = canvas.getContext('2d')
ctx.lineWidth = 2

let number = (() => {
  let r = []
  for (let i = 0; i < 100; i++) {
    r.push(Math.floor(Math.random() * 200))
  }
  return r
})()

function delay(time) {
  return new Promise((resolve, reject) => {
    setTimeout(() => resolve(), time)
  })
}


async function sort(arr) {
  for (let i = 0; i < arr.length - 1; i++) {
    for (let j = 0; j < arr.length - 1 - i; j++) {
      if (arr[j] > arr[j + 1]) {
        var temp = arr[j];
        arr[j] = arr[j + 1];
        arr[j + 1] = temp;
      }
      await delay(5)
      draw(arr)
    }
  }
  return arr;
}



function draw(arr) {
  ctx.clearRect(0, 0, 1000, 800)
  for (let i = 0; i < arr.length; i++) {
    ctx.beginPath()
    ctx.moveTo(i * 5, 400)
    ctx.lineTo(i * 5, 400 - arr[i])
    ctx.stroke()
  }
}

sort(number)