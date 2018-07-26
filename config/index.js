// see http://vuejs-templates.github.io/webpack for documentation.
var path = require('path')

module.exports = {
    build: {
        env: {
            NODE_ENV: '"production"'
        },
        index: path.resolve(__dirname, '../elm/index.html'),
        assetsRoot: path.resolve(__dirname, '../elm'),
        assetsSubDirectory: 'static',
        assetsPublicPath: '/elm/',
        productionSourceMap: true,
        // Surge or Netlify already gzip all static assets for you.
        // Before setting to `true`, make sure to:
        // npm install --save-dev compression-webpack-plugin
        productionGzip: false,
        productionGzipExtensions: ['js', 'css'],
        proxypath: 'http://www.clutek.com', //服务端地址
        frontpath: 'http://postwx.clutek.com',//前端地址
        // frontpath: 'http://192.168.1.8:8000',//前端地址
      // imagepath: 'http://osscdn.futurecommunity.cn',  //图片地址
        loginUrl:'/#/postLogin', //登录页地址
        forbiddenUrl:'/#/postForbidden', //没有权限
        wxappid:'wxa2a065662559a875', //微信appid
        serverName:'smartPostBox/a',
        filterUrl:[],
        ordinaryUserWhiteList:[],
    },
    dev: {
        env: {
            NODE_ENV: '"development"'
        },
        port: 8000,
        assetsSubDirectory: 'static',
        assetsPublicPath: '/',
        context: [ //代理路径
            '/shopping',
            '/ugc',
            '/v1',
            '/v2',
            '/v3',
            '/v4',
            '/bos',
            '/member',
            '/promotion',
            '/eus',
            '/payapi',
            '/img',
        ],
        proxypath: 'http://www.clutek.com',
        // CSS Sourcemaps off by default because relative paths are "buggy"
        // with this option, according to the CSS-Loader README
        // (https://github.com/webpack/css-loader#sourcemaps)
        // In our experience, they generally work as expected,
        // just be aware of this issue when enabling this option.
        cssSourceMap: false
    }
}
