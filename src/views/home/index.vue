<template>
  <div>
    <el-button @click="set">按钮</el-button>
    <el-button @click="clear">清理文件</el-button>
    <el-button @click="get">获取文件</el-button>
    <image-uploader-batch ref="ImageUploaderBatch" :pathString="url"></image-uploader-batch>
  </div>
</template>

<script>
  import ImageUploaderBatch from "@/components/ImageUploaderBatch"

  export default {
    components: {ImageUploaderBatch},
    data() {
      return {
        url: ''
      }
    },
    methods: {
      set() {
        this.url = 'file/20200409/Avatar/3f6b7335-1556-4167-9491-cd39f26b3793.jpg,' +
          'file/20200409/Avatar/c99e691e-2298-4439-bd15-e98d0c38005c.jpg,' +
          'file/20200409/Avatar/38a3e536-e658-40e0-84cc-a9d1be8a6d25.jpg'
      },
      clear() {
        this.$refs.ImageUploaderBatch.clearFiles();
      },
      get() {
        this.$refs.ImageUploaderBatch.emitImage()
      }
    }
  }
</script>

<!--<template>-->
<!--  <div id="home"-->
<!--       :style="'height:' + (mainHeight-30) + 'px'"-->
<!--       v-show="isShow">-->
<!--  </div>-->
<!--</template>-->

<!--<script>-->
<!--  const elementResizeDetectorMaker = require("element-resize-detector");-->
<!--  let mainResizeListen = null;-->
<!--  mainResizeListen = elementResizeDetectorMaker();-->

<!--  export default {-->
<!--    name: "Home",-->
<!--    data() {-->
<!--      return {-->
<!--        mainHeight: 0,-->
<!--        isShow: false-->
<!--      }-->
<!--    },-->
<!--    mounted() {-->
<!--      this.addListen()-->
<!--    },-->
<!--    methods: {-->
<!--      addListen() {-->
<!--        let main = document.querySelector(".main");-->
<!--        this.mainHeight = main.offsetHeight;-->
<!--        this.isShow = true;-->
<!--        mainResizeListen.listenTo(main, () => {-->
<!--          this.$nextTick(() => {-->
<!--            this.mainHeight = main.offsetHeight;-->
<!--          })-->
<!--        })-->
<!--      }-->
<!--    },-->
<!--    beforeDestroy() {-->
<!--      let main = document.querySelector(".main");-->
<!--      mainResizeListen.uninstall(main);-->
<!--    }-->
<!--  }-->
<!--</script>-->

<!--<style lang="scss">-->
<!--  #home {-->
<!--    width: 100%;-->
<!--    box-shadow: 0 0 3px 3px silver;-->
<!--    background: url('../../assets/home.jpg') no-repeat top right;-->
<!--    background-size: cover;-->
<!--  }-->
<!--</style>-->


