var {curry} = require('./curry');
var {compose} = require('./compose');
var {concat, add, map, trace, id} = require('./node.js');
var moment = require('moment');
var Left = function(x) {
  this.__value = x;
};
Left.of = function(x) {
  return new Left(x);
};
Left.prototype.map = function(f) {
  return this;
};

var Right = function(x) {
  this.__value = x;
};
Right.of = function(x) {
  return new Right(x);
};
Right.prototype.map = function(f) {
  return Right.of(f(this.__value));
};

var either = curry(function(f, g, e) {
  switch(e.constructor) {
    case Left: return f(e.__value);
    case Right: return g(e.__value);
  }
});

var getAge = curry(function(now, user) {
  var birthdate = moment(user.birthdate, 'YYYY-MM-DD');
  if(!birthdate.isValid()) {
    return Left.of('Birth date could not be parsed');
  }
  return Right.of(now.diff(birthdate, 'years'));
});

console.log(getAge(moment(), {birthdate: '2005-12-12'}));
console.log(getAge(moment(), {birthdate: 'abcde'}));

var fortune = compose(concat('If you survive, you will be '), add(1));
var zoltar = compose(either(id, fortune), getAge(moment()));

console.log(zoltar({birthdate: '2005-12-12'}));
console.log(zoltar({birthdate: 'abc'}));



















