<template>
  <div v-if="eAccount && showEditAccount">
    <div>{{ i18nEdit }}&nbsp{{ i18nAccount }}</div>
    <el-button type="primary" @click="toggleEditors">{{editPwdLabel}}</el-button>
    <el-form
      :model="eAccount"
      label-width="140px"
      :rules="rules"
      ref="actRef"
    >
    <el-form-item :label="i18nName" prop="username">
      <el-input v-model="eAccount.username"/>
    </el-form-item>
    <el-form-item :label="iEmail" prop="email">
      <el-input v-model="eAccount.email"/>
    </el-form-item>
    <el-form-item :label="iPermission">
      <el-select v-model="eAccount.permission">
        <template v-for="perm in pArr">
          <el-option :label="perm" :value="perm"></el-option>
        </template>
      </el-select>
   </el-form-item>
    <el-form-item :label="i18nIsActive">
      <el-select v-model="eAccount.is_active" placeholder="Select">
          <el-option :label="i18nTrue" value="1"/>
          <el-option :label="i18nFalse" value="0"/>
        </el-select>
    </el-form-item>

      <el-form-item>
        <el-button type="success" @click="updateAccount('actRef')">{{ i18nUpdate }}</el-button>
      </el-form-item>
    </el-form>
  </div>

  <div v-if="showEditPassword">
    <div>{{eAccount.username}}</div>
    <el-button type="primary" @click="toggleEditors">{{editActLabel}}</el-button>
    <el-form
      :model="pwdEdit"
      label-width="140px"
      :rules="rules"
      ref="pwdRef"
    >
      <el-form-item :label="iPassword" prop="password1">
        <el-input type="password" show-password v-model="pwdEdit.password1"/>
      </el-form-item>
      <el-form-item :label="iPassword" prop="password2">
        <el-input type="password" show-password v-model="pwdEdit.password2"/>
      </el-form-item>
      <el-form-item>
        <el-button type="success" @click="updatePassword('pwdRef')">{{i18nUpdate}}</el-button>
      </el-form-item>
    </el-form>
  </div>

  <div>
    <el-form label-width="140px">
      <el-form-item>
        <el-button type="primary" @click="close">{{ i18nClose }}</el-button>
      </el-form-item>
    </el-form>
  </div>

</template>

<script lang = "js">
  //import Schema from 'async-validator';
  //Schema.warning = function(){};
  export default {
    name: 'EditAccount',
    props: ['selectedAccount'],
    emits: [ 'edit-account-update', 'edit-account-close', 'edit-account-password-update' ],
    data () {
      return {
        eAccount: null,
        rules: {
          username: [
            { required: true, message: 'username is required', trigger: 'change'},
            { min: 4, max: 24, message: '4 to 24 characters', trigger: 'change' }
          ],
          email: [
            { required: true, message: 'Email is required', trigger: 'change' },
            { validator: this.isEmail, message: 'Invalid email', trigger: 'change' }
          ],
          password1: [
            { required: true, message: 'password is required', trigger: 'change'},
            { min: 6, max: 16, message: '6 to 16 characters', trigger: 'change' },
            { validator: this.isAlphanumDashStarUnderscore, message: 'alphanum, dash, star, underscore', trigger: 'change' }
          ],
          password2: [
            { required: true, message: 'password is required', trigger: 'change'},
            { min: 6, max: 16, message: '6 to 16 characters', trigger: 'change' },
            { validator: this.isAlphanumDashStarUnderscore, message: 'alphanum, dash, star, underscore', trigger: 'change' },
            { validator: this.isSameAsPassword1, message: 'passwords must match', trigger: 'change' }
          ]
        },
        pArr: [1,2,3,4,5,6,7,8,9,19],
        pwdEdit: {
          password1: '',
          password2: ''
        },
        showEditAccount: true,
        showEditPassword: false
      }
    },
    computed: {
      i18nClose () { return this.$i18n.t('message.close') },
      i18nName () { return this.$i18n.t('message.name') },
      i18nEdit () { return this.$i18n.t('message.edit') },
      i18nFalse () { return this.$i18n.t('message.false') },
      i18nIsActive () { return this.$i18n.t('message.isActive') },
      i18nAccount () { return this.$i18n.t('message.account') },
      i18nTrue () { return this.$i18n.t('message.true') },
      i18nUpdate() { return this.$i18n.t('message.update') },
      iPermission () { return this.$i18n.t('message.permission') },
      iEmail() { return this.$i18n.t('message.email') },
      iPassword () { return this.$i18n.t('message.password') },
      iDelete () { return this.$i18n.t('message.delete') },
      editActLabel () { return this.$i18n.t('message.edit') + ' ' + this.$i18n.t('message.account') },
      editPwdLabel () { return this.$i18n.t('message.update') + ' ' + this.$i18n.t('message.password') },
    },
    methods: {
      close () {
        this.$emit('edit-account-close')
      },
      deleteAccount () {
        console.log('del')
        this.$emit('editAccount:delete', {...this.eAccount})
      },
      toggleEditors () {
        this.showEditAccount = !this.showEditAccount
        this.showEditPassword = !this.showEditPassword
        this.pwdEdit.password1 = ''
        this.pwdEdit.password2 = ''
      },
      updateAccount ( actRef ) {
        this.$refs[actRef].validate( (valid) => {
          if(valid) {
            let pAccount = {...this.eAccount}
            pAccount.roles = [...this.eAccount.roles]
            this.$emit('edit-account-update', pAccount)
          } else {
            console.log('not valid')
          }
        })
      },
      updatePassword ( pwdRef ) {
        this.$refs[pwdRef].validate( (valid) => {
          if(valid) {
            this.$emit('edit-account-password-update', {...this.eAccount}, this.pwdEdit.password1)
          } else {
            console.log('not valid')
          }
        })
      },
      isAlphanumDashStarUnderscore ( rule, value, callback ) {
        const pattern = /^[A-Za-z0-9_*-]+$/
        if( pattern.test(value) == false ) {
          callback( new Error('must be numbers') )
        } else {
          callback()
        }
      },
      isFloat ( rule, value, callback ) {
        if( isNaN(Number(value) )) {
          callback(new Error('must be a float'))
        } else {
          callback()
        }
      },
      isGreaterThan1 ( rule, value, callback ) {
        if( parseInt(value) < 1 ) {
          callback( new Error( 'must be greater than 0' ))
        } else {
          callback()
        }
      },
      isInteger ( rule, value, callback ) {
        const pattern = /^[0-9]*$/
        if( pattern.test(value) == false ) {
          callback( new Error('must be numbers') )
        } else {
          callback()
        }
      },
      isSameAsPassword1 ( rule, value, callback ) {
      if( value !== this.pwdEdit.password1 ) {
        callback( new Error('must match') )
      } else {
        callback()
      }
    }
    },
    created () {

    },
    mounted () {
      this.eAccount = this.selectedAccount
      this.eAccount.is_active = this.selectedAccount.is_active.toString()
      
    },
    watch: {
      selectedAccount ( n ) {
        this.eAccount = n
        this.eAccount.is_active = n.is_active.toString()
      }
    }
  }
</script>