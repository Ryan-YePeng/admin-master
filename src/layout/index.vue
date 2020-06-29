<template>
  <el-container id="layout">
    <!-- 左侧菜单 -->
    <admin-menu v-if="isVertical" v-show="!isSmall"/>
    <!-- 抽屉菜单 -->
    <el-drawer
        v-if="isVertical"
        :class="[isNight ? 'night-drawer-menu' : 'light-drawer-menu']"
        :destroy-on-close="true"
        :visible.sync="isDrawer"
        direction="ltr"
        :with-header="false">
      <admin-menu/>
    </el-drawer>
    <el-container>
      <!-- 顶部菜单 -->
      <admin-menu v-if="!isVertical"/>
      <!-- 头部 -->
      <el-header class="header">
        <div>
          <!-- 面包屑…… -->
          <breadcrumb/>
          <!-- 设置…… -->
          <nav-bar/>
        </div>
        <!-- 标签页 -->
        <tag/>
      </el-header>
      <!-- 内容 -->
      <admin-main/>
      <!-- 底部 -->
      <admin-footer/>
      <!-- 返回顶部 -->
      <el-backtop target=".main"/>
    </el-container>
  </el-container>
</template>

<script>
  import AdminFooter from './Footer'
  import Breadcrumb from './Breadcrumb'
  import AdminMenu from './Menu'
  import AdminMain from './Main'
  import NavBar from './NavBar'
  import Tag from './Tag'

  export default {
    name: 'Layout',
    components: {AdminFooter, AdminMain, NavBar, AdminMenu, Breadcrumb, Tag},
    computed: {
      isDrawer: {
        get() {
          return this.$storeGet.isDrawer;
        },
        set(value) {
          this.$storeSet('setDrawer', value);
        }
      },
      isSmall() {
        return this.$storeGet.isSmall
      },
      isVertical() {
        return this.$storeGet.setting.isVertical
      },
      isNight() {
        return this.$storeGet.setting.isNight
      }
    },
    mounted() {
      this.initialListener();
      this.getWindowWidth();
    },
    methods: {
      // 事件监听
      initialListener() {
        window.addEventListener('resize', () => {
          this.getWindowWidth()
        })
      },
      // 获取屏幕宽度
      getWindowWidth() {
        if (window.innerWidth < 992) {
          this.$storeSet('setSmall', true);
          this.$storeSet('setCollapsed', true);
        } else {
          this.$storeSet('setSmall', false);
          this.$storeSet('setDrawer', false);
        }
      }
    }
  };
</script>

<style lang="scss">
  @import './scss/index';

  #layout {
    width: 100%;
    height: 100%;

    .night-drawer-menu,
    .light-drawer-menu {
      .el-drawer__body {
        height: 0;
      }

      .el-drawer {
        width: $menu-width !important;
      }
    }

    .night-drawer-menu {
      .el-drawer {
        background-color: $night-menu-bg-color
      }
    }

    .light-drawer-menu {
      .el-drawer {
        background-color: $light-menu-bg-color
      }
    }

    .header {
      height: auto !important;
      padding: 0;

      & > div:first-child {
        display: flex;
        justify-content: space-between;
        padding: 0 20px;
        border-bottom: 1px solid rgb(233, 235, 239);
      }
    }
  }
</style>
