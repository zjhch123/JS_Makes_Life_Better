const bSearch = (arr, maxIndex, value) => {
  let left = 0
  let right = maxIndex

  while (left <= right) {
    const mid = Math.floor((left + right) / 2)
    if (value === arr[mid]) {
      return mid
    } else if (value > arr[mid]) {
      left = mid + 1
    } else if (value < arr[mid]) {
      right = mid - 1
    }
  }

  return left
}

const isort = (arr) => {
  for (let i = 1; i < arr.length; i++) {
    const num = arr[i]
    const insertedIndex = bSearch(arr, i - 1, num)

    for (let j = i - 1; j >= insertedIndex; j--) {
      arr[j + 1] = arr[j]
    }

    arr[insertedIndex] = num
  }

  return arr
}

console.log(isort([4,1,6,8,3,6,5,0,8]))