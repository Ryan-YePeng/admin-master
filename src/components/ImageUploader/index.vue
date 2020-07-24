<template>
  <el-upload
      v-loading="isLoading"
      element-loading-background="rgba(255, 255, 255, 0)"
      ref="ImageUploader"
      class="image-uploader"
      action="action"
      :disabled="disabled"
      :accept="accept"
      :http-request="uploadFile"
      :show-file-list="false"
      :style="{width: styleWidth,height:styleHeight}">
    <div
        v-show="value"
        class="delete-mask"
        :style="{width: styleWidth,height: styleHeight}">
      <div
          class="el-icon-delete"
          :style="{marginTop: styleMargin}"
          @click.stop="deleteFile"/>
    </div>
    <img
        v-if="url"
        :src="url"
        class="uploader-image"
        alt=""
        :style="{width: styleWidth,height:styleHeight}"/>
    <img
        v-else-if="value"
        :src="this.$baseApi + value"
        class="uploader-image"
        alt=""
        :style="{width: styleWidth,height:styleHeight}"/>
    <i
        v-else
        class="el-icon-plus"
        :style="{width: styleWidth,lineHeight: styleHeight}"/>
  </el-upload>
</template>

<script>
  import {uploadPicturePlusApi} from "@/api/file";

  export default {
    name: "ImageUploader",
    props: {
      value: {
        type: String,
        default: ""
      },
      typePath: { // 上传路径
        type: String,
        default: 'image'
      },
      width: { // 宽度
        type: Number,
        default: 178
      },
      height: { // 高度
        type: Number,
        default: 178
      },
      size: { // 大小限制(MB)
        type: Number,
        default: 2
      }
    },
    data() {
      return {
        accept: ".jpg, .png",
        isLoading: false,
        url: ""
      };
    },
    computed: {
      disabled() {
        return !!this.value
      },
      styleWidth() {
        return `${this.width}px`;
      },
      styleHeight() {
        return `${this.height}px`;
      },
      styleMargin() {
        return `${this.height / 2 - 15}px`;
      }
    },
    watch: {
      value(val) {
        if (!val) this.clearFiles();
      }
    },
    methods: {
      /* 自定义上传 */
      uploadFile(param) {
        const {file} = param;
        const type = file.name.substring(file.name.lastIndexOf(".") + 1).toLowerCase();
        const size = file.size / 1024 / 1024;
        if (!this.accept.includes(type)) {
          let accept = this.accept.replace(/[.]|[,]/g, "");
          this.$errorMsg(`上传图片只能是 ${accept} 格式!`);
          return;
        }
        if (size > this.size) {
          this.$errorMsg(`上传图片大小不能超过 ${this.size}MB!`);
          return;
        }
        this.isLoading = true;
        let data = {};
        data.file = file;
        data.typePath = this.typePath;
        uploadPicturePlusApi(data)
          .then(result => {
            this.isLoading = false;
            this.$emit("input", result.resultParam.uploadFilePath);
            this.$parent.$emit('el.form.change');
            this.url = URL.createObjectURL(file);
          })
          .catch(() => {
            this.isLoading = false;
          });
      },
      /* 删除文件 */
      deleteFile() {
        this.clearFiles();
        this.$emit("input", '');
        this.$parent.$emit('el.form.change');
      },
      /* 清理文件 */
      clearFiles() {
        this.url = "";
        this.isLoading = false;
        this.$refs.ImageUploader.clearFiles();
      }
    }
  };
</script>

<style lang="scss">
  .image-uploader {
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

    .delete-mask {
      position: absolute;
      top: 0;
      left: 0;
      opacity: 0;
      background-color: rgba(0, 0, 0, .5);
      text-align: center;
      transition: all .3s;
    }

    .delete-mask:hover {
      opacity: 1;
      transition: all .3s;
    }

    .el-icon-delete {
      color: white;
      font-size: 28px;
    }

    .uploader-image {
      display: block;
      object-fit: contain;
    }

    .el-icon-plus {
      font-size: 28px;
      color: #8c939d;
      background-color: #fbfdff;
      text-align: center;
    }
  }
</style>
