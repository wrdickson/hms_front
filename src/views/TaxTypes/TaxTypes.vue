<template>
  <el-row>
    <el-col :xs="24">
      <p style="color: red">As with spaces, this currently lets the user delete and update willy nilly.  Need to make sure it doesn't compromise data.</p>
    </el-col>
  </el-row>
  <el-row>
    <el-col :xs="24">
      <el-button type="primary" @click="showCreateTaxType">{{i18nCreate}}&nbsp{{i18nTaxType}}</el-button>
    </el-col>
  </el-row>
  
  <el-row>
    <el-col :xs="24" :sm="12">
      <TableTaxTypes
        :reloadTrigger="reloadTrigger"
        @tableTaxTypes:taxTypeSelected="taxTypeSelected"
      />
    </el-col>
    <el-col :xs="24" :sm="12">
      <EditTaxTypes
        v-if="selectedTaxType"
        :selectedTaxType="selectedTaxType"
        @editTaxType-close="closeEditTaxTypes"
        @editTaxType-update="taxTypeUpdate"
        @editTaxType:delete="deleteTaxType"
      />
      <CreateTaxType
        v-if="displayCreateTaxType"
        @createTaxType:create="createTaxType"
        @createTaxType:close="closeCreateTaxType"
      />
    </el-col>
  </el-row>
</template>

<script lang="js">
  import TableTaxTypes from '/src/views/TaxTypes/tableTaxTypes.vue'
  import EditTaxTypes from '/src/views/TaxTypes/editTaxType.vue'
  import CreateTaxType from '/src/views/TaxTypes/createTaxType.vue'
  import { accountStore } from '/src/stores/account.js'
  import { taxTypesStore } from '/src/stores/taxTypes.js'
  import api from '/src/api/api.js'
  import { ElMessage } from 'element-plus'
  export default {
    name: 'TaxTypes',
    components: {
      TableTaxTypes, EditTaxTypes, CreateTaxType
    },
    data () {
      return {
        reloadTrigger: 1,
        selectedTaxType: null,
        displayCreateTaxType: false
      }
    },
    computed: {
      i18nCreate () { return this.$i18n.t('message.create') },
      i18nTaxType () { return this.$i18n.t('message.taxType') },
      token() { return accountStore().token }
    },
    methods: {
      closeCreateTaxType () {
        this.displayCreateTaxType = false
      },
      createTaxType ( o ) {
        //  convert string values
        o.is_current = parseInt(o.is_current)
        o.display_order = parseInt(o.display_order)
        o.tax_rate = parseFloat(o.tax_rate)
        console.table(o)
        api.taxTypes.createTaxType( this.token, o ).then( response => {
          if( response.data.create == true ) {
            //  update the store
            taxTypesStore().setTaxTypes(response.data.all_tax_types)
            //  force taxTypesTable component to reload
            this.reloadTrigger += 1
            ElMessage({
              type: 'success',
              message: 'Tax type was created.'
            })
            //  close the create component
            this.displayCreateTaxType = false
          } else {
            ElMessage({
              type: 'danger',
              message: 'Error! Not created.'
            })
          }
        })
      },
      closeEditTaxTypes () {
        this.selectedTaxType = null
      },
      deleteTaxType ( o ) {
        console.log(o)
        api.taxTypes.deleteTaxType( this.token, o ).then( response => {
          if( response.data.delete == true ) {
            //  update the store
            taxTypesStore().setTaxTypes(response.data.all_tax_types)
            //  force taxTypesTable component to reload
            this.reloadTrigger += 1
            ElMessage({
              type: 'success',
              message: 'Tax type was deleted.'
            })
          } else {
            ElMessage({
              type: 'danger',
              message: 'Error!  Not deleted.'
            })
          }
        })
      },
      showCreateTaxType () {
        this.displayCreateTaxType = true
        this.selectedTaxType = null
      },
      taxTypeSelected ( o ) {
        this.selectedTaxType = o
        this.displayCreateTaxType = false
      },
      taxTypeUpdate ( obj ) {
        //  get the types correct before sending the request
        //  the el-form components just like strings . . .  
        obj.is_current = parseInt(obj.is_current)
        obj.tax_rate = parseFloat(obj.tax_rate)
        obj.display_order = parseInt(obj.display_order)
        api.taxTypes.updateTaxType( this.token, obj ).then( ( response ) => {
          if( response.data.update == true ) {
            //  update the store
            taxTypesStore().setTaxTypes(response.data.all_tax_types)
            //  force taxTypesTable component to reload
            this.reloadTrigger += 1
            ElMessage({
              type: 'success',
              message: 'Tax type was updated.'
            })
          } else {
            ElMessage({
              type: 'danger',
              message: 'Error!  Not updated.'
            })
          }
        })
      }
    }
  }
</script>