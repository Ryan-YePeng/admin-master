<template>
  <card>
    <div slot="header">
      <clipboard class="float-right" :text="code.tree">
        <el-button type="warning">树形</el-button>
      </clipboard>
    </div>
    <el-form>
      <!--表单-->
      <el-form-item label="表单:">
        <clipboard :text="code.input">
          <el-button>input</el-button>
        </clipboard>
        <clipboard :text="code.number">
          <el-button>number</el-button>
        </clipboard>
        <clipboard :text="code.checkbox">
          <el-button>checkbox</el-button>
        </clipboard>
        <clipboard :text="code.radio">
          <el-button>radio</el-button>
        </clipboard>
        <clipboard :text="code.select">
          <el-button>select</el-button>
        </clipboard>
        <clipboard :text="code.switch">
          <el-button>switch</el-button>
        </clipboard>
        <clipboard :text="code.timePicker">
          <el-button>timePicker</el-button>
        </clipboard>
        <clipboard :text="code.datePicker">
          <el-button>datePicker</el-button>
        </clipboard>
      </el-form-item>

      <!--弹出框-->
      <el-form-item label="弹出框:">
        <clipboard :text="code.dialog">
          <el-button>index.vue</el-button>
        </clipboard>
        <clipboard :text="code.dialogHtml">
          <el-button>template</el-button>
        </clipboard>
        <clipboard :text="code.dialogRules">
          <el-button>rules</el-button>
        </clipboard>
        <clipboard :text="code.dialogSubmit">
          <el-button>submit</el-button>
        </clipboard>
      </el-form-item>

      <!--表格-->
      <el-form-item label="表格:">
        <clipboard :text="code.table">
          <el-button>index.vue</el-button>
        </clipboard>
        <clipboard :text="code.tableMiddleware">
          <el-button>中间件</el-button>
        </clipboard>
        <clipboard :text="code.tableHeader">
          <el-button>头部</el-button>
        </clipboard>
        <clipboard :text="code.tableSelect">
          <el-button>选择</el-button>
        </clipboard>
        <clipboard :text="code.tableDate">
          <el-button>日期</el-button>
        </clipboard>
        <clipboard :text="code.tableImage">
          <el-button>图片</el-button>
        </clipboard>
        <clipboard :text="code.tableSwitch">
          <el-button>状态</el-button>
        </clipboard>
        <clipboard :text="code.tableGet">
          <el-button>获取</el-button>
        </clipboard>
      </el-form-item>

      <!--操作-->
      <el-form-item label="操作:">
        <clipboard :text="code.operateHtml">
          <el-button>template</el-button>
        </clipboard>
        <clipboard :text="code.operateEditJs">
          <el-button>editJs</el-button>
        </clipboard>
        <clipboard :text="code.operateDelJs">
          <el-button>delJS</el-button>
        </clipboard>
      </el-form-item>
    </el-form>
  </card>
</template>

<script>
  import Clipboard from "@/components/Clipboard";
  import Code from './code'

  export default {
    name: "CopyCode",
    components: {Clipboard},
    computed: {
      code() {
        return Code
      }
    }
  };
</script>
