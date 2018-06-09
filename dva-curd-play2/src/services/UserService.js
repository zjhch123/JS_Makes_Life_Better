import delay from '../utils/delay'

function registe({ username, password }) {
  return delay(Math.random() * 1000).then(_ => {
    const users = JSON.parse(window.localStorage['users'] || '{}')
    if (username in users) {
      throw new Error('Username has already used')
    }
    users[username] = password
    window.localStorage.setItem('users', JSON.stringify(users))
    console.log(1)
  })
}

function login({ username, password }) {
  return delay(Math.random() * 1000).then(_ => {
    const users = JSON.parse(window.localStorage['users'] || '{}')
    if (username in users && users[username] === password) {
      window.localStorage.setItem('isLogin', '1')
      return
    }
    throw new Error('Invalid Username or Password')
  })
}

function logout() {
  window.localStorage.setItem('isLogin', '0')
}


export default {
  registe, login, logout
}