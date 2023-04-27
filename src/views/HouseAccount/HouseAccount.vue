<template>
  <FolioView
    :folioId="houseAccount"
    selectedReservation=false
    :componentKey="componentKey"
  ></FolioView>
</template>

<script lang = "js">
  import api from '/src/api/api.js'
  import { accountStore } from '/src/stores/account.js'
  import { optionsStore } from '/src/stores/options.js'
  import FolioView from '/src/views/FolioView/FolioView.vue'
  export default {
    name: "HouseAccountVue",
    props: [],
    components: { FolioView },
    data () {
      return {
        componentKey: 1
      }
    },
    computed: {
      token () {
        return accountStore().token
      },
      houseAccount () {
        return optionsStore().autoloadOptions.house_account_folio.option_value
      }
    },
    methods: {
      getHouseAccount () {
        api.folios.getFolio1(this.token, this.houseAccount ).then( response => {
          console.log(response)
        })
      }
    },
    mounted () {
      this.getHouseAccount()
    }
  }
</script>