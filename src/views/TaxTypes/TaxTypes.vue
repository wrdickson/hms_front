<template>
  <TableTaxTypes
    @tableTaxTypes:taxTypeSelected="taxTypeSelected"
  />
  <EditTaxTypes
    v-if="selectedTaxType"
    :selectedTaxType="selectedTaxType"
    @editTaxType-close="closeEditTaxTypes"
    @editTaxType-update="taxTypeUpdate"
  />
  
</template>

<script lang="js">
  import TableTaxTypes from '/src/views/TaxTypes/tableTaxTypes.vue'
  import EditTaxTypes from '/src/views/TaxTypes/editTaxType.vue'
  import { accountStore } from '/src/stores/account.js'
  import api from '/src/api/api.js'
  export default {
    name: 'TaxTypes',
    components: {
      TableTaxTypes, EditTaxTypes
    },
    data () {
      return {
        selectedTaxType: null
      }
    },
    computed: {
      token() { return accountStore().token }
    },
    methods: {
      closeEditTaxTypes () {
        this.selectedTaxType = null
      },
      taxTypeSelected ( o ) {
        this.selectedTaxType = o
      },
      taxTypeUpdate ( obj ) {
        //  get the types correct before sending the request
        //  the el-form components just like strings . . .  
        obj.is_current = parseInt(obj.is_current)
        obj.tax_rate = parseFloat(obj.tax_rate)
        obj.display_order = parseInt(obj.display_order)
        console.table(obj)
        console.log( this.token )
        api.taxTypes.updateTaxType( this.token, obj ).then( ( response ) => {

        })
      }
    }
  }
</script>