<template>
  <el-row>
    <el-col :xs="24">
      <p style="color: red">This currently lets the user delete and update willy nilly.  Need to make sure it doesn't compromise data.</p>
    </el-col>
  </el-row>
  <el-row>
    <el-col :xs="24">
      <el-button type="primary" @click="displayCreateSpaceType = true">{{ i18nCreate }} {{ i18nSpaceType }}</el-button>
    </el-col>
  </el-row>
  
  <el-row>
    <el-col :xs="24" :sm="12">
      <TableSpaceTypes
        :reloadTrigger="reloadTrigger"
        @tableSpaceTypes:spaceTypeSelected="spaceTypeSelected"
      />
    </el-col>
    <el-col :xs="24" :sm="12">
      <EditSpaceType
        v-if="selectedSpaceType"
        :selectedSpaceType="selectedSpaceType"
        @editSpaceType-close="closeEditSpaceType"
        @editSpaceType-update="spaceTypeUpdate"
        @editSpaceType:delete="spaceTypeDelete"
      />
      <CreateSpaceType
        v-if="displayCreateSpaceType"
        @createSpaceType:create="createSpaceType"
        @createSpaceType:close="closeCreateSpaceType"
      />
    </el-col>
  </el-row>
</template>

<script lang="js">
  import TableSpaceTypes from '/src/views/SpaceTypes/tableSpaceTypes.vue'
  
  import EditSpaceType from '/src/views/SpaceTypes/editSpaceType.vue'
  import CreateSpaceType from '/src/views/SpaceTypes/createSpaceType.vue'
  
  import { accountStore } from '/src/stores/account.js'
  import { taxTypesStore } from '/src/stores/taxTypes.js'
  import { spaceTypesStore } from '/src/stores/spaceTypes.js'
  import api from '/src/api/api.js'
  import { ElMessage } from 'element-plus'
  export default {
    name: 'TaxTypes',
    components: {
      TableSpaceTypes, EditSpaceType, CreateSpaceType
    },
    data () {
      return {
        reloadTrigger: 1,
        selectedSpaceType: null,
        displayCreateSpaceType: false
      }
    },
    computed: {
      i18nCreate () { return this.$i18n.t('message.create') },
      i18nSpaceType () { return this.$i18n.t('message.spaceType') },
      iGroup () { return this.$i18n.t('message.spaceType') },
      token() { return accountStore().token }
    },
    methods: {
      closeCreateSpaceType () {
        this.displayCreateSpaceType = false
        //  reset
      },
      createSpaceType ( o ) {
        //  convert string values
        o.is_active = parseInt(o.is_active)
        o.display_order = parseInt(o.display_order)
        o.title = o.title
        //console.table(o)
        api.spaceTypes.createSpaceType( this.token, o ).then( response => {
          if( response.data.create == true ) {
            //  update the store
            spaceTypesStore().setSpaceTypes(response.data.all_sale_type_groups)
            //  force Table component to reload
            this.reloadTrigger += 1
            ElMessage({
              type: 'success',
              message: 'Group was created.'
            })
            //  close the create component
            this.displayCreateSpaceType = false
          } else {
            ElMessage({
              type: 'error',
              message: 'Error! Not created.'
            })
          }
        })
      },
      closeEditSpaceType () {
        this.selectedSpaceType = null
      },
      deleteSpaceType ( o ) {
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
      showCreateSpaceType () {
        this.displayCreateSpaceType = true
        this.selectedSpaceType = null
      },
      spaceTypeDelete ( o ) {
        console.log('o', o)
        api.spaceTypes.deleteSpaceType( this.token, o.id ).then( response => {
          if(response.data.delete == true ) {
            //  reset selected
            this.selectedSpaceType = null
            //  update the store
            spaceTypesStore().setSpaceTypes(response.data.all_sale_type_groups)

            //  force spaceTypes component to reload
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
      spaceTypeSelected ( o ) {
        this.selectedSpaceType = o
        this.displayCreateSpaceType = false
      },
      spaceTypeUpdate ( obj ) {
        //  get the types correct before sending the request
        //  the el-form components just like strings . . .  
        obj.is_active = parseInt(obj.is_active)
        api.spaceTypes.updateSpaceType( this.token, obj ).then( ( response ) => {
          if( response.data.update == true ) {
            //  update the store
            spaceTypesStore().setSpaceTypes(response.data.all_sale_type_groups)
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