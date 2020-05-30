<template>
  <div id="app">
    <!--<el-button @click="fun">按钮</el-button>-->
    <!--<el-button @click="reset">重置</el-button>-->
    <!--{{form.startTime}} - {{form.endTime}}-->
    <!--<el-form :model="form" :rules="rules" ref="Form" label-width="80px">-->
    <!--  <el-form-item label="用户名" prop="endTime">-->
    <!--    <date-time-picker :start.sync="form.startTime" :end.sync="form.endTime"/>-->
    <!--  </el-form-item>-->
    <!--</el-form>-->
    <router-view/>
  </div>
</template>

<script>
  export default {
    name: "App",
    data() {
      return {
        // form: {
        //   startTime: '',
        //   endTime: ''
        // },
        // rules: {
        //   endTime: {required: true, message: '请选择日期', trigger: 'change'}
        // }
      }
    },
    methods: {
      fun() {
        this.form.startTime = 'Wed Jun 17 2020 00:00:00 GMT+0800 (中国标准时间)';
        this.form.endTime = 'Wed Jun 20 2020 00:00:00 GMT+0800 (中国标准时间)'
      },
      reset() {
        Object.assign(this.$data.form, this.$options.data().form);
        this.$refs['Form'].clearValidate()
      }
    }
  };
</script>
