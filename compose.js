// var compose = function(...arg) {
//   var len = arg.length;
//   var count = len - 1;
//   var result;
//   return function(...rest) {
//     var index = count;
//     result = arg[index--].apply(null, rest);
//     while(index >= 0) {
//       result = arg[index--].call(null, result);
//     }
//     return result;
//   }
// };
var compose = function(...arg) {
  var fns = [].slice.call(arg, 0).reverse();
  var length = fns.length;
  var result;
  return function(...rest) {
    result = fns[0].apply(null, rest);
    fns.slice(1).reduce((arg, func) => {
      result = func.call(null, arg);
      return result;
    }, result);
    return result;
  };
};
module.exports = {
  compose
}

