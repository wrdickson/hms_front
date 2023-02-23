import axios from 'axios'

const saleTypeGroups = {

  createSaleTypeGroup: (token, obj ) => {
    const promise = axios({
      method: 'post',
      headers: {
        'Jwt': token
      },
      data: obj,
      url: 'api/sale-type-group-create/'
    })
    return promise
  },

  deleteSaleTypeGroup: ( token, saleTypeGroupId ) => {
    const promise = axios({
      method: 'post',
      headers: {
        'Jwt': token
      },
      data: {
        sale_type_group_id: saleTypeGroupId
      },
      url: 'api/sale-type-group-delete/'
    })
    return promise
  },

  getSaleTypeGroups: ( token ) => {
    const promise = axios({
      method: 'post',
      headers: {
        'Jwt': token
      },
      data: {
        a: 1
      },
      url: 'api/sale-type-groups/get-all/'
    })
    return promise
  },
  updateSaleTypeGroup: ( token, obj ) => {
    const promise = axios({
      method: 'post',
      headers: {
        'Jwt': token
      },
        data: {...obj},
      url: 'api/sale-type-group-update/'
    })
    return promise
  }

}

export default saleTypeGroups