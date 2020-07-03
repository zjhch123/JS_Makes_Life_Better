const getUserInfo = ((res) => () => {
  if (!res) {
    res = new Promise(resolve => {
      setTimeout(() => {
        resolve({
          name: 'Tom'
        })
      }, 1500)
    })
  }
  return res
})()

getUserInfo().then(info => {
  console.log(info)
})
