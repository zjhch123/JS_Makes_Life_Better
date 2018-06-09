/*
* @Author: zjhch123
* @Date:   2017-12-12 15:49:52
* @Last Modified time: 2017-12-12 15:59:03
*/


var fibonacci = (n) => {
  if (typeof n !== 'number') {
    throw new Error('n should be a Number')
  }
  if (n < 0) {
    throw new Error('n should >= 0')
  }
  if (n > 10) {
    throw new Error('n should <= 10')
  }
  if (n <= 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2)
}

if (require.main === module) {
  var n = Number(process.argv[2])
  console.log('fibonacci(' + n + ') is', fibonacci(n))
}

module.exports = {
  fibonacci
}