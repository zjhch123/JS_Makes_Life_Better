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

const Progress = ({
  el,
  bgColor = 'black',
  fontColor = 'black',
  fontSize = 100,
  lineWidth = 60,
  pixel = 1
}) => {
  const container = document.querySelector(el)
  const canvas = document.createElement('canvas')
  const ctx = canvas.getContext('2d')
  const cw = canvas.width = 750 * pixel
  const ch = canvas.height = 750 * pixel

  container.appendChild(canvas)

  ctx.font = `${fontSize * pixel}px Microsoft YaHei`;
  ctx.textAlign = 'center'
  ctx.textBaseline = 'middle'
  ctx.fillStyle = fontColor
  ctx.strokeStyle = bgColor
  ctx.lineWidth = lineWidth * pixel
  ctx.lineCap = 'round'

  return {
    drawTo: (percent) => {
      if (percent > 100) {
        percent = 100
      }
      const start = -1 / 2 * Math.PI
      const end = 1.5 * Math.PI
      ctx.clearRect(0, 0, cw, ch)
      ctx.beginPath()
      ctx.arc(cw / 2, ch / 2, cw / 2 * 0.8, start, (end - start) * percent / 100 + start, false)
      ctx.stroke()
      ctx.fillText(percent + '%', cw / 2, ch / 2)
    }
  }
}

const progress = Progress({
  el: '.u-progress',
  bgColor: '#7c8577',
  fontColor: '#7c8577',
  fontSize: 140,
  lineWidth: 70,
  pixel: 0.7
})

let now = 0;
(function draw() {
  progress.drawTo(now)
  now += 1
  requestAnimationFrame(draw)
})()