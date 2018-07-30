import '@css/base.css';
import '@css/style.scss';

// 这是为了更新html之后页面能自动刷新而写的。不要删
if (process.env.NODE_ENV !== 'production') {
  require('./index.html')
}

// 从这里开始写正式代码
const colors = ["#f7acbc","#deab8a","#817936","#444693","#ef5b9c","#fedcbd","#7f7522","#2b4490","#feeeed","#f47920","#80752c","#2a5caa","#f05b72","#905a3d","#87843b","#224b8f","#f15b6c","#8f4b2e","#726930","#003a6c","#f8aba6","#87481f","#454926","#102b6a","#f69c9f","#5f3c23","#2e3a1f","#426ab3","#f58f98","#6b473c","#4d4f36","#46485f","#ca8687","#faa755","#b7ba6b","#4e72b8","#f391a9","#fab27b","#b2d235","#181d4b","#bd6758","#f58220","#5c7a29","#1a2933","#d71345","#843900","#bed742","#121a2a","#d64f44","#905d1d","#7fb80e","#0c212b","#d93a49","#8a5d19","#a3cf62","#6a6da9","#b3424a","#8c531b","#769149","#585eaa","#c76968","#826858","#6d8346","#494e8f","#bb505d","#64492b","#78a355","#afb4db","#987165","#ae6642","#abc88b","#9b95c9","#ac6767","#56452d","#74905d","#6950a1","#973c3f","#96582a","#cde6c7","#6f60aa","#b22c46","#705628","#1d953f","#867892","#a7324a","#4a3113","#77ac98","#918597","#aa363d","#412f1f","#007d65","#6f6d85","#ed1941","#845538","#84bf96","#594c6d","#f26522","#8e7437","#45b97c","#694d9f","#d2553d","#69541b","#225a1f","#6f599c","#b4534b","#d5c59f","#367459","#8552a1","#ef4136","#cd9a5b","#007947","#543044","#c63c26","#cd9a5b","#40835e","#63434f","#f3715c","#b36d41","#2b6447","#7d5886","#a7573b","#df9464","#005831","#401c44","#aa2116","#b76f40","#006c54","#472d56","#b64533","#ad8b3d","#375830","#45224a","#b54334","#dea32c","#274d3d","#411445","#853f04","#d1923f","#375830","#4b2f3d","#840228","#c88400","#27342b","#402e4c","#7a1723","#c37e00","#65c294","#c77eb5","#a03939","#c37e00","#73b9a2","#ea66a6","#8a2e3b","#e0861a","#72baa7","#f173ac","#8e453f","#ffce7b","#005344","#fffffb","#8f4b4a","#fcaf17","#122e29","#fffef9","#892f1b","#ba8448","#293047","#f6f5ec","#6b2c25","#896a45","#00ae9d","#d9d6c3","#733a31","#76624c","#508a88","#d1c7b7","#54211d","#6d5826","#70a19f","#f2eada","#78331e","#ffc20e","#50b7c1","#d3d7d4","#53261f","#fdb933","#00a6ac","#999d9c","#f15a22","#d3c6a6","#78cdd1","#a1a3a6","#b4533c","#c7a252","#008792","#9d9087","#84331f","#dec674","#94d6da","#8a8c8e","#f47a55","#b69968","#afdfe4","#74787c","#f15a22","#c1a173","#5e7c85","#7c8577","#f3704b","#dbce8f","#76becc","#72777b","#da765b","#ffd400","#90d7ec","#77787b","#c85d44","#ffd400","#009ad6","#4f5555","#ae5039","#ffe600","#145b7d","#6c4c49","#6a3427","#f0dc70","#11264f","#563624","#8f4b38","#fcf16e","#7bbfea","#3e4145","#8e3e1f","#decb00","#33a3dc","#3c3645","#f36c21","#cbc547","#228fbd","#464547","#b4532a","#6e6b41","#2468a2","#130c0e","#b7704f","#596032","#2570a1","#281f1d","#de773f","#525f42","#2585a6","#2f271d","#c99979","#5f5d46","#1b315e","#1d1626"]
const canvas = document.querySelector('canvas')
const ctx = canvas.getContext('2d')
ctx.lineWidth = 6
const cw = 750
const ch = 1000

window.AudioContext = window.AudioContext || window.webkitAudioContext || window.mozAudioContext || window.msAudioContext
window.requestAnimationFrame = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.msRequestAnimationFrame

const musicContext = new AudioContext()
const music = new Audio(require('./1.mp3'))
music.crossOrigin = 'anonymous'
const source = musicContext.createMediaElementSource(music)
const analyser = musicContext.createAnalyser()

source.connect(analyser)
analyser.connect(musicContext.destination)

const radius = 265
const output = new Uint8Array(361)

const moveTo = (ctx, index, direction = 1) => {
  ctx.moveTo(direction * Math.sin(index / 180 * Math.PI) * radius + cw / 2, -1 * direction * Math.cos(index / 180 * Math.PI) * radius + ch / 2)
}

const lineTo = (ctx, index, radius, value, direction = 1) => {
  ctx.lineTo(direction * Math.sin(index / 180 * Math.PI) * (radius + value) + cw / 2, -1 * direction * Math.cos(index / 180 * Math.PI) * (radius + value) + ch / 2)
}


function draw() {
  // console.log(output)
  analyser.getByteFrequencyData(output)
  ctx.clearRect(0, 0, cw, ch)
  const currentTime = music.currentTime
  const totalTime = music.duration
  const splitIndex = currentTime / totalTime * 360
  for (let i = 0; i < 360; i++) {
    if (i < splitIndex) {
      ctx.strokeStyle = `white`
    } else {
      ctx.strokeStyle = `rgba(255, 255, 255, .5)`
    }
    ctx.beginPath()
    if (i % 3 !== 0) continue
    let value = output[i] / 2.2
    value = value === 0 ? 10 : value
    moveTo(ctx, i, 1)
    lineTo(ctx, i, radius, value, 1);
    ctx.stroke()
  }
  requestAnimationFrame(draw)
}

draw()
document.getElementById('play').addEventListener('click', () => {
  music.play()
  draw()
})

document.getElementById('change').addEventListener('click', () => {
  document.documentElement.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)]
})