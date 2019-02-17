/*
  我们有面值为1元、3元和5元的硬币若干枚，如何用最少的硬币凑够11元？
*/

const map = {}

const r = (n) => {
  if (n === 1) { return 1 }
  if (n === 2) { return 2 }
  if (n === 3) { return 1 }
  if (n === 4) { return 2 }
  if (n === 5) { return 1 }
  
  if (typeof map[n] !== 'undefined')  return map[n]

  const ret = Math.min(r(n - 5) + 1, r(n - 3) + 1, r(n - 1) + 1)
  map[n] = ret
  return ret
}

console.log(r(156))