<template>
  <card ref="Card">
    <div slot="header">
      <tree-select
          v-model="searchByDept"
          style="float: left;width: 200px;"
          :tree="dept"
          placeholder="选择部门搜索"
          @get="getData"/>
      <el-input placeholder="输入用户名搜索" v-model="searchName" clearable class="w-200 ml-5" @keyup.enter.native="getData"/>
      <el-button type="success" class="el-icon-search ml-5" @click="getData">搜索</el-button>
      <el-button class="float-right" type="primary" icon="el-icon-plus" @click="add">新增</el-button>
    </div>
    <el-table :data="formData">
      <el-table-column prop="username" label="用户名"/>
      <el-table-column prop="nickName" label="昵称"/>
      <el-table-column prop="sex" label="性别"/>
      <el-table-column prop="phone" label="电话" :show-overflow-tooltip="true"/>
      <el-table-column prop="email" label="邮箱" :show-overflow-tooltip="true"/>
      <el-table-column label="部门">
        <template slot-scope="scope">
          {{scope.row.dept | formatObj}}
        </template>
      </el-table-column>
      <el-table-column label="岗位" :show-overflow-tooltip="true">
        <template slot-scope="scope">
          {{scope.row.jobs | formatArray}}
        </template>
      </el-table-column>
      <el-table-column label="角色" :show-overflow-tooltip="true">
        <template slot-scope="scope">
          {{scope.row.roles | formatArray}}
        </template>
      </el-table-column>
      <el-table-column label="状态">
        <template slot-scope="scope">
          <el-tag type="info" v-if="scope.row.enabled">正常</el-tag>
          <el-tag type="danger" v-else>禁用</el-tag>
        </template>
      </el-table-column>
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
    <pagination ref="Pagination" @update="getData"></pagination>
    <add
        ref="Add"
        :dept="dept"
        @update="getData"
        :roleList="roleList"
        :jobList="jobList"
        :level="level"/>
    <edit
        ref="Edit"
        :dept="dept"
        @update="getData"
        :roleList="roleList"
        :jobList="jobList"
        :level="level"/>
  </card>
</template>

<script>
  import TreeSelect from '@/components/TreeSelect';
  import {getUserListApi, deleteUserApi, getUserLevelApi} from '@/api/system/user';
  import {getDeptTreeApi} from '@/api/system/dept';
  import {getRoleListApi} from '@/api/system/role';
  import {getJobListApi} from '@/api/system/job';
  import {objectEvaluate} from "@/utils/common";
  import Add from './add';
  import Edit from './edit';

  export default {
    name: "User",
    components: {TreeSelect, Add, Edit},
    data() {
      return {
        level: null,
        searchName: '',
        searchByDept: null,
        formData: [],
        dept: [],
        roleList: [],
        jobList: []
      }
    },
    mounted() {
      this.getData();
      this.getLevel();
      this.getDept();
      this.getRole();
      this.getJob();
    },
    methods: {
      getLevel() {
        getUserLevelApi().then(result => {
          this.level = result.resultParam.level
        })
      },
      getJob() {
        getJobListApi({jobName: ''}).then(result => {
          this.jobList = result.resultParam.jobList.records
        })
      },
      getRole() {
        getRoleListApi({roleName: ''}).then(result => {
          this.roleList = result.resultParam.roleList;
        })
      },
      getDept() {
        getDeptTreeApi({deptName: ''}).then(result => {
          this.dept = result.resultParam.deptTree;
        })
      },
      getData() {
        this.$refs.Card.start();
        let pagination = this.$refs.Pagination;
        let param = {
          current: pagination.current,
          size: pagination.size,
          deptId: this.searchByDept,
          username: this.searchName
        };
        getUserListApi(param).then(result => {
          this.$refs.Card.stop();
          let response = result.resultParam.userList;
          this.formData = response.records;
          pagination.total = response.total;
        })
      },
      add() {
        this.$refs.Add.visible = true
      },
      edit(obj) {
        let _this = this.$refs.Edit;
        _this.visible = true;
        obj.rolesId = obj.roles.map(item => item.id);
        obj.jobsId = obj.jobs.map(item => item.id);
        objectEvaluate(_this.form, obj, this);
      },
      delData(id) {
        deleteUserApi({ids: id})
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
