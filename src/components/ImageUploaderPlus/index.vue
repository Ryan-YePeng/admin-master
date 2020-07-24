<template>
  <div class="image-uploader-plus">
    <el-upload
        ref="ImageUploaderPlus"
        action="action"
        :accept="accept"
        :auto-upload="false"
        :on-change="changeUpload"
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
          class="upload-image"
          alt=""
          :style="{width: styleWidth,height:styleHeight}"/>
      <img
          v-else-if="value"
          :src="this.$baseApi + value"
          class="upload-image"
          alt=""
          :style="{width: styleWidth,height:styleHeight}"/>
      <i
          v-else
          class="el-icon-plus"
          :style="{width: styleWidth,lineHeight: styleHeight}"/>
    </el-upload>
    <el-dialog
        title="图片剪裁"
        width="700px"
        :visible.sync="visible"
        append-to-body
        :close-on-click-modal="false"
        @close="closeUpload">
      <div class="cropper">
        <vueCropper
            ref="cropper"
            :img="options.img"
            :output-size="options.size"
            :output-type="options.outputType"
            :info="options.info"
            :full="options.full"
            :fixed="options.fixed"
            :fixed-number="options.fixedNumber"
            :can-move="options.canMove"
            :can-move-box="options.canMoveBox"
            :fixed-box="options.fixedBox"
            :original="options.original"
            :auto-crop="options.autoCrop"
            :auto-crop-width="options.autoCropWidth"
            :auto-crop-height="options.autoCropHeight"
            :center-box="options.centerBox"
            :high="options.high"
            @imgLoad="imgLoad"/>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="closeUpload">取 消</el-button>
        <submit-button ref="Submit" @submit="submit"/>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import {VueCropper} from 'vue-cropper'
  import {uploadPictureApi} from "@/api/file";

  export default {
    name: "ImageUploaderPlus",
    components: {VueCropper},
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
        url: "",
        fileName: '',
        visible: false,
        options: {
          img: '', // 裁剪图片的地址
          info: false, // 裁剪框的大小信息
          outputSize: 1, // 裁剪生成图片的质量
          outputType: 'png', // 裁剪生成图片的格式 jpeg、png、webp
          canScale: false, // 图片是否允许滚轮缩放
          fixedBox: false, // 固定截图框大小 不允许改变
          fixed: true, // 是否开启截图框宽高固定比例
          fixedNumber: [this.width, this.height], // 截图框的宽高比例
          autoCrop: true, // 是否默认生成截图框
          full: false, // 是否输出原图比例的截图
          canMoveBox: true, // 截图框能否拖动
          original: false, // 上传图片按照原始比例渲染
          centerBox: true, // 截图框是否被限制在图片里面
          infoTrue: true, // true 为展示真实输出图片宽高 false 展示看到的截图框宽高
          high: true,
          size: 1
        }
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
        if (!val) this.clearFiles()
      }
    },
    methods: {
      changeUpload(result) {
        let file = result.raw;
        this.fileName = file.name;
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
        this.$nextTick(() => {
          this.options.img = URL.createObjectURL(file);
          this.visible = true
        })
      },
      submit() {
        this.$refs.cropper.getCropBlob(data => {
          let formData = new FormData();
          formData.append('file', data, this.fileName);
          formData.append('typePath', this.typePath);
          this.$refs.Submit.start();
          uploadPictureApi(formData)
            .then(result => {
              this.url = URL.createObjectURL(data);
              this.$emit('input', result.resultParam.uploadFilePath);
              this.$parent.$emit('el.form.change');
              this.$refs.Submit.stop();
              this.closeUpload();
            })
            .catch(() => {
              this.$refs.Submit.stop();
            })
        })
      },
      // 关闭上传及裁剪
      closeUpload() {
        this.options.img = '';
        this.visible = false;
      },
      // 图片加载情况
      imgLoad(msg) {
        if (msg !== 'success') {
          this.$errorMsg("图片加载失败！")
        }
      },
      // 删除文件
      deleteFile() {
        this.clearFiles();
        this.$emit("input", '');
        this.$parent.$emit('el.form.change');
      },
      // 清理文件
      clearFiles() {
        this.url = "";
        this.$refs.Submit.stop();
        this.$refs.ImageUploaderPlus.clearFiles();
      }
    }
  };
</script>

<style lang="scss">
  .image-uploader-plus {
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

    .el-icon-plus {
      font-size: 28px;
      color: #8c939d;
      background-color: #fbfdff;
      text-align: center;
    }

    .upload-image {
      display: block;
    }
  }

  .cropper {
    width: 100%;
    height: 340px;
    display: inline-block;
  }
</style>
