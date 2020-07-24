<template>
  <div class="image-uploader-batch-plus">
    <el-upload
        ref="ImageUploaderBatchPlus"
        action="action"
        list-type="picture-card"
        :limit="limit"
        :accept="accept"
        :auto-upload="true"
        :file-list="fileList"
        :multiple="false"
        :on-success="uploadSuccess"
        :on-remove="handEmit"
        :on-exceed="handExceed"
        :http-request="uploadFile">
      <i class="el-icon-plus"></i>
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
  import {uploadFileApi} from "@/api/file";

  export default {
    name: "ImageUploaderBatchPlus",
    components: {VueCropper},
    props: {
      value: {
        type: String,
        default: ""
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
      },
      limit: { // 数量限制
        type: Number,
        default: 9
      }
    },
    data() {
      return {
        accept: ".jpg, .png",
        fileList: [],
        hasUpload: false,
        visible: false,
        param: null,
        url: '',
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
    watch: {
      value(val) {
        if (val && !this.hasUpload) {
          this.fileList = val.split(',').map(item => ({pathUrl: item, url: this.$baseApi + item}));
          this.hasUpload = true;
        }
        if (!val) this.clearFiles()
      }
    },
    methods: {
      // 自定义上传
      uploadFile(param) {
        const {file} = param;
        const type = file.name.substring(file.name.lastIndexOf(".") + 1).toLowerCase();
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
        this.param = param;
        this.$nextTick(() => {
          this.options.img = URL.createObjectURL(file);
          this.visible = true
        })
      },
      submit() {
        this.$refs.cropper.getCropBlob(data => {
          let formData = new FormData();
          formData.append('file', data, this.param.file.name);
          this.$refs.Submit.start();
          uploadFileApi(formData)
            .then(result => {
              this.hasUpload = true;
              this.url = URL.createObjectURL(data);
              this.param.onSuccess(result.data, this.file);
              this.$refs.Submit.stop();
              this.closeUpload();
            })
            .catch(() => {
              this.param.onError();
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
      uploadSuccess(path, file) {
        let url = this.url;
        let uploadFiles = this.$refs['ImageUploaderBatchPlus'].uploadFiles;
        uploadFiles.some(item => {
          if (item.uid === file.uid) {
            item.pathUrl = path;
            item.url = url;
            return true
          }
        });
        this.handEmit()
      },
      handEmit() {
        let pathStr = '';
        this.$refs['ImageUploaderBatchPlus'].uploadFiles
          .forEach(item => {
            pathStr = pathStr + `${item.pathUrl},`;
          });
        pathStr = pathStr.substr(0, pathStr.length - 1);
        this.$emit("input", pathStr);
        this.$parent.$emit('el.form.change')
      },
      handExceed() {
        this.$errorMsg(`至多上传${this.limit}张图片`)
      },
      // 清理文件
      clearFiles() {
        this.fileList = [];
        this.hasUpload = false;
        this.$refs.ImageUploaderBatchPlus.clearFiles();
      }
    }
  };
</script>

<style lang="scss">
  .image-uploader-batch-plus {
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
