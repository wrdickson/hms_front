<template>
  <el-table 
    :data="accounts" 
    stripe
    highlight-current-row
    height="200"
    size="small"
    style="width: 100%"
    cell-class-name="t-table-cell"
    table-layout="auto"
    @row-click="rowSelected"
    >
    <el-table-column prop="id" label="Id"></el-table-column>
    <el-table-column prop="username" label="Username"></el-table-column>
    <el-table-column prop="permission" label="Permission"></el-table-column>
    <el-table-column prop="email" label="Email"></el-table-column>
    <el-table-column prop="is_active" label="Is Active"></el-table-column>

  </el-table>
</template>

<script lang="js">
  import api from '/src/api/api.js'
  import { accountStore } from '/src/stores/account.js'
  export default {
    name: "TableAccounts",
    props: [ 'reloadTrigger' ],
    emits: ['tableAccounts:accountSelected'],
    data () {
      return {
        cellStyle: {
          padding: '5px'
        },
        selctedAccount: {},
        accounts: [],
        tstriped: true
      }
    },
    computed: {
      token () {
        return accountStore().token
      }
    },
    methods: {
      getAccounts () {
        api.account.getAllAccounts( this.token ).then( response => {
        this.accounts = response.data.all_accounts
        })
      },
      rowSelected ( o ) {
        console.log('selected')
        //  this is where we remove the reactivity
        this.$emit('tableAccounts:accountSelected', {...o} )
      }
    },
    mounted () {
      this.getAccounts()
    },
    watch: {
      reloadTrigger ( oldVal, newVal ) {
        this.getAccounts()
      }
    }
  }
</script>
