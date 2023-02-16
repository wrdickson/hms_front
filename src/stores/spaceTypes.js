import { defineStore } from 'pinia'

export const spaceTypesStore = defineStore({
  id: 'spaceTypesStore',
  state: () => ({
    spaceTypes: null
  }),
  actions: {
    setSpaceTypes ( spaceTypes ) {
      this.spaceTypes = spaceTypes
    }
  }

})