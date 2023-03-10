import axios from 'axios'

const customers = {

  createCustomer: ( token, lastName, firstName, email, phone ) => {
    const request = axios({
      headers: {
        'Jwt': token
      },
      method: 'post',
      data: {
        lastName: lastName,
        firstName: firstName,
        email: email,
        phone: phone
      },
      url: 'api/customers/'
    })
    return request
  },

  searchCustomers: (lastName, firstName, token, offset, limit) => {
    const request = axios({
      headers: {
        'Jwt': token
      },
      method: 'post',
      data: {
        lastName: lastName,
        firstName: firstName,
        offset: offset,
        limit: limit
      },
      url: 'api/customers/search'
    })
    return request
  }
}

export default customers