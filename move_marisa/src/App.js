import '@css/base.css';
import '@css/style.scss';

const image = new Image()
image.src = require('@assets/images/resource.png')

let index = 0
let lastTime
let xPos = 0
let yPos = 0
let targetX = 0
let targetY = 0
let nowDirection = 'bottom'
let speedX = 0
let speedY = 0
const scale = 2.5
const width = 24
const height = 32
const speed = 8
const canvas = document.getElementById('canvas')
const ctx = canvas.getContext('2d')

const getDirection = (x1, y1, x2, y2) => {
  if (x2 > x1 && y2 > y1) {
    return 'rightBottom'
  } else if (x2 > x1 && y2 == y1) {
    return 'right'
  } else if (x2 > x1 && y2 < y1) {
    return 'rightTop'
  } else if (x2 == x1 && y2 < y1) {
    return 'top'
  } else if (x2 < x1 && y2 < y1) {
    return 'leftTop'
  } else if (x2 < x1 && y2 == y1) {
    return 'left'
  } else if (x2 < x1 && y2 > y1) {
    return 'leftBottom'
  } else if (x2 == x1 && y2 > y1) {
    return 'bottom'
  } else {
    return nowDirection
  }
}

const direction = {
  top: 0 * height,
  rightTop: 1 * height,
  right: 2 * height,
  rightBottom: 3 * height,
  bottom: 4 * height,
  leftBottom: 5 * height,
  left: 6 * height,
  leftTop: 7 * height,
}

const isInRange = (n, min, max) => n >= min && n <= max

function checkBoundary() {
  const isInBorderBoundary = xPos >= 0 &&
    yPos >= 0 &&
    xPos < canvas.width - width * scale &&
    yPos < canvas.height - height * scale
  
  const isInTarget = isInRange(xPos, targetX - width / 2, targetX + width / 2) &&
    isInRange(yPos, targetY - height / 2, targetY + height / 2)

  return isInBorderBoundary && !isInTarget
}

function walking(timestamp) {
  if (timestamp - lastTime < 120) {
    window.requestAnimationFrame(walking)
    return
  }
  lastTime = timestamp
  ctx.clearRect(0, 0, canvas.width, canvas.height)

  if (checkBoundary()) {
    xPos += speedX
    yPos += speedY
    ctx.drawImage(image, width * (index++ % 4), direction[nowDirection], width, height, xPos, yPos, width * scale, height * scale)
  } else {
    index = 0
    ctx.drawImage(image, 0, direction[nowDirection], width, height, xPos, yPos, width * scale, height * scale)
  }
  window.requestAnimationFrame(walking)
}

image.onload = () => window.requestAnimationFrame(walking)

canvas.addEventListener('mousemove', function(e) {
  targetX = e.offsetX
  targetY = e.offsetY
  nowDirection = getDirection(xPos, yPos, targetX, targetY)
  const a = targetY - yPos
  const b = targetX - xPos
  const c = Math.sqrt(a ** 2 + b ** 2)
  speedX = speed * b / c
  speedY = speed * a / c
})