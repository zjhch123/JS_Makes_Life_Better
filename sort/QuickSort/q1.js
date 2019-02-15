// need extra memory
const qsort = (arr) => arr.length < 2 ? arr : [
  ...qsort(arr.slice(1).filter(x => x < arr[0])),
  arr[0],
  ...qsort(arr.slice(1).filter(x => x >= arr[0]))
]


const a = [4,1,6,8,3,6,5,0,8]

const b = qsort(a)

console.log(b)