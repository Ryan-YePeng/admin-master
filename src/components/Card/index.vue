<template>
  <div class="my-card hover-shadow">
    <div class="my-card__header clearfix" v-if="$slots.header || header">
      <slot name="header">{{ header }}</slot>
    </div>
    <div v-loading="isLoading" class="my-card__body" :style="bodyStyle">
      <slot></slot>
    </div>
  </div>
</template>

<script>
  export default {
    name: "Card",
    props: {
      header: {},
      bodyStyle: {}
    },
    data() {
      return {
        isLoading: false
      }
    },
    methods: {
      start() {
        this.isLoading = true
      },
      stop() {
        this.$nextTick(() => {
          this.isLoading = false
        })
      }
    }
  }
</script>

<style lang="scss">
  .my-card {
    width: 100%;
    border-radius: 4px;
    border: 1px solid #EBEEF5;
    background-color: #FFF;
    color: #303133;
    -webkit-transition: .3s;
    transition: .3s;

    &:focus, &:hover {
      -webkit-box-shadow: 0 2px 12px 0 rgba(0, 0, 0, .1);
      box-shadow: 0 2px 12px 0 rgba(0, 0, 0, .1)
    }

    .my-card__header {
      padding: 8px 10px;
      border-bottom: 1px solid #EBEEF5;
      -webkit-box-sizing: border-box;
      box-sizing: border-box
    }

    .my-card__body {
      padding: 10px;
    }

    .clearfix:before,
    .clearfix:after {
      display: table;
      content: "";
    }

    .clearfix:after {
      clear: both
    }
  }
</style>
