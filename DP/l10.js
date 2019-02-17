/**
 * LeetCode 10. Regular Expression Matching
 * @param {string} s
 * @param {string} p
 * @return {boolean}
 */
var isMatch = function(s, p) {
  if (s == p) {
    return true
  }

  const create2DArray = (row, column, defaultValue = 0) => Array(row).fill(0).map(i => Array(column).fill(defaultValue))

  const patterns = (() => {
    const ret = []

    let index = 0
    while (index < p.length) {
      if (p[index + 1] === '*') {
        ret.push(p.slice(index, index + 2))
        index += 1
      } else {
        ret.push(p[index])
      }
      index += 1
    }

    return ret
  })()

  const dp = create2DArray(s.length + 1, patterns.length + 1, false)

  dp[0][0] = true

  for (let i = 1; i <= s.length; i++) {
    dp[i][0] = false
  }

  for (let j = 1; j <= patterns.length; j++) {
    dp[0][j] = patterns[j - 1].length > 1 && dp[0][j - 1]
  }

  for (let i = 1; i <= s.length; i++) {
    for (let j = 1; j <= patterns.length; j++) {
      const pattern = patterns[j - 1]
      const str = s[i - 1]

      if (pattern.length >= 2) {
        dp[i][j] = dp[i][j - 1] || (dp[i - 1][j] && (str === pattern[0] || pattern[0] === '.'))
      } else {
        dp[i][j] = dp[i - 1][j - 1] && (str === pattern || pattern === '.')
      }
    }
  }

  return dp[s.length][patterns.length]
}



console.log(isMatch('', '*'))