<template>
  <div>{{ i18nCreate }}&nbsp{{ i18nPaymentType }}</div>
  <el-form
    :model="cPaymentType"
    label-width="120px"
    :rules="rules"
    ref="createPaymentTypeRef"
  >
    <el-form-item :label="i18nBlah" prop="payment_title">
      <el-input v-model="cPaymentType.payment_title"/>
    </el-form-item>
    <el-form-item :label="i18nIsActive">
      <el-select v-model="cPaymentType.is_active" placeholder="Select">
          <el-option :label="i18nTrue" value="1"/>
          <el-option :label="i18nFalse" value="0"/>
        </el-select>
    </el-form-item>
    <el-form-item :label="i18nDisplayOrder" prop="display_order">
      <el-input v-model="cPaymentType.display_order"/>
    </el-form-item>
    <el-form-item>
      <el-button type="danger" @click="close">{{ i18nClose }}</el-button>
      <el-button type="success" @click="createPaymentType('createPaymentTypeRef')">{{i18nCreate}}&nbsp{{i18nPaymentType}}</el-button>
    </el-form-item>
  </el-form>
</template>

<script lang="js">
export default {
  name: 'CreatePaymentType',
  emits: [ 'createPaymentType:create', 'createPaymentType:close' ],
  data () {
    return {
      cPaymentType: {
        payment_title: '',
        is_active: '1',
        display_order: '0',
      },
      rules: {
        payment_title: [
          { required: true, message: 'Title is required', trigger: 'change'},
          { min: 4, max: 24, message: '4 to 24 characters', trigger: 'change' }
        ],
        display_order: [
          { required: true, message: 'Display order title is required', trigger: 'change'},
          { validator: this.isInteger, message: 'Display order must be a number', trigger: 'change' },
          { validator: this.isGreaterThan1, message: 'Display order must be at least 1', trigger: 'change' }
        ]
      }
    }
  },
  computed: {
    i18nClose () { return this.$i18n.t('message.close') },
    i18nCreate () { return this.$i18n.t('message.create') },
    i18nDisplayOrder () { return this.$i18n.t('message.displayOrder') },
    i18nFalse () { return this.$i18n.t('message.false') },
    i18nIsActive () { return this.$i18n.t('message.isActive') },
    i18nTaxRate () { return this.$i18n.t('message.taxRate') },
    i18nBlah() { return this.$i18n.t('message.stTitle') },
    i18nPaymentType () { return this.$i18n.t('message.paymentType') },
    i18nTrue () { return this.$i18n.t('message.true') }
  },
  methods: {
    createPaymentType ( createPaymentTypeRef ) {
      this.$refs[createPaymentTypeRef].validate( valid => {
        if( valid ) {
          this.$emit('createPaymentType:create', {...this.cPaymentType} )
        } else {
          console.log('not valid')
        }
      })
    },
    close () {
      this.cPaymentType = {
        title: '',
        is_active: '1',
        display_order: '0',
      }
      this.$emit('createPaymentType:close')
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
    }
  }
}
</script>