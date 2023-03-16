<template>
  <div>{{ i18nCreate }}&nbsp{{ i18nAccount }}</div>
  <el-form
    :model="cAccount"
    label-width="140px"
    :rules="rules"
    ref="createAccountRef"
  >
    <el-form-item :label="i18nName" prop="username">
      <el-input v-model="cAccount.username"/>
    </el-form-item>
    <el-form-item :label="iEmail" prop="email">
      <el-input v-model="cAccount.email"/>
    </el-form-item>
    <el-form-item :label="iPermission">
      <el-select v-model="cAccount.permission">
        <template v-for="perm in pArr">
          <el-option :label="perm" :value="perm"></el-option>
        </template>
      </el-select>
   </el-form-item>
    <el-form-item :label="i18nIsActive">
      <el-select v-model="cAccount.is_active" placeholder="Select">
          <el-option :label="i18nTrue" value="1"/>
          <el-option :label="i18nFalse" value="0"/>
        </el-select>
    </el-form-item>
    <el-form-item :label="iPassword" prop="password1">
      <el-input type="password" show-password v-model="cAccount.password1"/>
    </el-form-item>
    <el-form-item :label="iPassword" prop="password2">
      <el-input type="password" show-password v-model="cAccount.password2"/>
    </el-form-item>
    <el-form-item>
      <el-button type="danger" @click="close">{{ i18nClose }}</el-button>
      <el-button type="success" @click="createAccount('createAccountRef')">{{i18nCreate}}&nbsp{{i18nAccount}}</el-button>
    </el-form-item>
  </el-form>
</template>

<script lang="js">
export default {
  name: 'CreateAccount',
  emits: [ 'createAccount:create', 'createAccount:close' ],
  data () {
    return {
      pArr: [1,2,3,4,5,6,7,8,9,10],
      cAccount: {
        username: '',
        email: '',
        permission: '1',
        is_active: '1',
        password1: '',
        password2: ''
      },
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
      }
    }
  },
  computed: {
    i18nClose () { return this.$i18n.t('message.close') },
    i18nCreate () { return this.$i18n.t('message.create') },
    i18nName () { return this.$i18n.t('message.name') },
    i18nFalse () { return this.$i18n.t('message.false') },
    i18nIsActive () { return this.$i18n.t('message.isActive') },
    iPermission () { return this.$i18n.t('message.permission') },
    iEmail() { return this.$i18n.t('message.email') },
    i18nAccount () { return this.$i18n.t('message.account') },
    i18nTrue () { return this.$i18n.t('message.true') },
    iPassword () { return this.$i18n.t('message.password') }
  },
  methods: {
    createAccount ( createAccountRef ) {
      this.$refs[createAccountRef].validate( valid => {
        if( valid ) {
          this.$emit('createAccount:create', {...this.cAccount} )
        } else {
          console.log('not valid')
        }
      })
    },
    close () {
      this.cAccount = {
        title: '',
        is_active: '1',
        display_order: '0',
      }
      this.$emit('createAccount:close')
    },
    isAlphanumDashStarUnderscore ( rule, value, callback ) {
      const pattern = /^[A-Za-z0-9_*-]+$/
      if( pattern.test(value) == false ) {
        callback( new Error('must be alpha numeric, dash, star, underscore') )
      } else {
        callback()
      }
    },
    isEmail ( rule, value, callback ) {
      const pattern = /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/
      if( pattern.test(value) == false ) {
        callback( new Error('Invalid email') )
      } else {
        callback()
      }
    },
    isFloat ( rule, value, callback ) {
      console.log('pf', Number(value) )
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
      if( value !== this.cAccount.password1 ) {
        callback( new Error('must match') )
      } else {
        callback()
      }
    }
  }
}
</script>