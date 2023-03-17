import axios from 'axios'

const paymentTypes = {
  getActivePaymentTypes: (  ) => {
    const promise = axios({
      method: 'post',
      url: 'api/payment-types/get-active'
    })
    return promise
  },
  getAllPaymentTypes: (  ) => {
    const promise = axios({
      method: 'post',
      url: 'api/payment-types/get-all'
    })
    return promise
  },
  createPaymentType: ( token, obj ) => {
    const promise = axios({
      method: 'post',
      headers: { 'Jwt': token },
      data: obj,
      url: 'api/payment-types/create/'
    })
    return promise
  },
  deletePaymentType: ( token, id ) => {
    const promise = axios({
      method: 'post',
      headers: { 'Jwt': token },
      data: { id: id },
      url: 'api/payment-types/delete/'
    })
    return promise
  },
  updatePaymentType: ( token, obj ) => {
    const promise = axios({
      method: 'post',
      headers: {
        'Jwt': token
      },
      data: obj,
      url: 'api/payment-types/update/'
    })
    return promise
  }
}

export default paymentTypes
