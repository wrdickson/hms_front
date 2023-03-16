import axios from 'axios'

const account = {
  
  login: (username, password) => {
    const request = axios({
      method: 'post',
      data: {
        username: username,
        password: password
      },
      url: 'api/login'
    })
    return request
  },
  createAccount: ( token, obj ) => {
    const request = axios({
      method: 'post',
      headers: {
        'Jwt': token
      },
      data: obj,
      url: '/api/accounts/create/'
    })
    return request
  },
  authorizeToken: (token) => {
    const request = axios({
      method: 'post',
      headers: { 
        'Jwt': token
      },
      url: 'api/authorize-token/'
    })
    return request
  },
  getAllAccounts: ( token ) => {
    const promise = axios({
      method: 'post',
      headers: { 
        'Jwt': token
      },
      url: 'api/accounts/get-all/'
    })
    return promise
  },
  updateAccount: ( token, obj ) => {
    const promise = axios({
      method: 'post',
      headers: { 
        'Jwt': token
      },
      data: obj,
      url: 'api/accounts/update/'
    })
    return promise
  },
  updateAccountPassword: ( token, obj ) => {
    const promise = axios({
      method: 'post',
      headers: { 
        'Jwt': token
      },
      data: obj,
      url: 'api/accounts/update-password/'
    })
    return promise
  }
}
export default account
