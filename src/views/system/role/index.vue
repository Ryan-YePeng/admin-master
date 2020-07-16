<template>
  <el-row :gutter="20">
    <el-col :sm="24" :md="19" class="mb-15">
      <card ref="Card">
        <div slot="header">
          <el-input placeholder="输入角色名称搜索" v-model="searchRoleName" clearable class="w-200" @keyup.enter.native="getData"/>
          <el-button type="success" class="el-icon-search ml-5" @click="getData">搜索</el-button>
          <el-button type="primary" icon="el-icon-plus" @click="add" class="float-right">新增</el-button>
        </div>
        <el-table
            :data="formData"
            @row-click="getTreeChecked"
            :highlight-current-row="true">
          <el-table-column prop="name" label="名称"/>
          <el-table-column prop="dataScope" label="数据权限"/>
          <el-table-column prop="level" label="角色级别"/>
          <el-table-column prop="remark" label="描述" :show-overflow-tooltip="true"/>
          <el-table-column label="创建时间" :show-overflow-tooltip="true">
            <template slot-scope="scope">
              <span>{{scope.row.createTime | formatDateTime}}</span>
            </template>
          </el-table-column>
          <el-table-column label="操作" align="center" width="150">
            <template slot-scope="scope">
              <el-button type="primary" icon="el-icon-edit" @click.stop="edit(scope.row)"></el-button>
              <delete-button :ref="scope.row.id" :id="scope.row.id" @start="delData"/>
            </template>
          </el-table-column>
        </el-table>
      </card>
    </el-col>
    <el-col :sm="24" :md="5">
      <card ref="TreeCard">
        <div slot="header">
          <span>菜单分配</span>
          <submit-button
              ref="Submit"
              icon="el-icon-check"
              class="float-right"
              @submit="update"
              text="保存"/>
        </div>
        <checkbox-tree ref="RoleMenuTree" :ids="menuIds" :tree="tree"/>
      </card>
    </el-col>
    <add ref="Add" :dept="dept" :level="level+1" @update="getData"/>
    <edit ref="Edit" :dept="dept" :level="level+1" @update="getData"/>
  </el-row>
</template>

<script>
  import {getRoleListApi, deleteRoleApi, getRoleTreeApi} from '@/api/system/role';
  import {editRolesMenusApi} from '@/api/system/menu';
  import {getUserLevelApi} from '@/api/system/user';
  import {getDeptTreeApi} from '@/api/system/dept';
  import {objectEvaluate} from "@/utils/common";
  import CheckboxTree from '@/components/CheckboxTree';
  import Add from './add';
  import Edit from './edit';

  export default {
    name: "Role",
    components: {Add, Edit, CheckboxTree},
    data() {
      return {
        formData: [],
        dept: [],
        tree: [],
        menuIds: [],
        id: null,
        level: null,
        searchRoleName: ''
      }
    },
    mounted() {
      this.getRoleListAndRoleTree();
      this.getDept();
      this.getLevel();
    },
    methods: {
      // 获取部门
      getDept() {
        getDeptTreeApi({deptName: ''}).then(result => {
          this.dept = result.resultParam.deptTree
        })
      },
      // 获取级别
      getLevel() {
        getUserLevelApi().then(result => {
          this.level = result.resultParam.level
        })
      },
      // 获取角色列表和权限树
      getRoleListAndRoleTree() {
        this.$refs.Submit.ban();
        this.$refs.Card.start();
        this.$refs.TreeCard.start();
        getRoleListApi({roleName: ''})
          .then(result => {
            this.$refs.Card.stop();
            this.formData = result.resultParam.roleList;
            return getRoleTreeApi()
          })
          .then(result => {
            this.$refs.TreeCard.stop();
            this.tree = result.resultParam.roleTree;
            this.filterTree();
          })
      },
      // 获取角色列表
      getData() {
        this.$refs.Card.start();
        getRoleListApi({roleName: this.searchRoleName}).then(result => {
          this.$refs.Card.stop();
          this.formData = result.resultParam.roleList;
          this.$refs.RoleMenuTree.clear();
          this.$refs.Submit.ban();
        })
      },
      // 点击行
      getTreeChecked(row) {
        this.$refs.Submit.cancelBan();
        this.$refs.RoleMenuTree.clear();
        this.menuIds = row.menus.map(item => item.id);
        this.id = row.id
      },
      // 更新权限
      update() {
        let data = {};
        data.roleId = this.id;
        data.menuIds = this.$refs.RoleMenuTree.get();
        this.$refs.Submit.start();
        editRolesMenusApi(data).then(() => {
          this.$refs.Submit.stop();
          this.getData()
        }).catch(() => {
          this.$refs.Submit.stop();
        })
      },
      // 新增
      add() {
        this.$refs.Add.visible = true
      },
      // 编辑
      edit(obj) {
        let _this = this.$refs.Edit;
        objectEvaluate(_this.form, obj);
        _this.form.deptIds = [];
        obj.depts.forEach(item => {
          if (item) _this.form.deptIds.push(item.id)
        })
        _this.visible = true
      },
      // 删除
      delData(id) {
        deleteRoleApi({roleId: id})
          .then(() => {
            this.getData();
            this.$refs[id].close()
          })
          .catch(() => {
            this.$refs[id].stop();
          })
      },
      // 判断是否为超管
      filterTree() {
        let myRoles = this.$storeGet.user.roles.map(item => item.id)
        let isAdmin = myRoles.some(id => {
          return this.formData.some(item => {
            return item.id === id && item.permission === "admin"
          })
        })
        if (isAdmin) return
        this.getHadRoles(myRoles)
      },
      // 获得已有权限
      getHadRoles(myRoles) {
        let roleIds = [];
        myRoles.forEach(id => {
          this.formData.some(item => {
            if (item.id === id) {
              let list = item.menus.map(item => item.id);
              roleIds = [...roleIds, ...list]
              return true
            }
          })
        })
        this.filterAsyncTree(this.tree, roleIds)
      },
      // 遍历和禁用
      filterAsyncTree(nodes, roleIds) {
        return nodes.filter(node => {
          node.disabled = !roleIds.includes(node.id);
          if (node.children && node.children.length) {
            node.children = this.filterAsyncTree(node.children, roleIds)
          }
          return true
        })
      }
    }
  }
</script>
