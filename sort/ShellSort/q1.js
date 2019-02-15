const ssort = (arr) => {
  let gap = Math.floor(arr.length / 2)

  while (gap > 0) {
    for (let i = gap; i < arr.length; i++) {
      const num = arr[i]
      let preIndex = i - gap

      while (num < arr[preIndex] && preIndex >= 0) {
        arr[preIndex + gap] = arr[preIndex]
        preIndex -= gap
      }

      arr[preIndex + gap] = num
    }
    gap = Math.floor(gap / 2)
  }

  return arr
}


const a = [4,1,6,8,3,6,5,0,8]

console.log(ssort(a))