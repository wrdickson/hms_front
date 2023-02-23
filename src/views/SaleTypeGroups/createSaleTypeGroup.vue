<template>
  <div>{{ i18nCreate }}&nbsp{{ i18nSaleTypeGroup }}</div>
  <el-form
    :model="cSaleTypeGroup"
    label-width="120px"
    :rules="rules"
    ref="createSaleTypeGroupRef"
  >
    <el-form-item :label="i18nBlah" prop="title">
      <el-input v-model="cSaleTypeGroup.title"/>
    </el-form-item>
    <el-form-item :label="i18nIsActive">
      <el-select v-model="cSaleTypeGroup.is_active" placeholder="Select">
          <el-option :label="i18nTrue" value="1"/>
          <el-option :label="i18nFalse" value="0"/>
        </el-select>
    </el-form-item>
    <el-form-item :label="i18nDisplayOrder" prop="display_order">
      <el-input v-model="cSaleTypeGroup.display_order"/>
    </el-form-item>
    <el-form-item>
      <el-button type="danger" @click="close">{{ i18nClose }}</el-button>
      <el-button type="success" @click="createSaleTypeGroup('createSaleTypeGroupRef')">{{i18nCreate}}&nbsp{{i18nSaleTypeGroup}}</el-button>
    </el-form-item>
  </el-form>
</template>

<script lang="js">
export default {
  name: 'CreateSaleTypeGroup',
  emits: [ 'createSaleTypeGroup:create', 'createSaleTypeGroup:close' ],
  data () {
    return {
      cSaleTypeGroup: {
        title: '',
        is_active: '1',
        display_order: '0',
      },
      rules: {
        title: [
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
    i18nSaleTypeGroup () { return this.$i18n.t('message.saleTypeGroup') },
    i18nTrue () { return this.$i18n.t('message.true') }
  },
  methods: {
    createSaleTypeGroup ( createSaleTypeGroupRef ) {
      this.$refs[createSaleTypeGroupRef].validate( valid => {
        if( valid ) {
          this.$emit('createSaleTypeGroup:create', {...this.cSaleTypeGroup} )
        } else {
          console.log('not valid')
        }
      })
    },
    close () {
      this.cSaleTypeGroup = {
        title: '',
        is_active: '1',
        display_order: '0',
      }
      this.$emit('createSaleTypeGroup:close')
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