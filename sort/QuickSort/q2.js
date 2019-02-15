// in-place
const swap = (arr, from, to) => {
  [arr[from], arr[to]] = [arr[to], arr[from]]
}

const partition = (arr, left, right) => {
  let pivot = left
  let pivotValue = arr[left]
  swap(arr, pivot, right)

  for (let i = left; i <= right - 1; i++) {
    if (arr[i] < pivotValue) {
      swap(arr, i, pivot)
      pivot += 1
    }
  }

  swap(arr, pivot, right)
  return pivot;
}

const qsort = (arr, left = 0, right = arr.length - 1) => {
  if (left < right) {
    const pivot = partition(arr, left, right)

    qsort(arr, left, pivot - 1)
    qsort(arr, pivot + 1, right)
  }

  return arr
}

const a = [4,1,6,8,3,6,5,0,8]

qsort(a)

console.log(a)