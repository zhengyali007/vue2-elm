import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './router/router'
import store from './store/'
import {routerMode} from './config/env'
import './config/rem'
import FastClick from 'fastclick'
import {appid, weiXinUrl, serverName, filterUrl, ordinaryUserWhiteList} from 'src/service/getData'

import Mint from 'mint-ui';

Vue.use(Mint);
import 'mint-ui/lib/style.css';

if ('addEventListener' in document) {
  document.addEventListener('DOMContentLoaded', function () {
    FastClick.attach(document.body);
  }, false);
}


Vue.use(VueRouter)
const router = new VueRouter({
  routes,
  mode: routerMode,
  strict: process.env.NODE_ENV !== 'production',
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      if (from.meta.keepAlive) {
        from.meta.savedPosition = document.body.scrollTop;
      }
      return {x: 0, y: to.meta.savedPosition || 0}
    }
  }
})


router.beforeEach((to, from, next) => {
  // console.log(window.location.href)
  // next();
  //全局拦截器的
  if (to.meta.login) {  // 判断该路由是否需要登录权限
    if (localStorage.getItem('token')) {  // 判断是否有token
      next();
    }else {
      localStorage.setItem('lastUrl', to.fullPath)
      next({
        path: '/postLogin',
      })
    }
  }
  else {
    next();
  }

})

new Vue({
  router,
  store,
}).$mount('#app')

