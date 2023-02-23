<template>
  <el-table 
    :data="saleTypeGroups" 
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
    <el-table-column prop="title" label="Title"></el-table-column>
    <el-table-column prop="is_active" label="Is Active"></el-table-column>
    <el-table-column prop="display_order" label="Display Order"></el-table-column>

  </el-table>
</template>

<script lang="js">
  import api from '/src/api/api.js'
  import { accountStore } from '/src/stores/account.js'
  export default {
    name: "TableSaleTypeGroups",
    props: [ 'reloadTrigger' ],
    emits: ['tableSaleTypeGroups:saleTypeGroupSelected'],
    data () {
      return {
        cellStyle: {
          padding: '5px'
        },
        selctedSaleTypeGroup: {},
        saleTypeGroups: [],
        tstriped: true
      }
    },
    computed: {
      token () {
        return accountStore().token
      }
    },
    methods: {
      getSaleTypeGroups () {
        api.saleTypeGroups.getSaleTypeGroups( this.token ).then( response => {
        this.saleTypeGroups = response.data.all_sale_type_groups
        })
      },
      rowSelected ( o ) {
        console.log('selected')
        //  this is where we remove the reactivity
        this.$emit('tableSaleTypeGroups:saleTypeGroupSelected', {...o} )
      }
    },
    mounted () {
      this.getSaleTypeGroups()
    },
    watch: {
      reloadTrigger ( oldVal, newVal ) {
        this.getSaleTypeGroups()
      }
    }
  }
</script>
