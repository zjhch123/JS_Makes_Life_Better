var { curry } = require('./curry');
var { compose } = require('./compose.js');
var { trace } = require('./trace');
var { map, filter, toLowerCase, replace, join, toUpperCase, head } = require('./node');
var add = curry(function(a, b) {
  return a + b;
});
var add1 = add(1);

console.log(add1(2));
console.log(add1(9));
var add10 = add(10);

console.log(add10(9));

var addmult = curry(function(a,b,c) {
  return a + b * c;
});

var adda = addmult(1);
var addb = adda(3);
var addc = addb(2);
console.log(addc);

var split = curry(function(ch, str) {
  return str.split(ch);
});

var words = split(' ');

var sentences = map(words);

console.log(sentences(['tom jerry', 'archer lancer']));

var _match = curry(function(reg, str) {
  return str.match(reg);
});

var match = _match(/q/i);

var filter = curry(function(f, arr) {
  return arr.filter(f);
});

var filterQs = filter(match);

console.log(filterQs(['qq41', 'dsaqdsa', 'zzzz']));

var _keepHighest = function(x,y){ return x >= y ? x : y; };

var _reduce = curry(function(f, defaultValue, arr) {
  return arr.reduce(f, defaultValue);
});

var max = _reduce(_keepHighest, -Infinity);

console.log(max([1,2,3,4,5]));

var snakeCase = compose(replace(/\s+/ig, '_'), toLowerCase);
console.log(snakeCase('TOM jerry'))

var initials = compose(join('.'), map(compose(toUpperCase, head)), split(' '));
console.log(initials('unlimited blade works'));

var dasherize = compose(join('.'), map(toLowerCase), split(' '), replace(/\s{2,}/ig, ' '));
console.log(dasherize('I have created over a thousand blades'));


var sum = function(x) {
  var y = function(y) {
    return sum(x + y);
  };
  y.valueOf = y.toString = function() {
    return x;
  };
  return y;
};

console.log(sum(1)(2)(3)(4)(5).toString())


