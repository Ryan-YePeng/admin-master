<template>
  <div id="home" :style="'height:' + (mainHeight - 30) + 'px'" v-show="isShow">
    <h1 class="title">WTeam - 后台管理系统</h1>
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
      };
    },
    mounted() {
      this.addListen();
    },
    methods: {
      addListen() {
        let main = document.querySelector(".main");
        this.mainHeight = main.offsetHeight;
        this.isShow = true;
        mainResizeListen.listenTo(main, () => {
          this.$nextTick(() => {
            this.mainHeight = main.offsetHeight;
          });
        });
      }
    },
    beforeDestroy() {
      let main = document.querySelector(".main");
      mainResizeListen.uninstall(main);
    }
  };
</script>

<style lang="scss">
  #home {
    -webkit-box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.3);
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.3);
    border-radius: 4px;
    background: url("../../assets/home.jpg") no-repeat center center;
    background-size: cover;

    .title {
      padding-top: 50px;
      color: beige;
      font-size: 50px;
      font-style: italic;
      text-align: center;
    }
  }
</style>

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
