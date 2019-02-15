const msort = (arr) => {
  if (arr.length < 2) {
    return arr
  }
  const mid = Math.floor(arr.length / 2)
  
  const left = arr.slice(0, mid)
  const right = arr.slice(mid)

  return merge(msort(left), msort(right))
}

const merge = (left, right) => {
  const ret = []

  while (left.length > 0 && right.length > 0) {
    ret.push(left[0] <= right[0] ? left.shift() : right.shift())
  }

  return [...ret, ...left, ...right]
}

console.log(msort([4,1,6,8,3,6,5,0,8]))