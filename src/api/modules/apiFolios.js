import axios from 'axios'
import { accountStore } from '/src/stores/account.js'

const folios = {
  getFolio1: ( token, folioId ) => {
    const promise = axios({
      method: 'post',
      headers: {
        jwt: token
      },
      data: {
        folio_id: folioId
      },
      url: 'api/folios/get-folio-1'
    })
    return promise
  },

  getFolio2: (folioId ) => {
    const promise = axios({
      method: 'post',
      headers: {
        jwt: accountStore().token
      },
      data: {
        folio_id: folioId
      },
      url: 'api/folios/get-folio-1'
    })
    return promise
  }
}

export default folios
