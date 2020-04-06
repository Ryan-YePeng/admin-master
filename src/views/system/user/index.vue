<template>
  <el-row :gutter="20">
    <el-col :sm="24" :md="4" class="mb-15">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <el-input
                  clearable
                  size="small"
                  placeholder="输入部门名称"
                  prefix-icon="el-icon-search"
                  @keyup.enter.native="searchDept"
                  class="w-100"
                  v-model="name">
          </el-input>
        </div>
        <div>
          <el-tree
                  ref="deptTree"
                  :data="deptTree"
                  node-key="id"
                  :props="treeProps"
                  @node-click="searchByDepartment"
                  default-expand-all
                  :expand-on-click-node="false"
          >
          </el-tree>
        </div>
      </el-card>
    </el-col>
    <el-col :sm="24" :md="20" class="mb-15">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <el-button type="primary" icon="el-icon-plus" @click="add">新增</el-button>
        </div>
        <el-table v-loading="isTableLoading" :data="formData">
          <el-table-column prop="username" label="用户名"></el-table-column>
          <el-table-column prop="nickName" label="昵称"></el-table-column>
          <el-table-column prop="sex" label="性别"></el-table-column>
          <el-table-column prop="phone" label="电话"></el-table-column>
          <el-table-column prop="email" label="邮箱"></el-table-column>
          <el-table-column prop="jobId" label="部门/岗位"></el-table-column>
          <el-table-column label="状态">
            <template slot-scope="scope">
              <el-tag type="success" v-if="scope.row.enabled">激活</el-tag>
              <el-tag type="info" v-else>禁用</el-tag>
            </template>
          </el-table-column>
          <el-table-column label="创建时间">
            <template slot-scope="scope">
              <span>{{scope.row.createTime | formatDateTime}}</span>
            </template>
          </el-table-column>
          <el-table-column label="操作" fixed="right" align="center" width="150">
            <template slot-scope="scope">
              <el-button type="primary" icon="el-icon-edit" @click.stop="edit(scope.row)"></el-button>
              <!--              <delete-button-->
              <!--                      :ref="scope.row.roleId"-->
              <!--                      :id="scope.row.roleId"-->
              <!--                      @start="deleteRole"/>-->
            </template>
          </el-table-column>
          <pagination ref="Pagination" @getNewData="getUserList"></pagination>
        </el-table>
      </el-card>
    </el-col>
    <add-user ref="AddUser" :dept="dept" @update="getUserList" :roleList="roleList"></add-user>
  </el-row>
</template>

<script>
  import {getUserListApi} from '@/api/user'
  import {getDeptTreeApi} from '@/api/dept'
  import {getRoleListApi} from '@/api/role'
  import AddUser from './add'

  export default {
    name: "User",
    components: {AddUser},
    data() {
      return {
        formData: [],
        isTableLoading: false,
        dept: [],
        deptTree: [],
        name: '',
        roleList: [],
        treeProps: {
          label: 'name'
        }
      }
    },
    mounted() {
      this.getUserList();
      this.getDeptTree();
      this.getRoleList()
    },
    methods: {
      getRoleList() {
        getRoleListApi('').then(result => {
          this.roleList = result.resultParam.roleList;
        })
      },
      getDeptTree() {
        getDeptTreeApi('').then(result => {
          this.dept = result.resultParam.deptTree;
          this.deptTree = result.resultParam.deptTree
        })
      },
      searchDept() {
        getDeptTreeApi(this.name).then(result => {
          this.deptTree = result.resultParam.deptTree
        })
      },
      getUserList() {
        this.isTableLoading = true;
        let pagination = this.$refs.Pagination;
        let param = `current=${pagination.current}&size=${pagination.size}`;
        getUserListApi(param).then(result => {
          this.isTableLoading = false;
          let response = result.resultParam.userList;
          this.formData = response.records;
          pagination.total = response.total;
        })
      },
      searchByDepartment(obj) {
        console.log(obj)
      },
      add() {
        let _this = this.$refs.AddUser;
        _this.visible = true
      },
      edit() {
      },
    }
  }
</script>

<style scoped>

</style>
