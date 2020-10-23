<template>
  <card ref="Card">
    <div slot="header">
      <el-input placeholder="输入菜单名称搜索" v-model="searchTitle" clearable class="w-200" @keyup.enter.native="searchData"/>
      <el-button type="success" class="el-icon-search ml-5" @click="searchData">搜索</el-button>
      <el-button type="primary" icon="el-icon-plus" @click="add()" class="float-right">新增</el-button>
    </div>
    <el-table
        row-key="id"
        :data="formData"
        :tree-props="{children: 'children'}">
      <el-table-column prop="title" label="菜单名称">
        <template slot-scope="scope">
          <span @dblclick.stop="add(scope.row)">{{scope.row.title}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="icon" label="图标">
        <template slot-scope="scope">
          <svg-icon slot="prefix" :icon-class="scope.row.icon"/>
        </template>
      </el-table-column>
      <el-table-column prop="sort" label="排序">
        <template slot-scope="scope">
          <span @dblclick.stop="edit(scope.row)">{{scope.row.sort}}</span>
        </template>
      </el-table-column>
      <el-table-column label="路径名称">
        <template slot-scope="scope">
          <clipboard :text="scope.row.name">{{scope.row.name}}</clipboard>
        </template>
      </el-table-column>
      <el-table-column prop="permission" label="权限标识"/>
      <el-table-column label="外链" align="center" width="55">
        <template slot-scope="scope">
          <el-tag type="success" v-if="scope.row.iframe">是</el-tag>
          <el-tag type="info" v-else>否</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="缓存" align="center" width="55">
        <template slot-scope="scope">
          <el-tag type="success" v-if="scope.row.cache">是</el-tag>
          <el-tag type="info" v-else>否</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="可见" align="center" width="55">
        <template slot-scope="scope">
          <el-tag type="info" v-if="scope.row.hidden">否</el-tag>
          <el-tag type="success" v-else>是</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作" fixed="right" align="center" width="210">
        <template slot-scope="scope">
          <el-button type="success" icon="el-icon-plus" @click.stop="add(scope.row)"/>
          <el-button type="primary" icon="el-icon-edit" @click.stop="edit(scope.row)"/>
          <delete-button :ref="scope.row.id" :id="scope.row.id" @start="delData"/>
        </template>
      </el-table-column>
    </el-table>
    <add ref="Add" :menu="menu" @update="getData"/>
    <edit ref="Edit" :menu="menu" @update="getData"/>
  </card>
</template>

<script>
  import {getAllMenuApi, deleteMenuApi} from '@/api/system/menu';
  import {objectEvaluate} from "@/utils/common";
  import Clipboard from '@/components/Clipboard';
  import Add from './add';
  import Edit from './edit';

  export default {
    name: "Menu",
    components: {Add, Edit, Clipboard},
    data() {
      return {
        isDeleteLoading: false,
        formData: [],
        menu: [],
        searchTitle: ''
      }
    },
    mounted() {
      this.getData()
    },
    methods: {
      getData() {
        this.$refs.Card.start();
        getAllMenuApi({title: ''}).then(result => {
          this.formData = result.resultParam.menuList;
          this.menu = result.resultParam.menuList;
          this.$refs.Card.stop()
        })
      },
      searchData() {
        this.$refs.Card.start();
        getAllMenuApi({title: this.searchTitle}).then(result => {
          this.$refs.Card.stop();
          this.formData = result.resultParam.menuList;
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
        deleteMenuApi({menuId: id})
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
