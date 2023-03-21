<template>
  <el-row>
    <el-col :xs="24">
      <p style="color: red">This currently lets the user delete and update willy nilly.  Need to make sure it doesn't compromise data.</p>
    </el-col>
  </el-row>
  <el-row>
    <el-col :xs="24">
      <el-button type="primary" @click="displayCreateSaleTypeGroup = true, selectedSaleTypeGroup = null">{{ i18nCreate }} {{ iGroup }}</el-button>
    </el-col>
  </el-row>
  
  <el-row>
    <el-col :xs="24" :sm="12">
      <TableSaleTypeGroups
        :reloadTrigger="reloadTrigger"
        @tableSaleTypeGroups:saleTypeGroupSelected="saleTypeGroupSelected"
      />
    </el-col>
    <el-col :xs="24" :sm="12">
      <EditSaleTypeGroup
        v-if="selectedSaleTypeGroup"
        :selectedSaleTypeGroup="selectedSaleTypeGroup"
        @editSaleTypeGroup-close="closeEditSaleTypeGroup"
        @editSaleTypeGroup-update="saleTypeGroupUpdate"
        @editSaleTypeGroup:delete="saleTypeGroupDelete"
      />
      <CreateSaleTypeGroup
        v-if="displayCreateSaleTypeGroup"
        @createSaleTypeGroup:create="createSaleTypeGroup"
        @createSaleTypeGroup:close="closeCreateSaleTypeGroup"
      />
    </el-col>
  </el-row>
</template>

<script lang = "js">
  import TableSaleTypeGroups from '/src/views/SaleTypeGroups/tableSaleTypeGroups.vue'
  
  import EditSaleTypeGroup from '/src/views/SaleTypeGroups/editSaleTypeGroup.vue'
  import CreateSaleTypeGroup from '/src/views/SaleTypeGroups/createSaleTypeGroup.vue'
  
  import { accountStore } from '/src/stores/account.js'
  import { taxTypesStore } from '/src/stores/taxTypes.js'
  import { saleTypeGroupsStore } from '/src/stores/saleTypeGroups.js'
  import api from '/src/api/api.js'
  import { ElMessage } from 'element-plus'
  export default {
    name: 'TaxTypes',
    components: {
      TableSaleTypeGroups, EditSaleTypeGroup, CreateSaleTypeGroup
    },
    data () {
      return {
        reloadTrigger: 1,
        selectedSaleTypeGroup: null,
        displayCreateSaleTypeGroup: false
      }
    },
    computed: {
      i18nCreate () { return this.$i18n.t('message.create') },
      i18nSaleTypeGroup () { return this.$i18n.t('message.saleTypeGroup') },
      iGroup () { return this.$i18n.t('message.group') },
      token() { return accountStore().token }
    },
    methods: {
      closeCreateSaleTypeGroup () {
        this.displayCreateSaleTypeGroup = false
        //  reset
      },
      createSaleTypeGroup ( o ) {
        //  convert string values
        o.is_active = parseInt(o.is_active)
        o.display_order = parseInt(o.display_order)
        o.title = o.title
        //console.table(o)
        api.saleTypeGroups.createSaleTypeGroup( this.token, o ).then( response => {
          if( response.data.create == true ) {
            //  update the store
            saleTypeGroupsStore().setSaleTypeGroups(response.data.all_sale_type_groups)
            //  force Table component to reload
            this.reloadTrigger += 1
            ElMessage({
              type: 'success',
              message: 'Group was created.'
            })
            //  close the create component
            this.displayCreateSaleTypeGroup = false
          } else {
            ElMessage({
              type: 'error',
              message: 'Error! Not created.'
            })
          }
        })
      },
      closeEditSaleTypeGroup () {
        this.selectedSaleTypeGroup = null
      },
      deleteSaleTypeGroup ( o ) {
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
      showCreateSaleTypeGroup () {
        this.displayCreateSaleTypeGroup = true
        this.selectedSaleTypeGroup = null
      },
      saleTypeGroupDelete ( o ) {
        console.log('o', o)
        api.saleTypeGroups.deleteSaleTypeGroup( this.token, o.id ).then( response => {
          if(response.data.delete == true ) {
            //  reset selected
            this.selectedSaleTypeGroup = null
            //  update the store
            saleTypeGroupsStore().setSaleTypeGroups(response.data.all_sale_type_groups)

            //  force saleTypeGroups component to reload
            this.reloadTrigger += 1
            ElMessage({
              type: 'success',
              message: 'Sale type group was updated.'
            })
          } else {
            ElMessage({
              type: 'error',
              message: 'Error!  Not deleted.'
            })
          }
        })
      },
      saleTypeGroupSelected ( o ) {
        this.selectedSaleTypeGroup = o
        this.displayCreateSaleTypeGroup = false
      },
      saleTypeGroupUpdate ( obj ) {
        //  get the types correct before sending the request
        //  the el-form components just like strings . . .  
        obj.is_active = parseInt(obj.is_active)
        api.saleTypeGroups.updateSaleTypeGroup( this.token, obj ).then( ( response ) => {
          if( response.data.update == true ) {
            //  update the store
            saleTypeGroupsStore().setSaleTypeGroups(response.data.all_sale_type_groups)
            //  force taxTypesTable component to reload
            this.reloadTrigger += 1
            ElMessage({
              type: 'success',
              message: 'Tax type was updated.'
            })
          } else {
            ElMessage({
              type: 'error',
              message: 'Error!  Not updated.'
            })
          }
          
        })
      }
    }
  }
</script>