<template>
  <el-container style="height: 600px;">
    <el-aside width="200px">
      <el-menu class="el-menu-dashboard">
        <el-menu-item @click="hideAllViews(), showSpaceEdit=true" index="1-1">Space Edit</el-menu-item>
        <el-menu-item @click="hideAllViews(), showTaxTypes=true" index="1-2">Tax Types</el-menu-item>
        <el-menu-item @click="hideAllViews(), showSaleTypeGroups=true" index="1-3">SaleTypeGroups</el-menu-item>
        <el-menu-item @click="hideAllViews(), showSpaceTypes=true" index="1-4">Space Types</el-menu-item>
        <el-menu-item index="1-3">item three</el-menu-item>
      </el-menu>
    </el-aside>
    <el-main>
      <SpaceEdit
        v-if="showSpaceEdit"
      >
      </SpaceEdit>
      <TaxTypes v-if="showTaxTypes"></TaxTypes>
      <SaleTypeGroups
        v-if="showSaleTypeGroups"
      >
      </SaleTypeGroups>
      <SpaceTypes
        v-if="showSpaceTypes"
      />
    </el-main>
  </el-container>
</template>

<script>
import SpaceEdit from '/src/views/SpaceEdit/SpaceEdit.vue'
import TaxTypes from '/src/views/TaxTypes/TaxTypes.vue'
import SaleTypeGroups from '/src/views/SaleTypeGroups/SaleTypeGroups.vue'
import SpaceTypes from '/src/views/SpaceTypes/SpaceTypes.vue'
export default {
  name: 'Dashboard',
  components: {
    SpaceEdit,
    TaxTypes,
    SaleTypeGroups,
    SpaceTypes
  },
  data () {
    return {
      showSpaceEdit: false,
      showTaxTypes: false,
      showSaleTypeGroups: false,
      showSpaceTypes: false
    }
  },
  methods: {
    hideAllViews () {
      this.showSpaceEdit = false
      this.showTaxTypes = false
      this.showSaleTypeGroups = false
      this.showSpaceTypes = false
    }
  }
}
</script>

<style>

</style>