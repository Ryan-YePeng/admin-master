<template>
  <div class="video-uploader" :style="{width: styleWidth}">
    <el-upload
        v-loading="isLoading"
        element-loading-background="rgba(255, 255, 255, 0)"
        ref="VideoUploader"
        action="action"
        :accept="accept"
        :http-request="uploadFile"
        :show-file-list="false"
        :disabled="disabled"
        :style="{width: styleWidth,height:styleHeight}">
      <div
          v-show="isLoading"
          class="close-mask"
          :style="{width: styleWidth,height: styleHeight}">
        <div
            class="el-icon-close"
            :style="{marginTop: styleMargin}"
            @click.stop="cancelUpload"/>
      </div>
      <div
          v-show="value"
          class="delete-mask"
          :style="{width: styleWidth,height: styleHeight}">
        <div
            class="el-icon-delete"
            :style="{marginTop: styleMargin}"
            @click.stop="deleteFile"/>
      </div>
      <video
          v-if="url && !isLoading"
          class="upload-video"
          :src="url"
          :style="{width: styleWidth,height:styleHeight}"/>
      <video
          v-else-if="value && !isLoading"
          class="upload-video"
          :src="baseUrl + value"
          :style="{width: styleWidth,height:styleHeight}"/>
      <i
          v-else
          class="el-icon-plus"
          :style="{width: styleWidth,lineHeight: styleHeight}"/>
    </el-upload>
    <el-progress
        v-show="isLoading"
        :percentage="percentage"
        :color="customColor"/>
  </div>
</template>

<script>
  import axios from "axios";
  import {uploadVideoPlusApi} from "@/api/file";

  export default {
    name: "VideoUploader",
    props: {
      value: {
        type: String,
        default: ""
      },
      typePath: { // 上传路径
        type: String,
        default: 'video'
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
        default: 40
      }
    },
    data() {
      return {
        isLoading: false,
        source: null,
        url: "",
        percentage: 0,
        accept: ".avi, .mp4, .flv, .wmv, .mkv",
        customColor: [
          {color: "#909399", percentage: 40},
          {color: "#1989fa", percentage: 80},
          {color: "#67c23a", percentage: 100}
        ]
      };
    },
    computed: {
      baseUrl() {
        return process.env.VUE_APP_BASE_API
      },
      disabled() {
        return this.isLoading || !!this.value
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
        if (!val) this.clearFiles()
      }
    },
    mounted() {
      this.reset();
    },
    methods: {
      // 自定义上传
      uploadFile(param) {
        const {file} = param;
        const type = file.name.substring(file.name.lastIndexOf(".") + 1).toLowerCase();
        const size = file.size / 1024 / 1024;
        if (!this.accept.includes(type)) {
          let accept = this.accept.replace(/[.]|[,]/g, "");
          this.$errorMsg(`上传视屏只能是 ${accept} 格式!`);
          return;
        }
        if (size > this.size) {
          this.$errorMsg(`上传视屏大小不能超过 ${this.size}MB!`);
          return;
        }
        this.isLoading = true;
        let data = {};
        data.file = file;
        data.typePath = this.typePath;
        uploadVideoPlusApi(data, this.update, this.source)
          .then(result => {
            this.reset();
            this.$emit("input", result.resultParam.uploadFilePath);
            this.$parent.$emit('el.form.change');
            this.url = URL.createObjectURL(file);
          })
          .catch(error => {
            this.reset();
            if (
              axios.isCancel(error) &&
              error.message === "Request Interruption"
            ) {
              this.$infoMsg("已取消上传");
            }
          });
      },
      // 滚动条更新
      update(value) {
        this.percentage = value;
      },
      // 重置
      reset() {
        this.isLoading = false;
        this.percentage = 0;
        let CancelToken = axios.CancelToken;
        this.source = CancelToken.source();
      },
      // 中断上传
      cancelUpload() {
        this.source.cancel("Request Interruption");
      },
      // 删除文件
      deleteFile() {
        this.$emit("input", '');
        this.$parent.$emit('el.form.change');
        this.clearFiles()
      },
      // 清理文件
      clearFiles() {
        this.url = "";
        this.percentage = 0;
        this.isLoading = false;
        if (this.isLoading) this.cancelUpload();
        this.$refs.VideoUploader.clearFiles();
      }
    }
  };
</script>

<style lang="scss">
  .video-uploader {
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

    .close-mask,
    .delete-mask {
      position: absolute;
      top: 0;
      left: 0;
      opacity: 0;
      text-align: center;
      transition: all .3s;
      z-index: 2500;
    }

    .close-mask {
      background-color: #fbfdff;
    }

    .delete-mask {
      background-color: rgba(0, 0, 0, .5);
    }

    .close-mask:hover,
    .delete-mask:hover {
      opacity: 1;
      transition: all .3s;
    }

    .el-icon-close,
    .el-icon-plus {
      font-size: 28px;
      color: #8c939d;
    }

    .el-icon-delete {
      font-size: 28px;
      color: white;
    }

    .el-icon-plus {
      background-color: #fbfdff;
      text-align: center;
    }

    .upload-video {
      display: block;
      object-fit: contain;
    }

    .el-progress {
      margin-top: 10px;
    }
  }
</style>
