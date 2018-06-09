import request from '../utils/request'

function getList(page = 1) {
  return request(`/api/users?_page=${page}&_limit=8`)
}

function deleteItem(id) {
  return request(`/api/users/${id}`, {
    method: 'DELETE'
  })
}

export default {
  getList, deleteItem
}