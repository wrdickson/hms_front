<template>
  <p>Tax Types</p>
  <el-table 
    :data="taxTypes" 
    stripe
    highlight-current-row
    height="500"
    size="small"
    style="width: 100%"
    cell-class-name="t-table-cell"
    table-layout="auto"
    @row-click="rowSelected"
    >
    <el-table-column prop="id" label="Id" width="50"></el-table-column>
    <el-table-column prop="tax_title" label="Title" width="150"></el-table-column>
    <el-table-column prop="tax_rate" label="Tax Rate" width="100"></el-table-column>
    <el-table-column prop="is_current" label="Is Current" width="80"></el-table-column>
    <el-table-column prop="display_order" label="Display Order" width="150"></el-table-column>

  </el-table>
</template>

<script lang="js">
  import api from '/src/api/api.js'
  import { accountStore } from '/src/stores/account.js'
  export default {
    name: "TableTaxTypes",
    props: [ 'reloadTrigger' ],
    emits: ['tableTaxTypes:taxTypeSelected'],
    data () {
      return {
        cellStyle: {
          padding: '5px'
        },
        selctedTaxType: {},
        taxTypes: [],
        tstriped: true
      }
    },
    computed: {
      token () {
        return accountStore().token
      }
    },
    methods: {
      getTaxTypes () {
        api.taxTypes.getTaxTypes( this.token ).then( response => {
        this.taxTypes = response.data.all_tax_types
        })
      },
      rowSelected ( o ) {
        console.log('selected')
        //  this is where we remove the reactivity
        this.$emit('tableTaxTypes:taxTypeSelected', {...o} )
      }
    },
    mounted () {
      this.getTaxTypes()
    },
    watch: {
      reloadTrigger ( oldVal, newVal ) {
        this.getTaxTypes()
      }
    }
  }
</script>

<style>

.tax-table-header-row {
  background-color: #333 !important;
}

</style>