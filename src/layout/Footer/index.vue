<template>
  <div class="footer-box">
    <span v-show="isShowFooter">{{footerTxt}} - {{caseNumber}}</span>
    <el-backtop v-if="flag" target=".top"/>
  </div>
</template>

<script>
  import {caseNumber, footerTxt} from "@/settings";

  export default {
    name: "Footer",
    data() {
      return {
        flag: false
      }
    },
    computed: {
      isFixHeader() {
        return this.$storeGet.setting.isFixHeader
      },
      isShowFooter() {
        return this.$storeGet.setting.isShowFooter
      },
      footerTxt() {
        return footerTxt
      },
      caseNumber() {
        return caseNumber
      }
    },
    mounted() {
      this.fixHeader();
    },
    watch: {
      isFixHeader() {
        this.fixHeader()
      }
    },
    methods: {
      fixHeader() {
        let main = document.querySelector('.el-main');
        let container = document.querySelectorAll('.el-container')[1];
        if (this.isFixHeader) {
          container.classList.remove('top');
          main.style.overflow = 'auto';
          main.classList.add('top')
        } else {
          container.classList.add('top');
          main.style.overflow = 'visible';
          main.classList.remove('top')
        }
        this.flag = false;
        this.$nextTick(() => {
          this.flag = true
        })
      }
    }
  }
</script>

<style lang="scss">
  @import '../scss/index';

  .footer-box {
    > span {
      display: block;
      line-height: $footer-height !important;
      border-top: 1px solid #dcdfe6;
      color: #666;
      text-indent: 1rem;
      letter-spacing: 1px;
      font-size: 0.7rem;
    }
  }
</style>