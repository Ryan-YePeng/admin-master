<template>
  <transition name="Ryan-animation" mode="out-in">
    <keep-alive :include="cache">
      <router-view :key="key"/>
    </keep-alive>
  </transition>
</template>

<script>
  export default {
    name: "Main",
    computed: {
      key() {
        return this.$route.name
      },
      cache() {
        return this.$storeGet.cache
      }
    }
  }
</script>

<style lang="scss">
  @import '../scss/index';

  .Ryan-animation-enter-active {
    transition: all .3s;
  }

  .Ryan-animation-leave-active {
    transition: all .3s;
  }

  .Ryan-animation-enter {
    opacity: 0;
  }

  .Ryan-animation-leave-to {
    opacity: 0;
  }
</style>