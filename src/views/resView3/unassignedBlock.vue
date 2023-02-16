<template>
    <div class="unassignedBlock">
    <el-dropdown trigger="click">
      <el-button type="danger">
        {{resQuantity}}&nbsp<font-awesome-icon icon="fa-solid fa-arrow-down" />
      </el-button>

    
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item
            v-for="reservation in unassignedResArr"
          >
            <div
              @click="unassignedResSelect(reservation.id)"
            >
              {{reservation.customer_last}}
            </div>
          </el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>

<script>
export default {
  props: [ 'unassignedResArr' ],
  name: 'unassignedBlock',
  emits: [ 'unassigned-block-click' ],
  computed: {
    resQuantity () {
      return this.unassignedResArr.length.toString()
    }
  },
  data () {
    return {
      selectedUnassignedRes: null
    }
  },
  methods: {
    unassignedResSelect (id) {
      console.log('unassignedBlockClick @emptyBlock', id)
      //this.$emit('empty-block-click')
    }
  }
}
</script>

<style>
  .unassignedBlock {
    color: rgb(194, 194, 194);
    width: 100%;
    padding-right: 4px;
    padding-left: 4px;
    margin-right: 0px;
    margin-left: 0px;
    border-radius: 0px;
  }
</style>