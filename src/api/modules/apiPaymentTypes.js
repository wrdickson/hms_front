import axios from 'axios'

const paymentTypes = {
  getActivePaymentTypes: (  ) => {
    const promise = axios({
      method: 'post',
      url: 'api/payment-types/get-active'
    })
    return promise
  }
}

export default paymentTypes
