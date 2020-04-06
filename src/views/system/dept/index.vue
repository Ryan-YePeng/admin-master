<template>
  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <el-input placeholder="输入部门名称搜索" v-model="searchName" clearable class="w-200"
                @keyup.enter.native="searchDept"/>
      <el-button type="success" class="el-icon-search ml-5" @click="searchDept">搜索</el-button>
      <el-button class="float-right" type="primary" icon="el-icon-plus" @click="add">新增</el-button>
    </div>
    <el-table v-loading="isTableLoading"
              :data="formData"
              row-key="id"
              :default-expand-all="true"
              :tree-props="{children: 'children'}">
      <el-table-column prop="name" label="部门名称"></el-table-column>
      <el-table-column label="状态">
        <template slot-scope="scope">
          <el-tag type="success" v-if="scope.row.enabled">启用</el-tag>
          <el-tag type="info" v-else>停用</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作" fixed="right" align="center" width="150">
        <template slot-scope="scope">
          <el-button type="primary" icon="el-icon-edit" @click.stop="edit(scope.row)"></el-button>
          <delete-button
                  :ref="scope.row.id"
                  :id="scope.row.id"
                  @start="deleteDept"/>
        </template>
      </el-table-column>
    </el-table>
    <add-dept ref="AddDept" :dept="dept" @update="getDeptTree"/>
    <edit-dept ref="EditDept" :dept="dept" @update="getDeptTree"/>
  </el-card>
</template>

<script>
  import {getDeptTreeApi, deleteDeptApi} from '@/api/dept'
  import AddDept from './add'
  import {objectEvaluate} from "@/utils/common";
  import EditDept from './edit'

  export default {
    name: "Dept",
    components: {AddDept, EditDept},
    data() {
      return {
        isTableLoading: false,
        formData: [],
        dept: [],
        searchName: ''
      }
    },
    mounted() {
      this.getDeptTree()
    },
    methods: {
      getDeptTree() {
        this.isTableLoading = true;
        getDeptTreeApi('').then(result => {
          this.isTableLoading = false;
          this.formData = result.resultParam.deptTree;
          this.dept = result.resultParam.deptTree;
        })
      },
      searchDept() {
        this.isTableLoading = true;
        getDeptTreeApi(this.searchName).then(result => {
          this.isTableLoading = false;
          this.formData = result.resultParam.deptTree;
        })
      },
      add() {
        let _this = this.$refs.AddDept;
        _this.visible = true
      },
      edit(obj) {
        let _this = this.$refs.EditDept;
        if (obj.pid === 0) obj.pid = null;
        objectEvaluate(_this.form, obj);
        _this.visible = true
      },
      deleteDept(id) {
        deleteDeptApi(id)
            .then(() => {
              this.getDeptTree();
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
