<template>
  <el-table 
    :data="paymentTypes" 
    stripe
    highlight-current-row
    height="500"
    size="small"
    style="width: 100%"
    cell-class-name="t-table-cell"
    table-layout="auto"
    @row-click="rowSelected"
    >
    <el-table-column prop="id" label="Id"></el-table-column>
    <el-table-column prop="payment_title" label="Title"></el-table-column>
    <el-table-column prop="is_active" label="Is Active"></el-table-column>
    <el-table-column prop="display_order" label="Display Order"></el-table-column>

  </el-table>
</template>

<script lang="js">
  import api from '/src/api/api.js'
  import { accountStore } from '/src/stores/account.js'
  export default {
    name: "TablePaymentTypes",
    props: [ 'reloadTrigger' ],
    emits: ['tablePaymentTypes:paymentTypeSelected'],
    data () {
      return {
        cellStyle: {
          padding: '5px'
        },
        selctedPaymentType: {},
        paymentTypes: [],
        tstriped: true
      }
    },
    computed: {
      token () {
        return accountStore().token
      }
    },
    methods: {
      getAllPaymentTypes () {
        api.paymentTypes.getAllPaymentTypes( this.token ).then( response => {
        this.paymentTypes = response.data.all_payment_types
        })
      },
      rowSelected ( o ) {
        console.log('selected')
        //  this is where we remove the reactivity
        this.$emit('tablePaymentTypes:paymentTypeSelected', {...o} )
      }
    },
    mounted () {
      this.getAllPaymentTypes()
    },
    watch: {
      reloadTrigger ( oldVal, newVal ) {
        this.getAllPaymentTypes()
      }
    }
  }
</script>
