import { defineStore } from 'pinia'
import _ from 'lodash'

export const optionsStore = defineStore({
  id: 'optionsStore',
  state: () => ({
    autoloadOptions: null,
    options: null
  }),
  actions: {
    setAutoloadOptions ( autoloadOptions ) {
      this.autoloadOptions = autoloadOptions
    }
  }

})