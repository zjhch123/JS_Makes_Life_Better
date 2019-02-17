/**
 * LeetCode 10. Regular Expression Matching
 * dp[i]表示第i位时的最长值
 * dp[i] = dp[i - 2] + 2 when s[i] == ')' and s[i - 1] == '('
 * dp[i] = dp[i - 1] + dp[i - dp[i - 1] - 2] + 2 when s[i - dp[i - 1] - 1] == '('
 * @param {string} s
 * @return {number}
 */
var longestValidParentheses = function(s) {
  if (s.length === 0) {
    return 0
  }
  const size = s.length
  const dp = Array(size).fill(0)

  for (let i = 1; i < s.length; i++) {
    if (s[i] === ')') {
      if (s[i - 1] === '(') {
        dp[i] = (i > 1 ? dp[i - 2] : 0) + 2
      } else if (i - dp[i - 1] > 0 && s[i - dp[i - 1] - 1] === '(') {
        dp[i] = dp[i - 1] + (i - dp[i - 1] > 1 ? dp[i - dp[i - 1] - 2] : 0) + 2
      }
    }
  }

  return Math.max(...dp)
};

console.log(longestValidParentheses('()'))