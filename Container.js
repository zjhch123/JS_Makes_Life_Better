
var {match, prop, add, trace, map, maybe} = require('./node');
var {compose} = require('./compose');
var {curry} = require('./curry');

var Container = function(x) {
  this.__value = x;
};

Container.of = function(x) {
  return new Container(x);
};

// Container.prototype.map = function(f) {
//   return Container.of(f(this.__value));
// };

var Maybe = function(x) {
  this.__value = x;
};

Maybe.of = function(x) {
  return new Maybe(x);
};

Maybe.prototype.isNothing = function() {
  return (this.__value === null || this.__value === undefined);
};

Maybe.prototype.map = function(f) {
  return this.isNothing() ? Maybe.of(null) : Maybe.of(f(this.__value));
};

console.log( Maybe.of('Unlimit Blade Work').map(match(/l/ig)) );
console.log( Maybe.of(null).map(match(/l/ig)) );
console.log( Maybe.of({name: 'tom'}).map(prop('age')).map(add(10)) );
console.log( Maybe.of({name: 'tom', age: 10}).map(prop('age')).map(add(10)) );

var safeHead = function(xs) {
  return Maybe.of(xs[0]);
};

var streetName = compose(map(prop('street')), safeHead, prop('address'));

console.log(streetName({address: []})); 
console.log(streetName({address: [{street: 'Jiangan Street', code: 310018}]})); 

var outputStreet = function(name) {
  return 'Street name is: ' + name + '.';
};
var getStreetName = compose(maybe('no street name', outputStreet), streetName);
console.log(getStreetName({address: [{street: null, code: 310018}]}));








