<template>
  <el-table 
    :data="saleTypesMod" 
    stripe
    highlight-current-row
    height="170"
    size="small"
    style="width: 100%"
    cell-class-name="t-table-cell"
    table-layout="auto"
    @row-click="rowSelected"
    >
    <el-table-column prop="id" label="Id"></el-table-column>
    <el-table-column prop="title" label="Title"></el-table-column>
    <el-table-column prop="tax_types" label="Tax Types"></el-table-column>
    <el-table-column prop="stgLabel" label="Sale Type Group"></el-table-column>
    <el-table-column prop="is_fixed_price" label="Is Fixed Price"></el-table-column>
    <el-table-column prop="fixed_price" label="Fixed Price"></el-table-column>
    <el-table-column prop="is_active" label="Is Active"></el-table-column>
    <el-table-column prop="display_order" label="Display Order"></el-table-column>

  </el-table>
</template>

<script lang = "js">
  import _ from 'lodash'
  import { saleTypeGroupsStore } from '/src/stores/saleTypeGroups.js'
  export default {
    name: "SaleTypesTable",
    props: [
      'saleTypes'
    ],
    emits: [
    'saleTypesTable:saleTypeSelected'
    ],
    data () {
      return {
      }
    },
    computed: {
      saleTypesMod () {
        let saleTypesModx = []
        _.each(this.saleTypes, (saleType) => {
          let iGroup = _.find(this.saleTypeGroups, o => {
            return o.id == saleType.sale_type_group
          })
          saleType.stgLabel = iGroup.title
          saleTypesModx.push(saleType)
        })
        return saleTypesModx
      },
      saleTypeGroups () {
        return  saleTypeGroupsStore().saleTypeGroups
      }
    },
    methods: {
      rowSelected ( obj ) {
        //  strip the reactivity from selected object
        let cObj = {...obj}
        cObj.tax_types = [...obj.tax_types]
        //console.log(cObj)
        //console.table(cObj)
        this.$emit( 'saleTypesTable:saleTypeSelected', cObj )


      }
    }
  }
</script>