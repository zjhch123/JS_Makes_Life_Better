define(['api'], function(api) {
  return {
    sub: () => console.log('sub'),
    cut: () => console.log('cut'),
    get: () => {
      console.log('get from api: ', api.get)
    }
  }
})