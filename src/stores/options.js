import { defineStore } from 'pinia'
import _ from 'lodash'

export const optionsStore = defineStore({
  id: 'optionsStore',
  state: () => ({
    autoloadOptions: null
  }),
  actions: {
    setAutoloadOptions ( autoloadOptions ) {
      this.autoloadOptions = autoloadOptions
    }
  }

})