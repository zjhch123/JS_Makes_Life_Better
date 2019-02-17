/**
 * LeetCode 44. Wildcard Matching
 * dp[i][j]表示s[0, i)和p[0, j)是否匹配
 * dp[i][j] = dp[i - 1][j - 1] && (s[i - 1] === p[j - 1] || p[j - 1] === '?') when p[j - 1] !== '*'
 * dp[i][j] = dp[i - 1][j] || dp[i][j - 1] when p[j - 1] === '*'
 * @param {string} s
 * @param {string} p
 * @return {boolean}
 */
var isMatch = function (s, p) {
  const create2DArray = (row, column, defaultValue = 0) => Array(row).fill(0).map(i => Array(column).fill(defaultValue))

  const dp = create2DArray(s.length + 1, p.length + 1, false)

  dp[0][0] = true

  for (let i = 1; i <= s.length; i++) {
    dp[i][0] = false
  }

  for (let j = 1; j <= p.length; j++) {
    dp[0][j] = p[j - 1] === '*' && dp[0][j - 1]
  }

  for (let i = 1; i <= s.length; i++) {
    for (let j = 1; j <= p.length; j++) {
      const str = s[i - 1]
      const pattern = p[j - 1]

      if (pattern !== '*') {
        dp[i][j] = dp[i - 1][j - 1] && ( str === pattern || pattern === '?' )
      } else {
        dp[i][j] = dp[i - 1][j] || dp[i][j - 1]
      }
    }
  }

  return dp[s.length][p.length]
};