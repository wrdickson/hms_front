import axios from 'axios'

const saleTypes = {

  createSaleType: ( token, obj ) => {
    const request = axios({
      method: 'post',
      headers: {
        'Jwt': token
      },
      data: obj,
      url: 'api/sale-types/create/'
    })
    return request
  },

  getSaleTypes: ( token ) => {
    const request = axios({
      method: 'post',
      headers: {
        'Jwt': token
      },
      data: {
        a: 1
      },
      url: 'api/sale-types/get-all/'
    })
    return request
  },
  updateSaleType: ( token, obj ) => {
    const request = axios({
      method: 'post',
      headers: {
        'Jwt': token
      },
      data: obj,
      url: 'api/sale-types/update/'
    })
    return request
  }

}

export default saleTypes