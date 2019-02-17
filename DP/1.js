/*
  有一座高度是10级台阶的楼梯。
  从下往上走，每跨一步只能向上1级或者2级台阶。
  要求用程序来求出一共有多少种走法。
*/
/*
  dp[10] = dp[9] + dp[8]
*/

const r = () => {
  const arr = [0, 1, 2]
  for (let i = 3; i <= 10; i++) {
    arr.push(arr[i - 2] + arr[i - 1])
  }
  return arr[10]
}

console.log(r())