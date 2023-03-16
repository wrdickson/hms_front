<template>
  <div>{{createLabel}}</div>
  <el-config-provider :locale="locale">
    <el-form
        :model="eSaleType"
        label-width="180px"
        :rules="rules"
        ref="saleTypeRef"
        size="small"
      >
        <el-form-item :label="i18nFoob" prop="title">
          <el-input v-model="eSaleType.title"/>
        </el-form-item>
        <el-form-item :label="taxTypeLabel" prop="tax_types">
          <el-select
            v-model="eSaleType.tax_types"
            multiple
            default-first-option
            :reserve-keyword="false"
            :placeholder="taxTypePlaceholder"
          >
            <el-option
              v-for="item in taxTypeOptions"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item :label="saleTypeGroupLabel" prop="sale_type_group">
          <el-select v-model="eSaleType.sale_type_group">
            <template v-for="stg in saleTypeGroups">
              <el-option :value="stg.id" :label="stg.title"/>
            </template>
          </el-select>
        </el-form-item>
        <el-form-item :label="isActiveLabel">
          <el-select v-model="eSaleType.is_active" :placeholder="placeholder">
              <el-option :label="i18nTrue" value="1"/>
              <el-option :label="i18nFalse" value="0"/>
            </el-select>
        </el-form-item>
        <el-form-item :label="isFixedPriceLabel" prop="is_fixed_price">
          <el-select v-model="eSaleType.is_fixed_price" :placeholder="placeholder">
              <el-option :label="i18nTrue" value="1"/>
              <el-option :label="i18nFalse" value="0"/>
            </el-select>
        </el-form-item>
        <el-form-item v-if="eSaleType.is_fixed_price == '1'" :label="fixedPriceLabel" prop="fixed_price">
          <el-input v-model="eSaleType.fixed_price"/>
        </el-form-item>
        <el-form-item :label="i18nDisplayOrder" prop="display_order">
          <el-input v-model="eSaleType.display_order"/>
        </el-form-item>
        <el-form-item>
          <el-button type="success" @click="createSaleType('saleTypeRef')">{{createL}}</el-button>
          <el-button type="danger" @click="close">{{closeLabel}}</el-button>
        </el-form-item>
      </el-form>
    </el-config-provider>
</template>

<script lang = "js">
  import { localeStore } from '/src/stores/locale.js'
  import { taxTypesStore } from '/src/stores/taxTypes.js'
  import { saleTypeGroupsStore } from '/src/stores/saleTypeGroups'
  import _ from 'lodash'
  export default {
    name: 'CreateSaleType',
    emits:  [ 'createSaleType:close', 'createSaleType:create' ],
    data () {
      return {
        eSaleType: {
          title: '',
          is_active: '1',
          is_fixed_price: '1',
          tax_types: []
        },
        rules: {
          fixed_price: [
            { required: true, message: 'Price is required', trigger: 'change' },
            { validator: this.isFloat, message: 'Must be a float', trigger: 'change' },
            { validator: this.isTwoDecimal, message: 'Must have two decimal', trigger: 'change' }
          ],
          title: [
            { required: true, message: 'Title is required', trigger: 'change' },
            { min: 4, max: 24, message: '4 to 24', trigger: 'change' }
          ],
          display_order: [
            { required: true, message: 'Display order is required', trigger: 'change'},
            { validator: this.isInteger, message: 'Display order must be a number', trigger: 'change' },
            { validator: this.isGreaterThan1, message: 'Display order must be at least 1', trigger: 'change' }
          ],
          sale_type_group: [
            { required: true, message: 'Group is required', trigger: 'change' },
            { validator: this.isNotEmptyArray, message: 'Must choose group', trigger: 'change'}
          ],
          tax_types: [
            { required: true, message: 'Tax type is required', trigger: 'change' },
            { validator: this.isNotEmptyArray, message: 'Must choose tax type', trigger: 'change'}
          ]
        }
      }
    },
    computed: {
      locale () {
        return localeStore().selectedLocale
      },
      saleTypeGroups () {
        return saleTypeGroupsStore().saleTypeGroups
      },
      taxTypes () {
        let allTaxTypes = taxTypesStore().taxTypes
        let currentTaxTypes = _.filter( allTaxTypes, (o)=>{
          return o.is_current == 1
        })
        return currentTaxTypes
      },
      taxTypeOptions () {
        let ttOptions = []
        _.each( this.taxTypes, iTaxType => {
          let obj = {
            value: iTaxType.id,
            label: iTaxType.tax_title
          }
          ttOptions.push(obj)
        })
        return ttOptions
      },

      fixedPriceLabel() { return this.$i18n.t('message.fixedPrice') },
      i18nFoob() { return this.$i18n.t('message.stTitle') },
      i18nDisplayOrder () { return this.$i18n.t('message.displayOrder') },
      isActiveLabel() { return this.$i18n.t('message.isActive') },
      isFixedPriceLabel() { return this.$i18n.t('message.isFixedPrice') },
      i18nFalse () { return this.$i18n.t('message.false') },
      i18nTrue () { return this.$i18n.t('message.true') },
      taxTypeLabel () { return this.$i18n.t('message.taxType') },
      saleTypeGroupLabel() { return this.$i18n.t('message.saleTypeGroup') },
      updateLabel() { return this.$i18n.t('message.update') },
      closeLabel() { return this.$i18n.t('message.close') },
      confirmDeleteLabel () { return this.$i18n.t('message.confirmDelete') },
      deleteLabel () { return this.$i18n.t('message.delete') },
      createL () { return this.$i18n.t('message.create') },
      createLabel () { return this.$i18n.t('message.create') + ' ' + this.$i18n.t('message.saleType') },
      placeholder () { return this.$t('message.select') },
      taxTypePlaceholder () { return this.$t('message.select') + ' ' + this.$t('message.taxType')}
    },
    methods: {
      close () {
        this.$emit('createSaleType:close')
      },
      createSaleType ( saleTypeRef) {
        this.$refs[saleTypeRef].validate( (valid) => {
          if(valid) {
            let estClean = {...this.eSaleType}
            estClean.tax_types = [...this.eSaleType.tax_types]
            estClean.fixed_price = parseFloat(estClean.fixed_price).toFixed(2)
            this.$emit('createSaleType:create', estClean)
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
      },
      isNotEmptyArray ( rule, value, callback ) {
        if( value.length < 1 ){
          callback( new Error('must ') )
        } else {
          callback()
        }
      },
      isTwoDecimal ( rule, value, callback ) {
        if( !value) {
          callback(new Error('must be two decimals'))
        } else {
          let split = value.toString().split('.')
          if(!split[1] || split[1].length !== 2){
            callback(new Error('must be two decimals'))
          }else {
            callback()
          }
        }
      }
    }
  }
</script>