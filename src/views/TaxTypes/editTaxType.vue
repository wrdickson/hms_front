<template>
  <div v-if="eTaxType">
    <div>{{ i18nEdit }}&nbsp{{ i18nTaxType }}</div>
    <el-form
      :model="eTaxType"
      label-width="120px"
      :rules="rules"
      ref="taxFormRef"
    >
      <el-form-item :label="i18nTaxTitle" prop="tax_title">
        <el-input v-model="eTaxType.tax_title"/>
      </el-form-item>
      <el-form-item :label="i18nIsCurrent">
        <el-select v-model="eTaxType.is_current" placeholder="Select">
            <el-option :label="i18nTrue" value="1"/>
            <el-option :label="i18nFalse" value="0"/>
          </el-select>
      </el-form-item>
      <el-form-item :label="i18nTaxRate" prop="tax_rate">
        <el-input v-model="eTaxType.tax_rate"/>
      </el-form-item>
      <el-form-item :label="i18nDisplayOrder" prop="display_order">
        <el-input v-model="eTaxType.display_order"/>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="close">{{ i18nClose }}</el-button>
        <el-button type="success" @click="updateTaxType('taxFormRef')">{{ i18nUpdateTaxType }}</el-button>
      </el-form-item>
    </el-form>
    <hr/>
    <el-popconfirm
      title="Are you sure to delete this?"
      @confirm="deleteTaxType"
    >
      <template #reference>
        <el-button type="danger">Delete</el-button>
      </template>
    </el-popconfirm>
  </div>
</template>

<script lang="js">
  //import Schema from 'async-validator';
  //Schema.warning = function(){};
  export default {
    name: 'EditTaxTypes',
    props: ['selectedTaxType'],
    emits: ['editTaxType-close', 'editTaxType-update', 'editTaxType:delete'],
    data () {
      return {
        eTaxType: null,
        rules: {
          tax_title: [
            { required: true, message: 'Tax title is required', trigger: 'change' },
            { min: 4, max: 24, message: '4 to 24', trigger: 'change' }
          ],
          tax_rate: [
            { required: true, message: 'Tax rate is required'},
            { validator: this.isFloat, trigger: 'change' }
          ],
          display_order: [
          { required: true, message: 'Display order title is required', trigger: 'change'},
          { validator: this.isInteger, message: 'Display order must be a number', trigger: 'change' },
          { validator: this.isGreaterThan1, message: 'Display order must be at least 1', trigger: 'change' }
          ],
        }
      }
    },
    computed: {
      i18nClose () { return this.$i18n.t('message.close') },
      i18nDisplayOrder () { return this.$i18n.t('message.displayOrder') },
      i18nEdit () { return this.$i18n.t('message.edit') },
      i18nFalse () { return this.$i18n.t('message.false') },
      i18nIsCurrent () { return this.$i18n.t('message.isCurrent') },
      i18nTaxRate () { return this.$i18n.t('message.taxRate') },
      i18nTaxTitle() { return this.$i18n.t('message.taxTitle') },
      i18nTaxType () { return this.$i18n.t('message.taxType') },
      i18nTrue () { return this.$i18n.t('message.true') },
      i18nUpdateTaxType () { return this.$i18n.t('message.updateTaxType') }
    },
    methods: {
      close () {
        this.$emit('editTaxType-close')
      },
      deleteTaxType () {
        console.log('del')
        this.$emit('editTaxType:delete', {...this.eTaxType})
      },
      updateTaxType (taxFormRef) {
        this.$refs[taxFormRef].validate( (valid) => {
          if(valid) {
            this.$emit('editTaxType-update', {...this.eTaxType})
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
      this.eTaxType = this.selectedTaxType
      this.eTaxType.is_current = this.selectedTaxType.is_current.toString()
      
    },
    watch: {
      selectedTaxType ( n ) {
        this.eTaxType = n
        this.eTaxType.is_current = n.is_current.toString()
      }
    }
  }
</script>