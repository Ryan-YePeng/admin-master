<template>
  <row-col :gutter="20">
    <div style="height: 20px;background-color: red"></div>
    <div slot="r" style="height: 20px;background-color: pink"></div>
  </row-col>
  <!--  <row-col>-->
  <!--    <div slot="l" id="home"-->
  <!--         :style="'height:' + (mainHeight-30) + 'px'"-->
  <!--         v-show="isShow">-->
  <!--    </div>-->
  <!--  </row-col>-->
</template>

<script>
  const elementResizeDetectorMaker = require("element-resize-detector");
  let mainResizeListen = null;
  mainResizeListen = elementResizeDetectorMaker();

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
    width: 100%;
    box-shadow: 0 0 3px 3px silver;
    background: url('../../assets/home.jpg') no-repeat top right;
    background-size: cover;
  }
</style>
