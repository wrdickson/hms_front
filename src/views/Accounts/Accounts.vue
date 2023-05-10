<template>
  <div>
    <el-button type="primary" @click="showCreateAccount">{{ i18nCreate }} {{ iAccount }}</el-button>

    <TableAccounts
      :reloadTrigger="reloadTrigger"
      @tableAccounts:accountSelected="accountSelected"
    />

    <EditAccount
      v-if="selectedAccount"
      :selectedAccount="selectedAccount"
      @edit-account-close="accountEditClose"
      @edit-account-update="accountUpdate"
      @edit-account-password-update="passwordUpdate"
    />
    <CreateAccount
      v-if="displayCreateAccount"
      @createAccount:create="createAccount"
      @createAccount:close="closeCreateAccount"
    />

  </div>
</template>

<script lang = "js">
  import TableAccounts from '/src/views/Accounts/tableAccounts.vue'
  import EditAccount from '/src/views/Accounts/editAccount.vue'
  import CreateAccount from '/src/views/Accounts/createAccount.vue'
  import { accountStore } from '/src/stores/account.js'
  import api from '/src/api/api.js'
  import { ElMessage } from 'element-plus'
  export default {
    name: 'Accounts',
    components: {
      TableAccounts, EditAccount, CreateAccount
    },
    data () {
      return {
        reloadTrigger: 1,
        selectedAccount: null,
        displayCreateAccount: false
      }
    },
    computed: {
      i18nCreate () { return this.$i18n.t('message.create') },
      iAccount () { return this.$i18n.t('message.account') },
      token() { return accountStore().token }
    },
    methods: {
      accountEditClose () {
        this.selectedAccount = null
      },
      closeCreateAccount () {
        this.displayCreateAccount = false
        //  reset
      },
      createAccount ( o ) {
        //  convert string values
        o.is_active = parseInt(o.is_active)
        o.password = o.password1
        console.table(o)
        api.account.createAccount( this.token, o ).then( response => {
          if( response.data.create == true ) {

            this.reloadTrigger += 1
            ElMessage({
              type: 'success',
              message: 'Account was created.'
            })
            //  close the create component
            this.displayCreateAccount = false
          } else {
            ElMessage({
              type: 'error',
              message: 'Error! Not created.'
            })
          }
        })
      },
      closeEditAccount () {
        this.selectedAccount = null
      },
      deleteAccount ( o ) {
        console.log(o)
        api.accounts.deleteAccount( this.token, o ).then( response => {
          if( response.data.delete == true ) {
            //  process
          } else {
            ElMessage({
              type: 'danger',
              message: 'Error!  Not deleted.'
            })
          }
        })
      },
      passwordUpdate( account, newPassword) {
        console.table(account)
        console.log(newPassword)
        const obj = {
          id: account.id,
          pwd: newPassword
        }
        api.account.updateAccountPassword( this.token, obj ).then( response => {
          if( response && response.data.update ) {
            //  force table to reload
            this.reloadTrigger += 1
            ElMessage({
              type: 'success',
              message: 'Account was updated.'
            })
          } else {
            ElMessage({
              type: 'error',
              message: 'Error!  Not updated.'
            })
          }
        })
      },
      showCreateAccount () {
        this.displayCreateAccount = true

        this.selectedAccount = null
      },
      accountSelected ( o ) {
        this.selectedAccount = o
        this.displayCreateAccount = false
      },
      accountUpdate ( obj ) {
        //  get the types correct before sending the request
        //  the el-form components just like strings . . .  
        obj.is_active = parseInt(obj.is_active)
        console.table(obj)
        console.log(obj.roles)
        api.account.updateAccount( this.token, obj ).then( ( response ) => {
          if( response.data.update == true ) {
            //  force table to reload
            this.reloadTrigger += 1
            ElMessage({
              type: 'success',
              message: 'Account was updated.'
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