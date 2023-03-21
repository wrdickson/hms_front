import { defineStore } from 'pinia'
import _ from 'lodash'

export const saleTypesStore = defineStore({
  id: 'saleTypesStore',
  state: () => ({
    saleTypes: null
  }),
  actions: {
    setSaleTypes ( saleTypes ) {
      this.saleTypes = saleTypes
    }
  },
  getters: {
    activeSaleTypes ( state ) {
      _.each( state.saleTypes, o => {
        return o.is_active == 1
      })
    }
  }

})