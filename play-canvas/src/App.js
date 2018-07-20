import '@css/base.css';
import '@css/style.scss';
import greeting from '@js/index.js';

// 这是为了更新html之后页面能自动刷新而写的。不要删
if (process.env.NODE_ENV !== 'production') {
  require('./index.html')
}
// 如果需要的话可以开启模块热替换, 开启之后html页面不会自动刷新
// if (module.hot) {
//   module.hot.accept()
// }

// 从这里开始写正式代码
greeting();

const canvasWidth = 300
const canvasHeight = 300

const canvas = document.getElementById('canvas')
const ctx = canvas.getContext('2d')

ctx.arc(canvasWidth / 2, canvasHeight / 2, canvasWidth / 2, 0, Math.PI * 2, false)
ctx.clip()

const drawSin = (ctx, { waveWidth = 0.05, waveHeight = 20, offsetX = 0, fillStyle, strokeStyle }) => {
  const startX = 0

  let offsetY = 0

  let points = []
  const smooth = (stepX, stepY) => {
    if (!!fillStyle) {
      ctx.fillStyle = fillStyle
    }
    if (!!strokeStyle) {
      ctx.strokeStyle = strokeStyle
    }
    ctx.beginPath()
    for (let x = startX; x < startX + canvasWidth; x += 20 / canvasWidth) {
      const y = waveHeight * Math.sin((startX + x) * waveWidth + offsetX)
      points.push([x, y])
      ctx.lineTo(x, canvasHeight - offsetY + y)
    }
    ctx.lineTo(canvasWidth, canvasHeight)
    ctx.lineTo(startX, canvasHeight)
    ctx.lineTo(points[0][0], points[0][1])
    points = []
    ctx.stroke()
    ctx.fill()
    offsetX += stepX
    offsetY += stepY
    return [offsetX, offsetY]
  }
  smooth(0, 0)
  return smooth
}

const move1 = drawSin(ctx, { waveWidth: 0.04, waveHeight: 12, fillStyle: 'rgba(0, 191, 255, .4)', strokeStyle: 'rgba(0, 191, 255, .4)' })
const move2 = drawSin(ctx, { waveWidth: 0.02, waveHeight: 10, offsetX: 5, fillStyle: 'rgb(30, 144, 255)', strokeStyle: 'rgb(30, 144, 255)' })

const Move = () => {
  ctx.clearRect(0,0,canvasWidth,canvasHeight)
  const p = move1(0.06, 0.6)
  move2(0.05, 0.6)
  ctx.beginPath()
  ctx.strokeStyle = 'rgba(0, 191, 255, .4)';
  ctx.arc(canvasWidth / 2, canvasHeight / 2, canvasWidth / 2, 0, Math.PI * 2, false)
  ctx.stroke()
  if (p[1] > canvasHeight + 20) {
    return  
  }
  requestAnimationFrame(Move)  
}

requestAnimationFrame(Move) 