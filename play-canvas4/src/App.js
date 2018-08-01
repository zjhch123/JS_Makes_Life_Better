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


const canvas = document.querySelector('canvas')
const ctx = canvas.getContext('2d')
let raf = null

const cw = canvas.width
const ch = canvas.height

const ball = {
  point: {x: 0, y: 100},
  speed: {vx: 5, vy: 2},
  radius: 5,
  color: '#c7a252',
  draw: function() {
    ctx.beginPath()
    ctx.arc(this.point.x, this.point.y, this.radius, 0, 2 * Math.PI, true)
    ctx.closePath()
    ctx.fillStyle = this.color
    ctx.fill()
  }
}

function draw() {
  ctx.fillStyle = 'rgba(255, 255, 255, 0.3)'
  ctx.fillRect(0, 0, cw, ch)
  ball.draw()
  if (ball.point.x + ball.speed.vx > cw || ball.point.x + ball.speed.vx < 0) {
    ball.speed.vx *= -0.8
  }
  if (ball.point.y + ball.speed.vy > ch || ball.point.y + ball.speed.vy < 0) {
    ball.speed.vy *= -0.8
  }
  ball.point.x += ball.speed.vx
  ball.point.y += ball.speed.vy
  ball.speed.vy += 0.1
  raf = window.requestAnimationFrame(draw)
}

ball.draw()
draw()