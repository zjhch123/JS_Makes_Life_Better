/**
 * LeetCode 5. Longest Palindromic Substring
 * 
 * @param {string} s
 * @return {string}
 */
var longestPalindrome = function(s) {
  const create2DArray = (row, column, defaultValue = 0) => Array(row).fill(0).map(i => Array(column).fill(defaultValue))

  if (s.length === 0) return ''

  let maxLengthString = s[0]
  const size = s.length
  const dp = create2DArray(size, size, false)

  for (let l = 0; l < size; l++) {
    for (let i = 0; i < size - l; i++) {
      const j = i + l


      if (s[i] === s[j] && (j - i <= 2 || dp[i + 1][j - 1])) {
        dp[i][j] = true
        if (j - i + 1 > maxLengthString.length) {
          maxLengthString = s.slice(i, j + 1)
        }
      }
    }
  }

  return maxLengthString
};

console.log(longestPalindrome('babad'))