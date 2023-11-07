import { defineStore } from 'pinia'

export const paymentTypesStore = defineStore({
  id: 'paymentTypesStore',
  state: () => ({
    allPaymentTypes: null,
    activePaymentTypes: null
  }),
  actions: {
    setActivePaymentTypes ( activePaymentTypes ) {
      this.activePaymentTypes = activePaymentTypes
    },
    setAllPaymentTypes ( allPaymentTypes ) {
      this.allPaymentTypes = allPaymentTypes
    }
  }
})