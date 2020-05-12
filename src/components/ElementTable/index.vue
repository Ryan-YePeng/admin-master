<template>
  <el-table
      v-loading="isTableLoading"
      :data="data"
      :highlight-current-row="highlightCurrentRow"
      @row-click="handleCurrentChange"
  >
    <slot/>
  </el-table>
</template>

<script>
  export default {
    name: "ElementTable",
    props: {
      data: {
        type: Array,
        default: []
      },
      highlightCurrentRow: {
        type: Boolean,
        default: false
      },
    },
    data() {
      return {
        isTableLoading: false
      }
    },
    methods: {
      start() {
        this.isTableLoading = true
      },
      stop() {
        this.isTableLoading = false
      },
      handleCurrentChange(row) {
        return row
      }
    }
  }
</script>
