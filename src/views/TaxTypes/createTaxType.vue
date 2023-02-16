<template>
    <div>{{ i18nCreate }}&nbsp{{ i18nTaxType }}</div>
    <el-form
      :model="cTaxType"
      label-width="120px"
      :rules="rules"
      ref="createTaxTypeRef"
    >
      <el-form-item :label="i18nTaxTitle" prop="tax_title">
        <el-input v-model="cTaxType.tax_title"/>
      </el-form-item>
      <el-form-item :label="i18nIsCurrent">
        <el-select v-model="cTaxType.is_current" placeholder="Select">
            <el-option :label="i18nTrue" value="1"/>
            <el-option :label="i18nFalse" value="0"/>
          </el-select>
      </el-form-item>
      <el-form-item :label="i18nTaxRate" prop="tax_rate">
        <el-input v-model="cTaxType.tax_rate"/>
      </el-form-item>
      <el-form-item :label="i18nDisplayOrder" prop="display_order">
        <el-input v-model="cTaxType.display_order"/>
      </el-form-item>
      <el-form-item>
        <el-button type="danger" @click="close">{{ i18nClose }}</el-button>
        <el-button type="success" @click="createTaxType('createTaxTypeRef')">{{i18nCreate}}&nbsp{{i18nTaxType}}</el-button>
      </el-form-item>
    </el-form>
</template>

<script lang="js">
  export default {
    name: 'CreateTaxType',
    emits: [ 'createTaxType:create', 'createTaxType:close' ],
    data () {
      return {
        cTaxType: {
          tax_title: '',
          tax_rate: '',
          is_current: '1',
          display_order: '0',
        },
        rules: {
          tax_title: [
            { required: true, message: 'Tax title is required', trigger: 'change'},
            { min: 3, max: 22, message: '3 to 22 characters', trigger: 'change' }
          ],
          tax_rate: [
            { required: true, message:'Tax rate is required', trigger: 'change'},
            { validator: this.isFloat, message: 'Tax rate must be a float', trigger: 'change' }
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
      i18nIsCurrent () { return this.$i18n.t('message.isCurrent') },
      i18nTaxRate () { return this.$i18n.t('message.taxRate') },
      i18nTaxTitle() { return this.$i18n.t('message.taxTitle') },
      i18nTaxType () { return this.$i18n.t('message.taxType') },
      i18nTrue () { return this.$i18n.t('message.true') }
    },
    methods: {
      createTaxType ( createTaxTypeRef ) {
        this.$refs[createTaxTypeRef].validate( valid => {
          if( valid ) {
            this.$emit('createTaxType:create', {...this.cTaxType} )
          } else {
            console.log('not valid')
          }
        })
      },
      close () {
        this.cTaxType = {
          tax_title: '',
          tax_rate: '',
          is_current: '1',
          display_order: '0',
        }
        this.$emit('createTaxType:close')
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