import router from './routers';
import store from '@/store';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
import {getMenuApi} from '@/api/system/menu';
import {getUserInfoApi} from '@/api/person';
import {startLoading, stopLoading} from '@/utils/EUI';
import {title} from '@/settings';
import {TraverseTree} from './TraverseTree';

NProgress.configure({showSpinner: false});

let layout = {
  name: 'layout',
  path: '/layout',
  redirect: "/home",
  component: (resolve) => require(['@/layout'], resolve),
  children: [
    {
      name: 'home',
      path: '/home',
      meta: {title: '首页'},
      component: (resolve) => require(['@/views/home'], resolve)
    },
    {
      name: 'person',
      path: '/person',
      meta: {title: '个人中心'},
      component: (resolve) => require(['@/views/person'], resolve)
    },
    {
      name: 'error403',
      path: '/403',
      meta: {title: '403'},
      component: (resolve) => require(['@/views/error/error403'], resolve)
    },
    {
      name: 'redirect',
      path: '/redirect',
      meta: {title: ""},
      component: (resolve) => require(['@/views/redirect'], resolve)
    }
  ]
};

// 动态路由
export function generateRouter() {
  return new Promise((resolve, reject) => {
    startLoading()
    getUserInfoApi().then(result => {
      const {user, roles} = result.resultParam.currentUser
      store.dispatch('setUser', user)
      store.dispatch('setRoles', roles)
    });
    getMenuApi()
      .then(result => {
        const menu = result.resultParam.content;
        let tree = new TraverseTree(menu, layout)
        store.dispatch('setMenu', menu);
        store.dispatch('setSearchMenu', tree.getList());
        store.dispatch('setHasGenerateRouter');
        router.addRoutes([tree.getLayout()]);
        router.addRoutes([{path: "*", redirect: "/404"}]);
        stopLoading()
        resolve()
      })
      .catch(() => {
        stopLoading()
        reject()
      })
  })
}

// 路由守卫
router.beforeEach((to, from, next) => {
  NProgress.start();
  if (to.meta.title) {
    document.title = to.meta.title + ' - ' + title
  }
  let isLogin = store.getters.token;
  if (to.path === "/") {
    isLogin
      ? next('/home')
      : next('/login');
    return
  }
  if (to.path === "/login") {
    next();
    return;
  }
  if (!isLogin) {
    next('/login');
    return;
  }
  // if (
  //   process.env.NODE_ENV === 'production'
  //   && (to.path === "/system/menu" || to.path === "/system/role")
  // ) {
  //   next('/404');
  //   return
  // }
  if (store.getters.hasGenerateRouter) {
    next()
  } else {
    generateRouter();
    next()
  }
});

router.afterEach(() => {
  NProgress.done()
});

export default router
