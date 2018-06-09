var {curry} = require('./curry');
var {compose} = require('./compose');
var trace = curry(function(log, x) {
  console.log(log, x);
  return x;
});
var id = function(x) {
  return x;
};

var toLowerCase = curry(function(str) {
  return str.toLowerCase();
});

var toUpperCase = curry(function(str) {
  return str.toUpperCase();
});

var match = curry(function(what, str) {
  return str.match(what);
});

var replace = curry(function(what, replacement, str) {
  return str.replace(what, replacement);
});

var filter = curry(function(f, ary) {
  return ary.filter(f);
});

var map = curry(function(f, ary) {
  return ary.map(f);
});

var join = curry(function(dot, arr) {
  return arr.join(dot);
});

var head = curry(function(arr) {
  return arr[0];
});

var split = curry(function(splitment, str) {
  return str.split(splitment);
});

var prop = curry(function(key, obj) {
  return obj[key];
});

var add = curry(function(a, b) {
  return a + b;
});

var maybe = curry(function(x, f, m) {
  return m.isNothing() ? x : f(m.__value);
});

var concat = curry(function(a, b) {
  return a.concat(b);
});

module.exports = {
  filter,
  match,
  map,
  toLowerCase,
  toUpperCase,
  head,
  replace,
  join,
  split,
  prop,
  add,
  trace,
  maybe,
  concat,
  id
}
