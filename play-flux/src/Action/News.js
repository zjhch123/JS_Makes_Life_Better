import AppDispatcher from '../Dispatcher/AppDispatcher'

export function fetchNews() {
  setTimeout(() => {
    AppDispatcher.dispatch({
      type: 'ADD',
      payload: {
        commentList: [
          {
            id: 1,
            name: 'zjhch123',
            content: '哈哈哈~'
          },
          {
            id: 2,
            name: 'zjhch123',
            content: '吼吼吼~'
          },
          {
            id: 3,
            name: 'zjhch123',
            content: '嘿嘿嘿~'
          }
        ]
      }
    })
  }, 2000)
}