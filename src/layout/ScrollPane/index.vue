<template>
  <vue-scroll
      ref="VueScroll"
      class="scroll-pane"
      @handle-scroll="handleScroll"
      :ops="ops"
      :style="'width:' + scrollWidth + ';height:' + scrollHeight">
    <slot/>
    <div class="go-back-top" v-if="isUseGoBackTop">
      <transition name="el-fade-in">
        <div class="page-up" v-show="isShowTopPane">
          <i class="el-icon-caret-top" @click="goBackTop"></i>
        </div>
      </transition>
    </div>
  </vue-scroll>
</template>

<script>
  export default {
    name: "ScrollPane",
    props: {
      hasX: {
        type: Boolean,
        default: false
      },
      hasY: {
        type: Boolean,
        default: true
      },
      scrollWidth: {
        type: String,
        default: '100%'
      },
      scrollHeight: {
        type: String,
        default: '100%'
      },
      isUseGoBackTop: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        isShowTopPane: false,
        ops: {
          vuescroll: {
            wheelScrollDuration: 300
          },
          scrollPanel: {
            scrollingX: this.hasX,
            scrollingY: this.hasY,
            speed: 800
          },
          bar: {
            onlyShowBarOnScroll: false,
            background: '#C1C1C1',
          },
          rail: {
            onlyShowBarOnScroll: false,
            background: '#C1C1C1',
          }
        }
      }
    },
    watch: {
      // 切换组件时回到顶部
      '$route.path'() {
        let VueScroll = this.$refs.VueScroll;
        if (this.isUseGoBackTop && VueScroll.getPosition().scrollTop !== 0) {
          VueScroll.scrollTo({y: 0}, 0)
        }
      }
    },
    methods: {
      handleScroll(vertical) {
        let scrollTop = vertical.scrollTop;
        this.isShowTopPane = scrollTop > 80;
      },
      goBackTop() {
        this.$refs.VueScroll.scrollTo({y: 0}, 500, "easeInOutQuad")
      }
    }
  }
</script>

<style lang="scss">
  @import '../scss/index';

  .scroll-pane {
    .__bar-is-vertical:hover, .__bar-is-horizontal:hover {
      background: #A8A8A8 !important;
    }
  }

  .margin-right-10 {
    margin-right: 10px;
  }
</style>
