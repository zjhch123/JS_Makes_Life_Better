module.exports = (function() {
  var curry = function(fn, length) {
    length = length || fn.length;
    var toArray = function(rest) {
      return [].slice.call(rest, 0);
    };
    var sub_curry = function(fn) {
      var args = [].slice.call(arguments, 1);
      return function() {
        return fn.apply(fn, args.concat(toArray(arguments)));
      };
    };
    return function() {
      if(arguments.length < length) {
        return curry(sub_curry.apply(fn, [fn].concat(toArray(arguments))), length - arguments.length);
      } else {
        return fn.apply(fn, arguments);
      }
    };
  };
  return {
    curry
  };
})();

