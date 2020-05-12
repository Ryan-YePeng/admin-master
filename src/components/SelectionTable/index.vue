<template>
  <el-table
      v-loading="isTableLoading"
      :data="data"
      @selection-change="getSelected"
  >
    <el-table-column type="selection" width="55">
    </el-table-column>
    <slot/>
  </el-table>
</template>

<script>
  export default {
    name: "SelectionTable",
    props: {
      data: {
        type: Array,
        default: []
      },
      rowKey: {
        type: String,
        default: "id"
      }
    },
    data() {
      return {
        isTableLoading: false,
        keys: []
      }
    },
    methods: {
      start() {
        this.isTableLoading = true
      },
      stop() {
        this.isTableLoading = false
      },
      getSelected(array) {
        this.keys = array.map(item => item[this.rowKey])
      },
      getKeys() {
        return this.keys
      }
    }
  }
</script>
