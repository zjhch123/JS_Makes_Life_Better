const util = (timeout) => new Promise((resolve, _) => setTimeout(() => resolve(), timeout))

export function getNews() {
  return async (dispatch, getState) => {
    await util(1000)
    dispatch({
      type: 'ADD',
      payload: {
        list: [ 1, 2, 3, 4, 5, 6, 7 ]
      }
    })
  }
}