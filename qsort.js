var findMid = function(arr, left, right) {
  var start = left;
  var midNum = arr[start];
  for (var i = left + 1; i < right; i++) {
    if (arr[i] < midNum) {
      start ++;
      [arr[start], arr[i]] = [arr[i], arr[start]]
    }
  }
  [arr[left], arr[start]] = [arr[start], arr[left]]
  return start;
}
var qsort = function(arr, left, right) {
  if (left < right) {
    var mid = findMid(arr, left, right);
    qsort(arr, left, mid - 1);
    qsort(arr, mid + 1, right);
  }
}

var a = [4,1,6,8,3,6,5,0,7,4,1,4,5,9,7,8,2,8,3,5,6,2,5,5,1,3,3];
qsort(a, 0, a.length);
console.log(a)

