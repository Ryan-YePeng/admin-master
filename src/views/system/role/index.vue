<template>
  <el-row :gutter="20">
    <el-col :sm="24" :md="16" class="mb-15">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <el-button type="primary" icon="el-icon-plus" @click="add">新增</el-button>
        </div>
        <el-table
                v-loading="isTableLoading"
                :data="formData"
                ref="roleTable"
                @row-click="getTreeChecked"
                :highlight-current-row="true"
        >
          <el-table-column prop="nameZh" label="名称"></el-table-column>
          <el-table-column prop="dataScope" label="数据权限"></el-table-column>
          <el-table-column prop="roleName" label="角色权限"></el-table-column>
          <el-table-column prop="level" label="角色级别"></el-table-column>
          <el-table-column prop="remark" label="描述"></el-table-column>
          <el-table-column label="操作" fixed="right" align="center" width="150">
            <template slot-scope="scope">
              <el-button type="primary" icon="el-icon-edit" @click.stop="edit(scope.row)"></el-button>
              <delete-button
                      :ref="scope.row.roleId"
                      :id="scope.row.roleId"
                      @start="deleteRole"/>
            </template>
          </el-table-column>
        </el-table>
      </el-card>
    </el-col>
    <el-col :sm="24" :md="8">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span class="header">菜单分配</span>
          <submit-button
                  ref="SubmitButton"
                  icon="el-icon-check"
                  class="float-right"
                  @submit="update"
                  text="保存"/>
        </div>
        <div>
          <el-tree
                  ref="RoleMenuTree"
                  :data="tree"
                  show-checkbox
                  node-key="id"
                  accordion
                  :default-checked-keys="menuIds"
          >
          </el-tree>
        </div>
      </el-card>
    </el-col>
    <add-role ref="AddRole" :dept="dept" :level="level" @update="getRoleList"/>
    <edit-role ref="EditRole" :dept="dept" :level="level" @update="getRoleList"/>
  </el-row>
</template>

<script>
  import {getRoleListApi, deleteRoleApi, getRoleTreeApi, updateRolesMenusApi} from '@/api/role'
  import {getUserLevelApi} from '@/api/person'
  import {getDeptTreeApi} from '@/api/dept'
  import AddRole from './add'
  import EditRole from './edit'
  import {objectEvaluate} from "@/utils/common";

  export default {
    name: "Role",
    components: {AddRole, EditRole},
    data() {
      return {
        isTableLoading: false,
        formData: [],
        dept: [],
        tree: [],
        menuIds: [],
        roleId: null,
        level: null,
      }
    },
    mounted() {
      this.getRoleList();
      this.getDeptTree();
      window.setTimeout(() => {
        this.getRoleTree()
      }, 500);
      getUserLevelApi().then(result => {
        this.level = result.resultParam.level
      })
    },
    methods: {
      getDeptTree() {
        getDeptTreeApi('').then(result => {
          this.dept = result.resultParam.deptTree
        })
      },
      getRoleTree() {
        getRoleTreeApi().then(result => {
          this.tree = result.resultParam.roleTree
        })
      },
      getRoleList() {
        this.isTableLoading = true;
        getRoleListApi().then(result => {
          this.isTableLoading = false;
          this.formData = result.resultParam.roleList;
          this.clearChecked();
          this.$refs.SubmitButton.ban();
        })
      },
      // 清除选中
      clearChecked() {
        this.$refs.RoleMenuTree.setCheckedKeys([])
      },
      // 点击行
      getTreeChecked(row) {
        this.$refs.SubmitButton.cancelBan();
        this.clearChecked();
        this.menuIds = row.menus.map(item => item.menuId);
        this.roleId = row.roleId
      },
      update() {
        let roleId = this.roleId;
        let idList = this.$refs.RoleMenuTree.getCheckedNodes().map(item => item.id);
        let data = {};
        data.roleId = roleId;
        data.menuIds = idList;
        this.$refs.SubmitButton.start();
        updateRolesMenusApi(data).then(() => {
          this.$refs.SubmitButton.stop();
          this.getRoleList()
        }).catch(() => {
          this.$refs.SubmitButton.stop();
        })
      },
      add() {
        let _this = this.$refs.AddRole;
        _this.visible = true
      },
      edit(obj) {
        let _this = this.$refs.EditRole;
        objectEvaluate(_this.form, obj);
        _this.visible = true
      },
      deleteRole(id) {
        deleteRoleApi(id)
            .then(() => {
              this.getRoleList();
              this.$refs[id].close()
            })
            .catch(() => {
              this.$refs[id].stop();
            })
      }
    }
  }
</script>

<style scoped>

</style>
