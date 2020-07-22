<template>
  <el-upload
      ref="ImageUploaderBatch"
      class="image-uploader-batch"
      action="action"
      list-type="picture-card"
      :limit="limit"
      :accept="accept"
      :file-list="fileList"
      :multiple="true"
      :on-success="uploadSuccess"
      :on-remove="emitImage"
      :on-exceed="exceed"
      :http-request="uploadFile">
    <i class="el-icon-plus"></i>
  </el-upload>
</template>

<script>
  import {uploadPicturePlusApi} from "@/api/file";

  export default {
    name: "ImageUploaderBatch",
    props: {
      value: {
        type: String,
        default: ""
      },
      typePath: { // 上传路径
        type: String,
        default: 'image'
      },
      size: { // 大小限制(MB)
        type: Number,
        default: 2
      },
      limit: { // 数量限制
        type: Number,
        default: 3
      },
    },
    data() {
      return {
        accept: ".jpg, .png",
        fileList: [],
        hasUpload: false
      };
    },
    watch: {
      value(val) {
        if (val && !this.hasUpload) {
          let list = val.split(',');
          let baseUrl = process.env.VUE_APP_BASE_API;
          this.fileList = list.map(item => ({pathUrl: item, url: baseUrl + item}))
        }
        if (!val) this.clearFiles()
      }
    },
    methods: {
      // 自定义上传
      uploadFile(param) {
        const {file} = param;
        const type = file.name
          .substring(file.name.lastIndexOf(".") + 1)
          .toLowerCase();
        const size = file.size / 1024 / 1024;
        if (!this.accept.includes(type)) {
          let accept = this.accept.replace(/[.]|[,]/g, "");
          this.$errorMsg(`上传图片只能是 ${accept} 格式!`);
          param.onError();
          return;
        }
        if (size > this.size) {
          this.$errorMsg(`上传图片大小不能超过 ${this.size}MB!`);
          param.onError();
          return;
        }
        let data = {};
        data.file = file;
        data.typePath = this.typePath;
        uploadPicturePlusApi(data)
          .then(result => {
            this.hasUpload = true;
            param.onSuccess(result.resultParam.uploadFilePath, file);
          })
          .catch(() => {
            param.onError();
          });
      },
      uploadSuccess(path, file) {
        let uploadFiles = this.$refs['ImageUploaderBatch'].uploadFiles;
        uploadFiles.some(item => {
          if (item.uid === file.uid) {
            item.pathUrl = path;
            return true
          }
        });
        this.emitImage()
      },
      emitImage() {
        let pathStr = '';
        this.$refs['ImageUploaderBatch'].uploadFiles
          .forEach(item => {
            pathStr = pathStr + `${item.pathUrl},`;
          });
        pathStr = pathStr.substr(0, pathStr.length - 1);
        this.$emit("input", pathStr);
        this.$parent.$emit('el.form.change')
      },
      exceed() {
        this.$errorMsg(`至多上传${this.limit}张图片`)
      },
      // 清理文件
      clearFiles() {
        this.fileList = [];
        this.hasUpload = false;
        this.$refs.ImageUploaderBatch.clearFiles();
      }
    }
  };
</script>

<style lang="scss">
  .image-uploader-batch {
    .el-upload {
      border: 1px dashed #d9d9d9;
      border-radius: 6px;
      cursor: pointer;
      position: relative;
      overflow: hidden;
    }

    .el-upload:hover {
      border-color: #409eff;
    }
  }
</style>
