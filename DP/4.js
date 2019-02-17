/*
Given an integer array nums, 
find the contiguous subarray (containing at least one number) 
which has the largest sum and return its sum.

Example:

Input: [-2,1,-3,4,-1,2,1,-5,4],
Output: 6
Explanation: [4,-1,2,1] has the largest sum = 6.

*/
/*
dp(n) = Max(dp(n-1) + nums[n], nums[n]), 求Max(dp(n)) | n = 0,1,2,3...
*/