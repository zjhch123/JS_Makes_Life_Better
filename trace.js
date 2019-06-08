var {curry} = require('./curry');
var trace = curry(function(tag, x) {
  console.log(tag, x);
  return x;
});

module.exports = {
  trace
};
