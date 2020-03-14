const net = require('net')
const BB = require('./bb')

const conn = net.connect({
  host: '127.0.0.1',
  port: 8888
}, () => {
  for (let i = 0; i < 10000; i++) {
    conn.write(BB.pack(Buffer.from('6666' + i, 'utf-8')).toBuffer())
  }
  conn.end()
})