<template>
  <div id="app">
    <!--<el-button @click="fun">按钮</el-button>-->
    <!--<el-button @click="reset">重置</el-button>-->
    <!--<el-form :model="form" :rules="rules" ref="Form" label-width="80px">-->
    <!--  <el-form-item label="名称" prop="name">-->
    <!--    <input-search v-model="form.name"/>-->
    <!--  </el-form-item>-->
    <!--</el-form>-->
    <router-view/>
  </div>
</template>

<script>
  // import InputSearch from '@/components/InputSearch'

  export default {
    name: "App",
    // components: {InputSearch},
    data() {
      return {
        form: {
          name: ''
        },
        rules: {
          name: {required: true, message: '请选择职业名称', trigger: 'change'}
        }
      }
    },
    methods: {
      fun() {
        this.form = {
          name: '北京市'
        }
      },
      reset() {
        Object.assign(this.$data.form, this.$options.data().form);
        this.$refs['Form'].clearValidate()
      }
    }
  };
</script>
