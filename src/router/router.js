import App from '../App'
/***************postman页面*****************/
const test = r => require.ensure([],() => r(require('../page/postLogin/test')),'test')
//登录
const postLogin = r => require.ensure([],() => r(require('../page/postLogin/postLogin')),'postLogin')
//个人信息
const postProfile = r => require.ensure([],() => r(require('../page/postProfile/postProfile')),'postProfile')
//我管理的邮筒
const myMailBox = r => require.ensure([],() => r(require('../page/postMailBox/myMailBox')),'myMailBox')
//邮筒详情
const mailBoxDetail = r => require.ensure([],() => r(require('../page/postMailBox/mailBoxDetail')),'mailBoxDetail')
// 添加我的邮筒（邮筒绑定）
const addMailBox = r => require.ensure([],() => r(require('../page/postMailBox/addMailBox')),'addMailBox')
//考勤信息
const attendanceList = r => require.ensure([],() => r(require('../page/postAttendance/attendanceList')),'attendanceList')
//考勤详情
const attendanceDetails = r => require.ensure([],() => r(require('../page/postAttendance/attendanceDetails')),'attendanceDetails')

/******************************************/
export default [{
  path: '/',
  component: App, //顶层路由，对应index.html
  children: [ //二级路由。对应App.vue
    {
      path: '/test',
      component: test
    },
    {
      path: '/postLogin',
      component: postLogin
    },
    {
      path: '/postProfile',
      component: postProfile,
      meta: {
        login: true
      }
    },
    {
      path: '/myMailBox',
      component: myMailBox
    },
    {
      path: '/mailBoxDetail',
      component: mailBoxDetail
    },
    {
      path: '/attendanceList',
      component: attendanceList
    },
    {
      path: '/attendanceDetails',
      component: attendanceDetails
    },


    //地址为空时跳转home页面
    {
      path: '',
      redirect: '/test'
    },
  ]
}]
