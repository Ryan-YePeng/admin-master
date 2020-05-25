<template>
  <el-select
      v-if="has"
      v-model="val"
      placeholder="输入搜索"
      clearable
      filterable
      remote
      :remote-method="remoteMethod"
      :loading="searchLoading"
      @change="change">
    <el-option
        v-for="item in selectOptions"
        :key="item.id"
        :label="item.name"
        :value="item.id"
    >
    </el-option>
  </el-select>
</template>

<script>
  import {searchSiteApi} from '@/api/site'

  export default {
    name: "SearchSelect",
    props: {
      value: {
        type: String | Number
      }
    },
    data() {
      return {
        val: null,
        has: true,
        searchLoading: false,
        selectOptions: []
      }
    },
    watch: {
      value(val) {
        if (!val && this.val) { // 只有外边重置才执行
          this.selectOptions = [];
          this.has = false;
          this.$nextTick(() => {
            this.val = null;
            this.has = true
          })
        }
      }
    },
    methods: {
      change(val) {
        let selectItem = null;
        if (val) {
          this.selectOptions.some(item => {
            if (item.id === val) {
              selectItem = item;
              return true
            }
          })
        }
        this.$emit('input', val);
        this.$emit('get', selectItem);
      },
      remoteMethod(query) {
        if (query) {
          this.searchLoading = true;
          searchSiteApi(query)
            .then(result => {
              this.searchLoading = false;
              this.selectOptions = result.data.message
            })
            .catch(() => {
              this.searchLoading = false;
            })
        } else {
          this.selectOptions = [];
        }
      }
    }
  }
</script>
