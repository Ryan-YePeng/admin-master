<template>
  <div :class="{'show':show}" class="header-search">
    <svg-icon class-name="search-icon" icon-class="search" @click.stop="click"/>
    <el-select
            ref="headerSearchSelect"
            v-model="search"
            :remote-method="querySearch"
            filterable
            default-first-option
            remote
            placeholder="Search"
            class="header-search-select"
            @change="change"
    >
      <el-option v-for="item in options" :key="item.item.path" :value="item.item" :label="item.item.title.join(' > ')"/>
    </el-select>
  </div>
</template>

<script>
  import Fuse from 'fuse.js'
  import path from 'path'

  export default {
    name: 'HeaderSearch',
    data() {
      return {
        search: '',
        options: [],
        searchPool: [],
        show: false,
        fuse: undefined
      }
    },
    computed: {
      routes() {
        return this.$storeGet.menu
      }
    },
    watch: {
      routes() {
        this.searchPool = this.generateRoutes(this.routes)
      },
      searchPool(list) {
        this.initFuse(list)
      },
      show(value) {
        if (value) {
          document.body.addEventListener('click', this.close)
        } else {
          document.body.removeEventListener('click', this.close)
        }
      }
    },
    mounted() {
      this.searchPool = this.generateRoutes(this.routes);
      console.log(this.searchPool)
    },
    methods: {
      click() {
        this.show = !this.show;
        if (this.show) {
          this.$refs.headerSearchSelect && this.$refs.headerSearchSelect.focus()
        }
      },
      close() {
        this.$refs.headerSearchSelect && this.$refs.headerSearchSelect.blur();
        this.options = [];
        this.show = false
      },
      change(val) {
        this.$router.push(val.path);
        this.search = '';
        this.options = [];
        this.$nextTick(() => {
          this.show = false
        })
      },
      initFuse(list) {
        this.fuse = new Fuse(list, {
          shouldSort: true,
          threshold: 0.4,
          location: 0,
          distance: 100,
          maxPatternLength: 32,
          minMatchCharLength: 1,
          keys: [{
            name: 'title',
            weight: 0.7
          }, {
            name: 'path',
            weight: 0.3
          }]
        })
      },
      generateRoutes(routes, prefixTitle = []) {
        console.log(routes)
        let res = [];

        for (const router of routes) {
          // skip hidden router
          if (router.hidden) {
            continue
          }

          const data = {
            path: router.name,
            title: [...prefixTitle]
          };

          // recursive child routes
          if (router.children) {
            const tempRoutes = this.generateRoutes(router.children, data.title);
            if (tempRoutes.length >= 1) {
              res = [...res, ...tempRoutes]
            }
          }
        }
        return res
      },
      querySearch(query) {
        if (query !== '') {
          this.options = this.fuse.search(query);
          console.log(this.options)
        } else {
          this.options = []
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  .header-search {
    font-size: 0 !important;

    .search-icon {
      cursor: pointer;
      font-size: 18px;
      vertical-align: middle;
    }

    .header-search-select {
      font-size: 18px;
      transition: width 0.2s;
      width: 0;
      overflow: hidden;
      background: transparent;
      border-radius: 0;
      display: inline-block;
      vertical-align: middle;

      .el-input__inner {
        border-radius: 0;
        border: 0;
        padding-left: 0;
        padding-right: 0;
        box-shadow: none !important;
        border-bottom: 1px solid #d9d9d9;
        vertical-align: middle;
      }
    }

    &.show {
      .header-search-select {
        width: 210px;
        margin-left: 10px;
      }
    }
  }
</style>
