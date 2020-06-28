<template>
  <el-footer class="admin-footer" v-show="isShowFooter">
    <div class="footer-text">
      <span>{{footerTxt}} - {{caseNumber}}</span>
    </div>
  </el-footer>
</template>

<script>
  import {caseNumber, footerTxt} from "@/settings";

  export default {
    name: "Footer",
    computed: {
      isShowFooter() {
        return this.$storeGet.setting.isShowFooter
      },
      footerTxt() {
        return footerTxt
      },
      caseNumber() {
        return caseNumber
      }
    }
  }
</script>

<style lang="scss">
  @import '../scss/index';

  .admin-footer {
    padding: 0;
    height: $footer-height !important;
    overflow-y: hidden;
    overflow-x: auto;
    background-color: $footer-bg-color;

    .footer-text {
      position: relative;
      line-height: 30px;
      border-top: 1px solid #dcdfe6;
      color: #666;
      white-space: nowrap;
      text-indent: 1.3rem;
      letter-spacing: 1px;
      font-size: 0.7rem;
    }
  }
</style>