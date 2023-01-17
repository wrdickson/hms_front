<template>
  <div v-if="eTaxType">
    <div>{{ i18nEdit }}&nbsp{{ i18nTaxType }}</div>
    <el-form
      :model="eTaxType"
      label-width="120px"
      :rules="rules"
      ref="taxFormRef"
    >
      <el-form-item label="rVal" prop="rVal">
        <el-input v-model="eTaxType.rVal"/>
      </el-form-item>
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
      </el-form-item>
      <el-form-item>
        <el-button type="success" @click="updateTaxType('taxFormRef')">{{ i18nUpdateTaxType }}</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="js">
  //import Schema from 'async-validator';
  //Schema.warning = function(){};
  export default {
    name: 'EditTaxTypes',
    props: ['selectedTaxType'],
    emits: ['editTaxType-close', 'editTaxType-update'],
    data () {
      return {
        eTaxType: null,
        rules: {
          tax_title: [
            { min: 4, max: 24, message: '4 to 24', 'trigger': 'change' }
          ],
          tax_rate: [],
          display_order: [],
          // this.checkRVal (function) needs to be declared in component methods
          rVal: [
            { validator: this.checkRVal, trigger: 'change' },
            { validator: this.isSarbo, trigger: 'change' }
          ]
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
      updateTaxType (taxFormRef) {
        this.$refs[taxFormRef].validate( (valid) => {
          if(valid) {
            this.$emit('editTaxType-update', {...this.eTaxType})
          } else {
            console.log('not valid')
          }
        })
      },



      checkRVal ( rule, value, callback ) {
        console.log('rule: ', rule)
        console.log('executed')
        if (value === '') {
          callback(new Error('Must have length, muthafucka'))
        } else {
          callback()
        }
      },

      isSarbo ( rule, value, callback ) {
        console.log('isSarbo')
        if ( value != 'Sarbo' ) {
          callback( new Error('Must be sarbo, butch'))
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