import Vue from 'vue'
import Router from 'vue-router'
import {isHistory} from "@/settings";

Vue.use(Router);

// 解决跳转到同一路径报错
const originalPush = Router.prototype.push;
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(error => error)
};

const constantRouterMap = [
  {
    name: 'error404',
    path: '/404',
    meta: {title: '404'},
    component: (resolve) => require(['@/views/error/error404'], resolve)
  },
  {
    name: 'login',
    path: '/login',
    meta: {title: '登录'},
    component: (resolve) => require(['@/views/login'], resolve)
  }
];

export default new Router({
  mode: isHistory ? "history" : "hash",
  routes: constantRouterMap
})
