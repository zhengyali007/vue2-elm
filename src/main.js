import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './router/router'
import store from './store/'
import {routerMode} from './config/env'
import './config/rem'
import FastClick from 'fastclick'

import Mint from 'mint-ui';
Vue.use(Mint);
import 'mint-ui/lib/style.css';

if ('addEventListener' in document) {
    document.addEventListener('DOMContentLoaded', function() {
        FastClick.attach(document.body);
    }, false);
}

function inArray(arr, item) {
  for (var i = 0; i < arr.length; i++) {
    if (arr[i] == item) {
      return true;
    }
  }
  return false;
};

function is_weixin(){
  var ua = navigator.userAgent.toLowerCase();
  if(ua.match(/MicroMessenger/i)=="micromessenger") {
    return true;
  } else {
    return false;
  }
}



Vue.use(VueRouter)
const router = new VueRouter({
	routes,
	mode: routerMode,
	strict: process.env.NODE_ENV !== 'production',
	scrollBehavior (to, from, savedPosition) {
	    if (savedPosition) {
		    return savedPosition
		} else {
			if (from.meta.keepAlive) {
				from.meta.savedPosition = document.body.scrollTop;
			}
		    return { x: 0, y: to.meta.savedPosition || 0 }
		}
	}
})

let baseUrl = "http://www.clutek.com"
let weiXinUrl=encodeURIComponent(baseUrl);

router.beforeEach((to, from, next) => {
  console.log(window.location.href)
  next();
  // window.location.href="https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxa2a065662559a875&redirect_uri="+ weiXinUrl +"%2fsmartPostBox%2fwx%2fverificationUser&response_type=code&scope=snsapi_base&state=STATE#wechat_redirect"
  console.log(window.location.href)
})

new Vue({
	router,
	store,
}).$mount('#app')

