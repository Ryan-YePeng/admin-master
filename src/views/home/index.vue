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

<!--<template>
  <div id="home">
    <Clipboard :text='token'>
      <el-button size="large">点击复制Token</el-button>
    </Clipboard>
  </div>
</template>

<script>
  import Clipboard from "@/components/Clipboard/index";

  export default {
    name: "Home",
    components: {Clipboard},
    computed: {
      token() {
        return this.$storeGet.token
      }
    }
  }
</script>-->

<!--<template>
  <div id="home">
    <el-button @click="fun">按钮</el-button>
    <el-button @click="reset">重置</el-button>
    <el-form :model="form" :rules="rules" ref="Form" label-width="80px">
      <el-form-item label="名称" prop="name">
        <tree-select v-model="form.name" :tree="tree" :normalizer="normalizer"/>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  import TreeSelect from '@/components/TreeSelect'
  import {resetForm} from "@/utils/common";

  export default {
    name: "Home",
    components: {TreeSelect},
    data() {
      return {
        normalizer(node) {
          return {
            label: node.name,
            isDisabled: !node.enabled
          }
        },
        tree: [{
          "id": 2,
          "name": "网维总部",
          "enabled": true,
          "pid": 0,
          "createTime": "2020-05-03T11:23:55.000+0000",
          "sort": 1,
          "isDelete": false,
          "children": [
            {
              "id": 5,
              "name": "前端分部",
              "enabled": false,
              "pid": 2,
              "createTime": "2020-05-30T01:00:36.000+0000",
              "sort": 1,
              "isDelete": false
            },
            {
              "id": 3,
              "name": "后台分部",
              "enabled": true,
              "pid": 2,
              "createTime": "2020-05-30T01:00:26.000+0000",
              "sort": 2,
              "isDelete": false
            },
            {
              "id": 4,
              "name": "UI分部",
              "enabled": true,
              "pid": 2,
              "createTime": "2020-05-30T01:00:31.000+0000",
              "sort": 3,
              "isDelete": false
            }
          ]
        }],
        form: {
          name: null
        },
        rules: {
          name: {required: true, message: '请选择职业名称', trigger: 'change'}
        }
      }
    },
    methods: {
      fun() {
        this.form = {
          name: 2
        }
      },
      reset() {
        resetForm(this)
      }
    }
  };
</script>-->
