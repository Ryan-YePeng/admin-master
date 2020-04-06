<template>
  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <el-input placeholder="全表模糊搜索" v-model="searchText" clearable class="w-200"
                @keyup.enter.native="getOnlineUser"/>
      <el-button type="success" class="el-icon-search ml-5" @click="getOnlineUser">搜索</el-button>
    </div>
    <el-table v-loading="isTableLoading"
              :data="formData">
      <el-table-column prop="username" label="用户名"></el-table-column>
      <el-table-column prop="nickName" label="用户昵称"></el-table-column>
      <el-table-column prop="job" label="岗位"></el-table-column>
      <el-table-column prop="ip" label="登陆IP"></el-table-column>
      <el-table-column prop="address" label="登陆地点"></el-table-column>
      <el-table-column prop="browser" label="浏览器"></el-table-column>
      <el-table-column prop="loginTime" label="登陆时间">
        <template slot-scope="scope">
          <span>{{scope.row.loginTime | formatDateTime}}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" fixed="right" align="center" width="70">
        <template slot-scope="scope">
          <delete-button
                  :ref="scope.row.key"
                  :id="scope.row.key"
                  :msg="'确定强制退出该用户吗？'"
                  type="text"
                  text="强退"
                  @start="deleteOnlineUserApi"/>
        </template>
      </el-table-column>
    </el-table>
    <pagination ref="Pagination" @getNewData="getOnlineUser"></pagination>
  </el-card>
</template>

<script>
  import {getOnlineUserApi, deleteOnlineUserApi} from "@/api/user";

  export default {
    name: "OnlineUser",
    data() {
      return {
        isTableLoading: false,
        formData: [],
        searchText: ''
      }
    },
    mounted() {
      this.getOnlineUser()
    },
    methods: {
      getOnlineUser() {
        this.isTableLoading = true;
        let pagination = this.$refs.Pagination;
        let param = `current=${pagination.current}&size=${pagination.size}&filter=${this.searchText}`;
        getOnlineUserApi(param).then(result => {
          this.isTableLoading = false;
          let response = result.resultParam.userListPageUtil;
          this.formData = response.list;
          pagination.total = response.total;
        })
      },
      deleteOnlineUserApi(key) {
        deleteOnlineUserApi(key)
            .then(() => {
              this.getOnlineUser();
              this.$refs[key].close()
            })
            .catch(() => {
              this.$refs[key].stop();
            })
      }
    }
  }
</script>

<style scoped>

</style>
