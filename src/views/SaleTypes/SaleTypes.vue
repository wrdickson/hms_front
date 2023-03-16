<template>
  <div>SaleTypes</div>
  <el-button @click="showCreateSaleType" type="primary">{{createSaleTypeLabel}}</el-button>
  <SaleTypesTable
    :saleTypes="saleTypes"
    @saleTypesTable:saleTypeSelected="saleTypeSelected"
  />

  <CreateSaleType
    v-if="displayCreateSaleType"
    @createSaleType:close="closeCreateSaleType"
    @createSaleType:create="createSaleType"
    />

  <EditSaleType
    v-if="selectedSaleType"
    :selectedSaleType="selectedSaleType"
    @editSaleType:close="closeEditor"
    @editSaleType:update="updateSaleType"
    @editSaleType:delete="deleteSaleType"
  />

</template>

<script lang = "js">
  import SaleTypesTable from '/src/views/SaleTypes/saleTypesTable.vue'
  import EditSaleType from '/src/views/SaleTypes/editSaleType.vue'
  import CreateSaleType from '/src/views/SaleTypes/createSaleType.vue'
  import { accountStore } from '/src/stores/account.js'
  import { saleTypesStore } from '/src/stores/saleTypes.js'
  import { ElMessage } from 'element-plus'
  import api from '/src/api/api.js'
  export default {
    name: 'SaleTypes',
    components: {
      SaleTypesTable,
      EditSaleType,
      CreateSaleType
    },
    data () {
      return {
        saleTypes: [],
        selectedSaleType: null,
        displayCreateSaleType: false
      }
    },
    computed: {
      token () {
        return accountStore().token
      },
      createSaleTypeLabel () { return this.$i18n.t('message.create') + ' ' + this.$i18n.t('message.saleType') }
    },
    methods: {
      closeCreateSaleType () {
        this.displayCreateSaleType = false
      },
      closeEditor () {
        this.selectedSaleType = null
      },
      createSaleType( obj ){
        console.table(obj)
        //  set types
        obj.display_order = parseInt(obj.display_order)
        obj.is_active = parseInt(obj.is_active)
        obj.is_fixed_price = parseInt(obj.is_active)
        obj.fixed_price = parseFloat(obj.fixed_price)
        obj.title = obj.title.trim()
        api.saleTypes.createSaleType(this.token, obj).then( response => {
          if( response.data && response.data.create == true){
            saleTypesStore().setSaleTypes(response.data.all_sale_types)
            this.saleTypes = response.data.all_sale_types
            ElMessage({
              type: 'success',
              message: 'Sale Type created'
            })
          } else {
            ElMessage({
              type: 'warning',
              message: 'ERROR: not created'
            })
          }
        })
      },
      deleteSaleType( obj ) {
        console.log('delete')
        console.table( obj )
      },
      getSaleTypes () {
        api.saleTypes.getSaleTypes(this.token).then( response => {
          console.table(response.data.all_sale_types)
          this.saleTypes = response.data.all_sale_types
        })
      },
      saleTypeSelected( saleType ) {
        this.displayCreateSaleType = false
        this.selectedSaleType = saleType
      },
      showCreateSaleType () {
        this.selectedSaleType = null
        this.displayCreateSaleType = true
      },
      updateSaleType( obj ) {
        //set types
        obj.is_fixed_price = parseInt(obj.is_fixed_price)
        obj.is_active = parseInt(obj.is_active)
        obj.display_order = parseInt(obj.display_order)
        console.table(obj)
        api.saleTypes.updateSaleType( this.token, obj ).then( response => {
          if( response.data && response.data.update == true){
            saleTypesStore().setSaleTypes(response.data.all_sale_types)
            this.saleTypes = response.data.all_sale_types
            ElMessage({
              type: 'success',
              message: 'Sale Type updated'
            })
          } else {
            ElMessage({
              type: 'warning',
              message: 'ERROR: not updated'
            })
          }
        })
      }
    },
    mounted () {
      this.getSaleTypes()
    }
  }
</script>
