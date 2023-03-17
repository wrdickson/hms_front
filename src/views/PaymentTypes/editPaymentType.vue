<template>
  <div v-if="ePaymentType">
    <div>{{ i18nEdit }}&nbsp{{ i18nPaymentType }}</div>
    <el-form
      :model="ePaymentType"
      label-width="120px"
      :rules="rules"
      ref="paymentTypeRef"
    >
      <el-form-item :label="i18nFoo" prop="payment_title">
        <el-input v-model="ePaymentType.payment_title"/>
      </el-form-item>
      <el-form-item :label="i18nIsActive">
        <el-select v-model="ePaymentType.is_active" placeholder="Select">
            <el-option :label="i18nTrue" value="1"/>
            <el-option :label="i18nFalse" value="0"/>
          </el-select>
      </el-form-item>
      <el-form-item :label="i18nDisplayOrder" prop="display_order">
        <el-input v-model="ePaymentType.display_order"/>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="close">{{ i18nClose }}</el-button>
        <el-button type="success" @click="updatePaymentType('paymentTypeRef')">{{ i18nUpdate }}</el-button>
      </el-form-item>
    </el-form>
    <hr/>
    <el-popconfirm
      title="Are you sure to delete this?"
      @confirm="deletePaymentType">
      <template #reference>
        <el-button type="danger">Delete</el-button>
      </template>
    </el-popconfirm>
  </div>
</template>

<script lang = "js">
  //import Schema from 'async-validator';
  //Schema.warning = function(){};
  export default {
    name: 'EditPaymentType',
    props: ['selectedPaymentType'],
    emits: ['editPaymentType-close', 'editPaymentType-update', 'editPaymentType-delete'],
    data () {
      return {
        ePaymentType: null,
        rules: {
          title: [
            { required: true, message: 'Title is required', trigger: 'change' },
            { min: 4, max: 24, message: '4 to 24', trigger: 'change' }
          ],
          display_order: [
          { required: true, message: 'Display order is required', trigger: 'change'},
          { validator: this.isInteger, message: 'Display order must be a number', trigger: 'change' },
          { validator: this.isGreaterThan1, message: 'Display order must be at least 1', trigger: 'change' }
          ]
        }
      }
    },
    computed: {
      i18nClose () { return this.$i18n.t('message.close') },
      i18nDisplayOrder () { return this.$i18n.t('message.displayOrder') },
      i18nEdit () { return this.$i18n.t('message.edit') },
      i18nFalse () { return this.$i18n.t('message.false') },
      i18nIsActive () { return this.$i18n.t('message.isActive') },
      i18nTaxRate () { return this.$i18n.t('message.taxRate') },
      i18nFoo() { return this.$i18n.t('message.stTitle') },
      i18nPaymentType () { return this.$i18n.t('message.paymentType') },
      i18nTrue () { return this.$i18n.t('message.true') },
      i18nUpdate() { return this.$i18n.t('message.update') }
    },
    methods: {
      close () {
        this.$emit('editPaymentType-close')
      },
      deletePaymentType () {
        console.log('del')
        this.$emit('editPaymentType-delete', {...this.ePaymentType})
      },
      updatePaymentType (paymentTypeRef) {
        this.$refs[paymentTypeRef].validate( (valid) => {
          if(valid) {
            this.$emit('editPaymentType-update', {...this.ePaymentType})
          } else {
            console.log('not valid')
          }
        })
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
    },
    created () {

    },
    mounted () {
      this.ePaymentType = this.selectedPaymentType
      this.ePaymentType.is_active = this.selectedPaymentType.is_active.toString()
      
    },
    watch: {
      selectedPaymentType ( n ) {
        this.ePaymentType = n
        this.ePaymentType.is_active = n.is_active.toString()
      }
    }
  }
</script>