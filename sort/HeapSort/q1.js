const hsort = (arr) => {
  let size = arr.length
  for (let i = Math.floor(size / 2) - 1; i >= 0; i--) {
    heapify(arr, i, size)
  }

  for (let i = size - 1; i > 0; i--) {
    [arr[i], arr[0]] = [arr[0], arr[i]]
    size -= 1
    heapify(arr, 0, size)
  }

  return arr
}

const heapify = (arr, index, size) => {
  let largest = index
  const left = index * 2 + 1
  const right = index * 2 + 2

  if (left < size && arr[left] > arr[largest]) {
    largest = left
  }
  if (right < size && arr[right] > arr[largest]) {
    largest = right
  }

  if (largest !== index) {
    [arr[index], arr[largest]] = [arr[largest], arr[index]]
    heapify(arr, largest, size)
  }
}

const a = [4,1,6,8,3,6,5,0,8]

console.log(hsort(a))

/*
      8
    8   6
   4 3 6 5
  0 1
*/