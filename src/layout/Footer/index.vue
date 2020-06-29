<template>
  <div class="footer-text" v-show="isShowFooter">
    <span>{{footerTxt}} - {{caseNumber}}</span>
  </div>
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

  .footer-text {
    line-height: $footer-height !important;
    border-top: 1px solid #dcdfe6;
    color: #666;
    text-indent: 1rem;
    letter-spacing: 1px;
    font-size: 0.7rem;
  }
</style>