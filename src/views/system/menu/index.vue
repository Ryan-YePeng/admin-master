<template>
  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <el-button type="primary" icon="el-icon-plus" @click="add">新增</el-button>
    </div>
    <el-table v-loading="isTableLoading"
              :data="formData"
              row-key="menuId"
              :tree-props="{children: 'children'}">
      <el-table-column prop="title" label="菜单名称"></el-table-column>
      <el-table-column prop="icon" label="图标" align="center">
        <template slot-scope="scope">
          <svg-icon slot="prefix" :icon-class="scope.row.icon" class="el-table-column-icon"/>
        </template>
      </el-table-column>
      <el-table-column prop="sort" label="排序" align="center"></el-table-column>
      <el-table-column prop="name" label="路径名称"></el-table-column>
      <el-table-column prop="permission" label="权限标识"></el-table-column>
      <el-table-column label="外链">
        <template slot-scope="scope">
          <el-tag type="success" v-if="scope.row.iframe">是</el-tag>
          <el-tag type="info" v-else>否</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="缓存">
        <template slot-scope="scope">
          <el-tag type="success" v-if="scope.row.cache">是</el-tag>
          <el-tag type="info" v-else>否</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="可见">
        <template slot-scope="scope">
          <el-tag type="info" v-if="scope.row.hidden">否</el-tag>
          <el-tag type="success" v-else>是</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作" fixed="right" align="center" width="150">
        <template slot-scope="scope">
          <el-button type="primary" icon="el-icon-edit" @click.stop="edit(scope.row)"></el-button>
          <delete-button
                  :ref="scope.row.menuId"
                  :id="scope.row.menuId"
                  @start="deleteMenu"/>
        </template>
      </el-table-column>
    </el-table>
    <add-menu ref="AddMenu" :menu="formData" @update="getMenu"/>
    <edit-menu ref="EditMenu" :menu="formData" @update="getMenu"/>
  </el-card>
</template>

<script>
  import {getAllMenuApi, deleteMenuApi} from '@/api/menu'
  import AddMenu from './add'
  import EditMenu from './edit'
  import {objectEvaluate} from "@/utils/common";

  export default {
    name: "Menu",
    components: {AddMenu, EditMenu},
    data() {
      return {
        isTableLoading: false,
        isDeleteLoading: false,
        formData: []
      }
    },
    mounted() {
      this.getMenu()
    },
    methods: {
      getMenu() {
        this.isTableLoading = true;
        getAllMenuApi().then(result => {
          this.isTableLoading = false;
          this.formData = result.resultParam.menuList
        })
      },
      deleteMenu(id) {
        deleteMenuApi(id)
            .then(() => {
              this.getMenu();
              this.$refs[id].close()
            })
            .catch(() => {
              this.$refs[id].stop();
            })
      },
      add() {
        let _this = this.$refs.AddMenu;
        _this.visible = true;
      },
      edit(obj) {
        let _this = this.$refs.EditMenu;
        if (obj.pid === 0) obj.pid = null;
        objectEvaluate(_this.form, obj);
        _this.visible = true;
      }
    }
  }
</script>

<style scoped>

</style>
