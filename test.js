// * [[0, 0], [2, 0]]
// G [[0, 4], [3, 1], [3, 3]]
const test = (b) => {
  const row = b.length
  const column = b[0].length

  const dp = Array(row + 2).fill(0).map(_ => Array(column + 2).fill(99999))

  dp[1][1] = 0

  console.log(dp)

  for (let i = 1; i <= row; i++) {
    for (let j = 1; j <= column; j++) {
      if (b[i - 1][j - 1] === 'X') { continue }
      const min = Math.min(dp[i][j - 1], dp[i - 1][j])
      if (min === 99999) { continue }
      else dp[i][j] = min + 1
    }
  }

  console.log(dp)

  for (let i = row; i > 0; i--) {
    for (let j = column; j > 0; j--) {
      if (b[i - 1][j - 1] === 'X') { continue }
      dp[i][j] = Math.min(dp[i][j], Math.min(dp[i][j + 1], dp[i + 1][j]) + 1)
    }
  }

  console.log(dp)
}

console.log(test([
  [0, 0, 0, 0, 0],
  [0, 'X', 0, 'X', 0],
  [0, 0, 'X', 0, 0],
  [0, 0, 0, 0, 0],
]))

/*
*, 0, 0, 0, G
0, X, 0, X, 0
*, 0, X, 0, 0
0, G, 0, G, 0

[ 0, 1, 2, 3, 4 ],
[ 1, X, 3, X, 5 ],
[ 2, 3, X, 7, 6 ],
[ 3, 4, 5, 6, 7 ],
*/

// dp
//   dp[i][j] =  Math.min(dp[i][j - 1], dp[i - 1][j], dp[i][j + 1], dp[i + 1][j]) + 1
