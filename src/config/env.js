/**
 * 配置编译环境和线上环境之间的切换
 *
 * baseUrl: 域名地址
 * routerMode: 路由模式
 * imgBaseUrl: 图片所在域名地址
 *
 */

var config = require('../../config')
let baseUrl;
let routerMode;
let loginUrl;
let forbiddenUrl;
const wxAppid = config.build.wxappid;
const appServerName = config.build.serverName;
const appFilterUrl = config.build.filterUrl;
const appOrdinaryUserWhiteList = config.build.ordinaryUserWhiteList;
// const imgBaseUrl = config.build.imagepath;

if (process.env.NODE_ENV == 'development') {
  baseUrl = config.dev.proxypath,
    routerMode = 'hash'
}else{
  baseUrl = config.build.proxypath,
    routerMode = 'hash'
}

loginUrl =  config.build.frontpath + config.build.loginUrl;
forbiddenUrl =  config.build.frontpath + config.build.forbiddenUrl;

export {
	baseUrl,
	routerMode,
  wxAppid,
  appServerName,
  appFilterUrl,
  appOrdinaryUserWhiteList,
  loginUrl,
  forbiddenUrl
	// imgBaseUrl,
}
