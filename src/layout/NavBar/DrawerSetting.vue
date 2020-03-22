<template>
  <scroll-pane>
    <div class="drawer-setting">
      <div>
        <h1 class="drawer-title">系统布局设置</h1>
        <div class="drawer-item">
          <span>显示Logo</span>
          <el-switch v-model="isShowLogo" class="drawer-switch"/>
        </div>
        <div class="drawer-item">
          <span>显示标签页</span>
          <el-switch v-model="isShowTag" class="drawer-switch"/>
        </div>
        <div class="drawer-item">
          <span>显示面包屑</span>
          <el-switch v-model="isShowBreadcrumb" class="drawer-switch"/>
        </div>
        <div class="drawer-item">
          <span>显示底部</span>
          <el-switch v-model="isShowFooter" class="drawer-switch"/>
        </div>
        <h1 class="drawer-title">菜单风格设置</h1>
        <div class="drawer-item">
          <span>夜间模式</span>
          <el-switch v-model="isNight" class="drawer-switch"/>
        </div>
        <div class="drawer-item">
          <span>垂直模式</span>
          <el-switch v-model="isVertical" class="drawer-switch"/>
        </div>
        <div class="drawer-item">
          <span>唯一展开</span>
          <el-switch v-model="isUniqueOpened" class="drawer-switch"/>
        </div>
        <h1 class="drawer-title">样式大小设置</h1>
        <div class="drawer-item">
          <el-radio-group v-model="layoutSize">
            <el-radio label="default">较大</el-radio>
            <el-radio label="medium">中等</el-radio>
            <el-radio label="small">较小</el-radio>
            <el-radio label="mini">迷你</el-radio>
          </el-radio-group>
        </div>
        <h1 class="drawer-title">分页大小设置</h1>
        <div class="drawer-item paging-size">
          <el-radio-group v-model="pagingSize">
            <el-radio :label="10"></el-radio>
            <el-radio :label="20"></el-radio>
            <el-radio :label="50"></el-radio>
            <el-radio :label="100"></el-radio>
            <el-radio :label="200"></el-radio>
          </el-radio-group>
        </div>
      </div>
      <el-button type="success" class="restoreButton" @click="restoreSetting">恢 复 系 统 默 认 设 置</el-button>
    </div>
  </scroll-pane>
</template>

<script>
  import ScrollPane from '../ScrollPane'

  export default {
    name: "DrawerSetting",
    components: {ScrollPane},
    computed: {
      isShowLogo: {
        get() {
          return this.$store.getters.setting.isShowLogo;
        },
        set(value) {
          this.$store.dispatch('changeSetting', {
            key: 'isShowLogo',
            value: value
          })
        }
      },
      isShowTag: {
        get() {
          return this.$store.getters.setting.isShowTag;
        },
        set(value) {
          this.$store.dispatch('changeSetting', {
            key: 'isShowTag',
            value: value
          })
        }
      },
      isShowBreadcrumb: {
        get() {
          return this.$store.getters.setting.isShowBreadcrumb;
        },
        set(value) {
          this.$store.dispatch('changeSetting', {
            key: 'isShowBreadcrumb',
            value: value
          })
        }
      },
      isShowFooter: {
        get() {
          return this.$store.getters.setting.isShowFooter;
        },
        set(value) {
          this.$store.dispatch('changeSetting', {
            key: 'isShowFooter',
            value: value
          })
        }
      },
      isNight: {
        get() {
          return this.$store.getters.setting.isNight;
        },
        set(value) {
          this.$store.dispatch('changeSetting', {
            key: 'isNight',
            value: value
          })
        }
      },
      isVertical: {
        get() {
          return this.$store.getters.setting.isVertical;
        },
        set(value) {
          this.$store.dispatch('changeSetting', {
            key: 'isVertical',
            value: value
          })
        }
      },
      isUniqueOpened: {
        get() {
          return this.$store.getters.setting.isUniqueOpened;
        },
        set(value) {
          this.$store.dispatch('changeSetting', {
            key: 'isUniqueOpened',
            value: value
          })
        }
      },
      layoutSize: {
        get() {
          return this.$store.getters.setting.layoutSize;
        },
        set(value) {
          this.$store.dispatch('changeSetting', {
            key: 'layoutSize',
            value: value
          })
        }
      },
      pagingSize: {
        get() {
          return this.$store.getters.setting.pagingSize;
        },
        set(value) {
          this.$store.dispatch('changeSetting', {
            key: 'pagingSize',
            value: value
          })
        }
      }
    },
    methods: {
      restoreSetting() {
        this.$store.dispatch('restoreSetting')
      }
    }
  }
</script>

<style lang="scss">
  .drawer-setting {
    position: relative;
    padding: 10px 24px 24px 24px;
    font-size: 14px;
    font-weight: 600;
    line-height: 1.5;
    word-wrap: break-word;

    .drawer-title {
      margin: 12px 0 12px 0;
      color: rgba(0, 0, 0, .85);
      font-size: 20px;
      font-weight: 600;
      line-height: 22px;
    }

    .drawer-item {
      color: rgba(0, 0, 0, .65);
      font-size: 14px;
      padding: 12px 0;
    }

    .drawer-switch {
      float: right
    }

    .paging-size {
      .el-radio {
        margin-right: 16px;
      }
    }

    .restoreButton {
      margin-top: 12px;
      width: 100%;
      font-size: 14px;
      font-weight: 600;
    }
  }
</style>
