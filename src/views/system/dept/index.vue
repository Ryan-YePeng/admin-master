<template>
  <card ref="Card">
    <div slot="header">
      <el-input placeholder="输入部门名称搜索" v-model="searchName" clearable class="w-200" @keyup.enter.native="searchData"/>
      <el-button type="success" class="el-icon-search ml-5" @click="searchData">搜索</el-button>
      <el-button class="float-right" type="primary" icon="el-icon-plus" @click="add()">新增</el-button>
    </div>
    <el-table
        row-key="id"
        :data="formData"
        :default-expand-all="true"
        :tree-props="{children: 'children'}">
      <el-table-column prop="name" label="部门名称"/>
      <el-table-column prop="sort" label="排序"/>
      <el-table-column label="状态">
        <template slot-scope="scope">
          <el-tag type="success" v-if="scope.row.enabled">启用</el-tag>
          <el-tag type="info" v-else>停用</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="创建时间" :show-overflow-tooltip="true">
        <template slot-scope="scope">
          <span>{{scope.row.createTime | formatDateTime}}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" fixed="right" align="center" width="210">
        <template slot-scope="scope">
          <el-button type="success" icon="el-icon-plus" @click.stop="add(scope.row)"></el-button>
          <el-button type="primary" icon="el-icon-edit" @click.stop="edit(scope.row)"></el-button>
          <delete-button :ref="scope.row.id" :id="scope.row.id" @start="delData"/>
        </template>
      </el-table-column>
    </el-table>
    <add ref="Add" :dept="dept" @update="getData"/>
    <edit ref="Edit" :dept="dept" @update="getData"/>
  </card>
</template>

<script>
  import {getDeptTreeApi, deleteDeptApi} from '@/api/system/dept'
  import {objectEvaluate} from "@/utils/common";
  import Add from './add'
  import Edit from './edit'

  export default {
    name: "Dept",
    components: {Add, Edit},
    data() {
      return {
        formData: [],
        dept: [],
        searchName: ''
      }
    },
    mounted() {
      this.getData()
    },
    methods: {
      getData() {
        this.$refs.Card.start();
        getDeptTreeApi({deptName: ''}).then(result => {
          this.formData = result.resultParam.deptTree;
          this.dept = result.resultParam.deptTree;
          this.$refs.Card.stop();
        })
      },
      searchData() {
        this.$refs.Card.start();
        getDeptTreeApi({deptName: this.searchName}).then(result => {
          this.$refs.Card.stop();
          this.formData = result.resultParam.deptTree;
        })
      },
      add(obj) {
        let _this = this.$refs.Add;
        _this.visible = true;
        if (obj) objectEvaluate(_this.form, {pid: obj.id}, this);
      },
      edit(obj) {
        let _this = this.$refs.Edit;
        _this.visible = true;
        if (obj.pid === 0) obj.pid = null;
        objectEvaluate(_this.form, obj, this);
      },
      delData(id) {
        deleteDeptApi({deptId: id})
          .then(() => {
            this.getData();
            this.$refs[id].close()
          })
          .catch(() => {
            this.$refs[id].stop();
          })
      }
    }
  }
</script>
