<template>
  <el-row>
    <el-col :xs="24">
      <p style="color: red">This currently lets the user delete and update willy nilly.  Need to make sure it doesn't compromise data.</p>
    </el-col>
  </el-row>
  <el-row>
    <el-col :xs="24">
      <el-button type="primary" @click="displayCreatePaymentType = true">{{ i18nCreate }} {{ iPaymentType }}</el-button>
    </el-col>
  </el-row>
  
  <el-row>
    <el-col :xs="24" :sm="12">
      <TablePaymentTypes
        :reloadTrigger="reloadTrigger"
        @tablePaymentTypes:paymentTypeSelected="paymentTypeSelected"
      />
    </el-col>
    <el-col :xs="24" :sm="12">
      <EditPaymentTypes
        v-if="selectedPaymentType"
        :selectedPaymentType="selectedPaymentType"
        @editPaymentType-close="closeEditPaymentTypes"
        @editPaymentType-update="paymentTypeUpdate"
        @editPaymentType-delete="paymentTypeDelete"
      />
      <CreatePaymentType
        v-if="displayCreatePaymentType"
        @createPaymentType:create="createPaymentType"
        @createPaymentType:close="closeCreatePaymentType"
      />
    </el-col>
  </el-row>
</template>

<script lang = "js">
  import TablePaymentTypes from '/src/views/PaymentTypes/tablePaymentTypes.vue'
  import EditPaymentTypes from '/src/views/PaymentTypes/editPaymentType.vue'
  import CreatePaymentType from '/src/views/PaymentTypes/createPaymentType.vue'
  import { accountStore } from '/src/stores/account.js'
  import { paymentTypesStore } from '/src/stores/paymentTypes.js'
  import api from '/src/api/api.js'
  import { ElMessage } from 'element-plus'
  export default {
    name: 'PaymentTypes',
    components: {
      TablePaymentTypes, EditPaymentTypes, CreatePaymentType
    },
    data () {
      return {
        reloadTrigger: 1,
        selectedPaymentType: null,
        displayCreatePaymentType: false
      }
    },
    computed: {
      i18nCreate () { return this.$i18n.t('message.create') },
      iPaymentType () { return this.$i18n.t('message.paymentType') },
      token() { return accountStore().token }
    },
    methods: {
      closeCreatePaymentType () {
        this.displayCreatePaymentType = false
        //  reset
      },
      createPaymentType ( o ) {
        //  convert string values
        o.is_active = parseInt(o.is_active)
        o.display_order = parseInt(o.display_order)
        //console.table(o)
        api.paymentTypes.createPaymentType( this.token, o ).then( response => {
          if( response.data.create == true ) {
            //  update the store
            paymentTypesStore().setActivePaymentTypes(response.data.active_payment_types)
            //  force Table component to reload
            this.reloadTrigger += 1
            ElMessage({
              type: 'success',
              message: 'PaymentType was created.'
            })
            //  close the create component
            this.displayCreatePaymentTypes = false
          } else {
            ElMessage({
              type: 'error',
              message: 'Error! Not created.'
            })
          }
        })
      },
      closeEditPaymentTypes () {
        this.selectedPaymentType = null
      },
      showCreatePaymentType () {
        this.displayCreatePaymentType = true
        this.selectedPaymentType = null
      },
      paymentTypeDelete ( o ) {
        console.log('o', o)
        api.paymentTypes.deletePaymentType( this.token, o.id ).then( response => {
          if(response.data.delete == true ) {
            //  reset selected
            this.selectedPaymentType = null
            //  update the store
            paymentTypesStore().setActivePaymentTypes(response.data.active_payment_types)

            //  force paymentTypes component to reload
            this.reloadTrigger += 1
            ElMessage({
              type: 'success',
              message: 'Payment type group was deletd.'
            })
          } else {
            ElMessage({
              type: 'error',
              message: 'Error!  Not deleted.'
            })
          }
        })
      },
      paymentTypeSelected ( o ) {
        this.selectedPaymentType = o
        this.displayCreatePaymentType = false
      },
      paymentTypeUpdate ( obj ) {
        //  get the types correct before sending the request
        //  the el-form components just like strings . . .  
        obj.is_active = parseInt(obj.is_active)
        api.paymentTypes.updatePaymentType( this.token, obj ).then( ( response ) => {
          if( response.data.update == true ) {
            //  update the store
            paymentTypesStore().setActivePaymentTypes(response.data.active_payment_types)
            //  force taxTypesTable component to reload
            this.reloadTrigger += 1
            ElMessage({
              type: 'success',
              message: 'Payment type was updated.'
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