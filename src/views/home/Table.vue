<template>
  <el-dialog
      title="新增"
      width="500px"
      @close="cancel"
      :close-on-click-modal="false"
      :visible.sync="visible">
    <el-form :model="form" :rules="rules" ref="Form" label-width="80px">
      <el-form-item label="名称" prop="name">
        <el-input v-model="form.name"></el-input>
      </el-form-item>

      <el-form-item label="类型" prop="checkList">
        <el-checkbox-group v-model="form.checkList">
          <el-checkbox label="类型 A"></el-checkbox>
          <el-checkbox label="类型 B" disabled></el-checkbox>
        </el-checkbox-group>
      </el-form-item>

      <el-form-item label="日期" prop="timePicker">
        <el-time-picker
            v-model="form.timePicker"
            :picker-options="{selectableRange: '18:30:00 - 20:30:00'}"
            placeholder="选择时间">
        </el-time-picker>
      </el-form-item>


    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="visible = false">取 消</el-button>
      <submit-button ref="Submit" @submit="submit"/>
    </div>
  </el-dialog>
</template>

<script>
  import {addApi} from '@/api/';
  import {resetForm} from "@/utils/common";

  export default {
    name: "Add",
    data() {
      return {
        visible: false,
        form: {
          name: '',
          sort: 999,
          enabled: true
        },
        rules: {
          name: {required: true, message: '请输入名称', trigger: 'blur'},
          sort: {required: true, message: '请输入排序', trigger: 'blur'}
        }
      }
    },
    methods: {
      submit() {
        this.$refs['Form'].validate((valid) => {
          if (valid) {
            let data = {...this.form};
            this.$refs.Submit.start();
            addApi(data).then(() => {
              this.$refs.Submit.stop();
              this.$emit('update');
              this.cancel()
            }).catch(() => {
              this.$refs.Submit.stop();
            })
          } else {
            return false;
          }
        });
      },
      cancel() {
        resetForm(this)
      }
    }
  }
</script>
