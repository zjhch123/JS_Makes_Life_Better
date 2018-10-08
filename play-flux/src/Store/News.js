import Base from './Base'
import AppDispatcher from '../Dispatcher/AppDispatcher'

class News extends Base {
}

const news = new News([])

AppDispatcher.register((action) => {
  switch (action.type) {
    case 'ADD':
      news.setData(action.payload.commentList)
      news.emitChange()
      break
    default:
      break
  }
})


export default news