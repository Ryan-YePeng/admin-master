<!--<template>-->
<!--  <div id="home">-->
<!--    <Clipboard :text='token'>-->
<!--      <el-button size="large">点击复制Token</el-button>-->
<!--    </Clipboard>-->
<!--  </div>-->
<!--</template>-->

<!--<script>-->
<!--  import Clipboard from "@/components/Clipboard/index";-->

<!--  export default {-->
<!--    name: "Home",-->
<!--    components: {Clipboard},-->
<!--    computed: {-->
<!--      token() {-->
<!--        return this.$storeGet.token-->
<!--      }-->
<!--    }-->
<!--  }-->
<!--</script>-->

<template>
  <div
      id="home"
      :style="'height:' + (mainHeight-30) + 'px'"
      v-show="isShow">
  </div>
</template>

<script>
  const elementResizeDetectorMaker = require("element-resize-detector");
  let mainResizeListen = elementResizeDetectorMaker();

  export default {
    name: "Home",
    data() {
      return {
        mainHeight: 0,
        isShow: false
      }
    },
    mounted() {
      this.addListen()
    },
    methods: {
      addListen() {
        let main = document.querySelector(".main");
        this.mainHeight = main.offsetHeight;
        this.isShow = true;
        mainResizeListen.listenTo(main, () => {
          this.$nextTick(() => {
            this.mainHeight = main.offsetHeight;
          })
        })
      }
    },
    beforeDestroy() {
      let main = document.querySelector(".main");
      mainResizeListen.uninstall(main);
    }
  }
</script>

<style lang="scss">
  #home {
    box-shadow: 0 0 3px 3px silver;
    background: url('../../assets/home.jpg') no-repeat center center;
    background-size: contain;
  }
</style>
