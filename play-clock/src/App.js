import '@css/base.css';
import '@css/style.scss';

// 这是为了更新html之后页面能自动刷新而写的。不要删
if (process.env.NODE_ENV !== 'production') {
  require('./index.html')
}
// 如果需要的话可以开启模块热替换, 开启之后html页面不会自动刷新
// if (module.hot) {
//   module.hot.accept()
// }

// 从这里开始写正式代码

const canvas = document.querySelector('canvas')
const ctx = canvas.getContext('2d')
const cw = canvas.width
const ch = canvas.height
const radius = 210

const secondRadius = 180
const minRadius = 140
const hourRadius = 100

const draw = () => {
  ctx.clearRect(0, 0, cw, ch)
  const now = new Date()

  const seconds = now.getSeconds()
  const secondsDeg = Math.floor(seconds / 60 * 360)

  const mins = now.getMinutes() + seconds / 60
  const minsDeg = Math.floor(mins / 60 * 360)

  const hours = (now.getHours() + mins / 60 + seconds / 3600) % 12
  const hoursDeg = Math.floor(hours / 12 * 360)

  ctx.translate(cw / 2, ch / 2)

  ctx.beginPath()
  ctx.arc(0, 0, 5, 0, 2 * Math.PI, false)
  ctx.fill()

  // 刻度线
  ctx.lineWidth = 2
  for (let i = 0; i < 60; i++) {
    ctx.beginPath()
    ctx.moveTo(0, 0 - radius)
    if (i % 5 === 0) {
      ctx.lineTo(0, 0 - radius + 30)
    } else {
      ctx.lineTo(0, 0 - radius + 10)
    }
    ctx.stroke()
    ctx.rotate(Math.PI / 30)
  }

  let nowRotateDeg = 0
  for (let i = 0; i < 360; i++) {
    if (nowRotateDeg === secondsDeg) {
      ctx.beginPath()
      ctx.moveTo(0, 0)
      ctx.lineTo(0, -secondRadius)
      ctx.stroke()
    }
    if (nowRotateDeg === minsDeg) {
      ctx.beginPath()
      ctx.moveTo(0, 0)
      ctx.lineTo(0, -minRadius)
      ctx.stroke()
    }
    if (nowRotateDeg === hoursDeg) {
      ctx.beginPath()
      ctx.moveTo(0, 0)
      ctx.lineTo(0, -hourRadius)
      ctx.stroke()
    }
    nowRotateDeg += 1
    ctx.rotate(Math.PI / 180)
  }

  ctx.translate(-cw / 2, -ch / 2)
  requestAnimationFrame(draw)
}

draw()