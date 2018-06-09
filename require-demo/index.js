require.config({
  'util': './js/util.js',
  'user': './js/user.js',
  'api': './js/api.js'
})

require(['user', 'util'], function(user, util) {
  // console.log(util)
  // console.log(user)
  util.get()
})