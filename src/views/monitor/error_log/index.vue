<template>
  <el-card class="box-card" id="operation-log">
    <el-table
            v-loading="isTableLoading"
            :data="formData">
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-form class="log-table-expand">
            <el-form-item label="请求方法">
              <span>{{ props.row.method }}</span>
            </el-form-item>
            <el-form-item label="请求参数">
              <span>{{ props.row.params }}</span>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>
      <el-table-column prop="username" label="用户名"></el-table-column>
      <el-table-column prop="requestIp" label="IP"></el-table-column>
      <el-table-column prop="description" label="描述"></el-table-column>
      <el-table-column label="创建日期">
        <template slot-scope="scope">
          <span>{{ scope.row.createTime | formatDateTime}}</span>
        </template>
      </el-table-column>
      <el-table-column label="异常详情" width="100px">
        <template slot-scope="scope">
          <el-button type="text" @click="info(scope.row.logId)">查看详情</el-button>
        </template>
      </el-table-column>
    </el-table>
    <pagination ref="Pagination" @getNewData="getLogList"></pagination>
    <el-dialog :visible.sync="dialog" title="异常详情" :close-on-click-modal="false" top="30px" width="85%">
      <pre v-highlightjs="errorInfo"><code class="java"/></pre>
    </el-dialog>
  </el-card>
</template>

<script>
  import {getErrorLogApi, getErrorDetailByIdApi} from '@/api/log'

  export default {
    name: "OperationLog",
    data() {
      return {
        isTableLoading: false,
        formData: [],
        dialog: false,
        errorInfo: ''
      }
    },
    mounted() {
      this.getLogList()
    },
    methods: {
      getLogList() {
        this.isTableLoading = true;
        let pagination = this.$refs.Pagination;
        let param = `current=${pagination.current}&size=${pagination.size}`;
        getErrorLogApi(param).then(result => {
          this.isTableLoading = false;
          let response = result.resultParam.logIPage;
          this.formData = response.records;
          pagination.total = response.total;
        })
      },
      info(id) {
        this.dialog = true;
        getErrorDetailByIdApi(id).then(result => {
          this.errorInfo = result.resultParam.log.exceptionDetail
        })
      }
    }
  }
</script>

<style lang="scss">
  #operation-log {
    .log-table-expand {
      font-size: 0;
    }

    .log-table-expand label {
      width: 70px;
      color: #99a9bf;
    }

    .log-table-expand .el-form-item {
      margin-right: 0;
      margin-bottom: 0;
      width: 100%;
    }

    .log-table-expand .el-form-item__content {
      font-size: 12px;
    }

    .java.hljs {
      color: #444;
      background: #ffffff !important;
    }

    .el-dialog__body {
      padding: 0 20px 10px 20px !important;
    }
  }
</style>
