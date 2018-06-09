/*
* @Author: zjhch123
* @Date:   2017-12-12 15:49:41
* @Last Modified time: 2017-12-12 15:57:43
*/
var app = require('../src/app.js')
var should = require('should')

describe('test/app.js', function() {
  it('should equal 0 when n === 0', function() {
    app.fibonacci(0).should.equal(0)
  })
  it('should equal 1 when n === 1', function() {
    app.fibonacci(1).should.equal(1)
  })
  it('shoud equal 55 when n === 10', function() {
    app.fibonacci(10).should.equal(55)
  })
  it('should throw when n > 10', function() {
    (function() {
      app.fibonacci(11)
    }).should.throw('n should <= 10')
  })
  it('should throw when n < 0', function() {
    (function() {
      app.fibonacci(-1)
    }).should.throw('n should >= 0')
  })
  it('should throw when n isnt Number', function() {
    (function() {
      app.fibonacci('呵呵')
    }).should.throw('n should be a Number')
  })
})