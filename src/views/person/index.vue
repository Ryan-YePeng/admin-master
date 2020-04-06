<template>
  <div class="person">
    <el-row :gutter="20">
      <el-col :xs="24" :sm="24" :md="8" :lg="6" :xl="5">
        <el-card class="box-card" style="margin-bottom: 20px">
          <div slot="header" class="clearfix">
            <span>个人信息</span>
          </div>
          <ul class="personInfo">
            <li>
              <span>用户名称</span>
              <span>{{user.username}}</span>
            </li>
            <li>
              <span>手机号码</span>
              <span>{{user.phone}}</span>
            </li>
            <li>
              <span>用户邮箱</span>
              <span>{{user.email}}</span>
            </li>
            <li>
              <span>所属部门</span>
              <span>{{user.dept}}</span>
            </li>
            <li>
              <span>创建日期</span>
              <span>{{user.createTime | formatDate}}</span>
            </li>
            <li>
              <span>安全设置</span>
              <span>
                <a style="color: #317ef3; cursor: pointer" @click="changePassword">修改密码</a>
              </span>
            </li>
          </ul>
        </el-card>
      </el-col>
      <el-col :xs="24" :sm="24" :md="16" :lg="18" :xl="19">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>操作日志</span>
            <i class="float-right pointer"
               :class="isLoading ? 'el-icon-loading':'el-icon-refresh'"
               @click="update"></i>
          </div>
          <div>
            <el-table v-loading="isTableLoading" :data="formData">
              <el-table-column prop="description" label="行为"></el-table-column>
              <el-table-column prop="requestIp" label="IP" :show-overflow-tooltip="true"></el-table-column>
              <el-table-column prop="address" label="IP来源" :show-overflow-tooltip="true"></el-table-column>
              <el-table-column prop="browser" label="浏览器"></el-table-column>
              <el-table-column prop="time" label="请求耗时" :show-overflow-tooltip="true">
                <template slot-scope="scope">
                  <el-tag>{{ scope.row.time }}ms</el-tag>
                </template>
              </el-table-column>
              <el-table-column prop="createTime" label="创建时间">
                <template slot-scope="scope">
                  <span>{{ scope.row.createTime | formatDateTime}}</span>
                </template>
              </el-table-column>
            </el-table>
            <pagination ref="Pagination" @getNewData="getLog"></pagination>
          </div>
        </el-card>
      </el-col>
    </el-row>
    <password-dialog ref="PasswordDialog"></password-dialog>
  </div>
</template>

<script>
  import {getUserLogApi} from '../../api/person'
  import PasswordDialog from './passwordDialog'

  export default {
    components: {PasswordDialog},
    name: 'person',
    data() {
      return {
        isLoading: false,
        isTableLoading: false,
        formData: []
      }
    },
    mounted() {
      this.getLog()
    },
    computed: {
      'user': function () {
        return this.$store.getters.user
      }
    },
    methods: {
      // 更新操作日志
      update() {
        this.isLoading = true;
        this.getLog();
      },
      // 获得个人操作日志
      getLog() {
        this.isTableLoading = true;
        let pagination = this.$refs.Pagination;
        let param = `page=${pagination.current}&size=${pagination.size}`;
        getUserLogApi(param).then(result => {
          this.isTableLoading = false;
          this.isLoading = false;
          let response = result.resultParam.logIPage;
          this.formData = response.records;
          pagination.total = response.total
        })
      },
      // 修改密码
      changePassword() {
        const _this = this.$refs.PasswordDialog;
        _this.visible = true
      }
    }
  }
</script>

<style lang="scss">
  .person {
    .personInfo li {
      border-bottom: 1px solid #f0f3f4;
      border-top: 1px solid #f0f3f4;
      padding: 11px 0;
      font-size: 13px;
      display: flex;
      justify-content: space-between;
    }

    .el-avatar > img {
      width: 100%;
    }
  }
</style>
