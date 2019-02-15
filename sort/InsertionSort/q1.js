const isort = (arr) => {
  for (let i = 1; i < arr.length; i++) {
    let j = i - 1
    let num = arr[i]
    while (j >= 0 && num < arr[j]) {
      arr[j + 1] = arr[j]
      j -= 1
    }
    arr[j + 1] = num
  }
  return arr
}

console.log(isort([4,1,6,8,3,6,5,0,8]))