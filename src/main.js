import Vue from "vue";
import router from "./router"; // 路由
import store from "./store"; // vuex
import "./styles/init.css"; // 样式初始化
import "./styles/global.css"; // 全局样式
import './utils/EUI'; // element-ui
import EVueContextmenu from 'e-vue-contextmenu'; // 右键菜单
import vuescroll from 'vuescroll'; // 滚动条
import './utils/directive'; // 自定义指令
import './utils/filter'; // 过滤
import '@riophae/vue-treeselect/dist/vue-treeselect.css'; // 树状选择器
import './assets/icons'; // svg
import App from "./App.vue";

Vue.use(vuescroll);
Vue.use(EVueContextmenu);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
