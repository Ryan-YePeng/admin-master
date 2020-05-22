<template>
  <el-select
      v-model="val"
      placeholder="输入搜索"
      clearable
      filterable
      remote
      reserve-keyword
      :remote-method="remoteMethod"
      :loading="searchLoading"
      @change="change">
    <el-option
        v-for="item in selectOptions"
        :key="item.id"
        :label="item.c_branchesName"
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
        type: String
      }
    },
    data() {
      return {
        searchLoading: false,
        val: null,
        selectOptions: []
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
        this.$parent.$emit('el.form.change');
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
