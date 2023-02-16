import axios from 'axios'

const taxTypes = {

  createTaxType ( token, obj ) {
    const promise = axios({
      method: 'post',
      headers: {
        'Jwt': token
      },
      data: obj,
      url: 'api/tax-types-create/'
    })
    return promise
  },

  deleteTaxType ( token, obj ) {
    const promise = axios({
      method: 'post',
      headers: {
        'Jwt': token
      },
      data: obj,
      url: 'api/tax-types-delete/'
    })
    return promise
  },

  getTaxTypes: ( token ) => {
    const promise = axios({
      method: 'post',
      headers: {
        'Jwt': token
      },
      data: {
        a: 1
      },
      url: 'api/tax-types/get-all/'
    })
    return promise
  },
  updateTaxType: ( token, obj ) => {
    const promise = axios({
      method: 'post',
      headers: {
        'Jwt': token
      },
      data: {
        uObj: obj
      },
      url: 'api/tax-type-update/'
    })
    return promise
  }

}

export default taxTypes