<template>
  <div id="login">
    <section class="header-img">
      <img src="../../images/postTest3.png"/>
    </section>
    <div class="login-form">
      <section class="phone-info">
        <!--<label class="form-label">手机号：</label>-->
        <img class="form-img" src="../../images/postPhone.png"/>
        <input class="form-input" v-model="phoneNumber" type="text" placeholder="请输入手机号"/>
      </section>
      <hr>
      <section class="code-info">
        <img class="form-img" src="../../images/postCode.png"/>
        <input class="form-input" style="width: 100px;" type="text" placeholder="请输入验证码" v-model="code"/>
        <button class="get-code" v-show="codeShow" @click="getCode" >获取验证码</button>
        <button class="timer" v-show="!codeShow">{{count}} s</button>
      </section>
      <hr style="width: 56%; left: -11%;top:10px">
    </div>
    <div class="btn-container">
      <button class="login-btn" @click="bind">绑定</button>
    </div>
    <alert-tip v-if="showAlert" :showHide="showAlert" @closeTip="closeTip" @closeSur="closeSure" :alertText="alertText"></alert-tip>
  </div>
</template>

<script>
  import {appid,weiXinUrl,serverName} from 'src/service/getData'
  import alertTip from 'src/components/common/alertTip'
  import {getAuthCode, bindingUser} from "../../service/getData";

  export default {
    components: {alertTip},
    data() {
      return {
        showAlert:false,
        count: '',
        codeShow: true, // 获取验证码
        timer: null,
        lastUrl: '',
        phoneNumber: '18119606121',
        code: '123456',
        openid: '',
      }
    },
    mounted() {
      this.redirected()
    },
    methods: {
    //  判断用户的绑定状态
      redirected() {
        console.log(222)
        // document.cookie = 'token=221212fsfsfafas'
        // console.log(document.cookie)
        if (this.$route.query.token){
          // $.cookie("token","this.$route.query.token")
          // 返回token直接登录跳转至页面
          localStorage.setItem('token','111111')
          // document.cookie = "token=" +this.$route.query.token
          console.log(12327,this.$route.query.token)
          this.lastUrl = localStorage.getItem('lastUrl')
          localStorage.removeItem('lastUrl')
          this.$router.push({path: this.lastUrl})
        }else if(!this.$route.query.openid){
          //路由上没有openid，跳转到后端方法获取openid
          window.location.href="https://open.weixin.qq.com/connect/oauth2/authorize?appid="+ appid +"&redirect_uri="+ weiXinUrl +"%2f"+ serverName+"%2fwx%2fverificationUser&response_type=code&scope=snsapi_base&state=STATE#wechat_redirect"
        }else {
          console.log(this.$route.query.openid)
          this.openid = this.$route.query.openid
        //  路由上有openid，并且用户还未绑定，将进行绑定
        //   this.bind()
        }
      },
    //  获取验证码
      async getCode () {
        let url = 'http://www.clutek.com/smartPostBox/a/wx/smsCode';
        let formData = new FormData();
        formData.append('phone','18119606121')
        formData.append('token','test')
        fetch(url, {
          method: 'POST',
          headers: new Headers({
            'Content-Type': 'application/x-www-form-urlencoded' // 指定提交方式为表单提交
          }),
          body: formData,
      })
          .then((res)=>{
            console.log(res)
            return res.text()
          })
          .then((res)=>{
            console.log(res)
          })
        /*try {
          document.cookie = "token=3423423";
          let response = await getAuthCode(this.phoneNumber);
          console.log('response:',response);
          if (response.errorCode==200) {
            if (!this.timer) {
              this.count = 60;
              this.codeShow = false;
              var self = this;
              this.timer = setInterval(() => {
                if (self.count > 0 && self.count <= 60) {
                  self.count--;
                } else {
                  self.codeShow = true;
                  clearInterval(self.timer);
                  self.timer = null;
                }
              }, 1000)
            }
          }else if(response.errorCode==402){
            // console.log(response.msg)
              this.showAlert = true;
              this.alertText = response.msg;
          }
        }catch(error){
          console.log(error)
        }*/
      },
    //  绑定
     async bind () {
       try {
         let response = await bindingUser(this.phoneNumber,this.code,this.openid);
         console.log('response2:',response);
         if (response.errorCode==200) {
           window.location.href="https://open.weixin.qq.com/connect/oauth2/authorize?appid="+ appid +"&redirect_uri="+ weiXinUrl +"%2f"+ serverName+"%2fwx%2fverificationUser&response_type=code&scope=snsapi_base&state=STATE#wechat_redirect"
           console.log('success')
         }else if(response.errorCode==402){
           // console.log(response.msg)
           this.showAlert = true;
           this.alertText = response.msg;
         }
       }catch(error){
         console.log(error)
       }

       // this.$router.push({path: '/postProfile'})
      },
      //弹框处理？
      closeTip(){
        this.showAlert = false;
      },
      closeSure(){
        this.showAlert = false;
      }
    },
  }
</script>

<style scoped lang="scss">
  @import '../../style/mixin';

  #login {
    position: absolute;
    width: 100%;
    height: 100%;
    background: #ffffff;
    font-size: 16px;
    color: #666;
  }

  input {
    outline: none;
    border: none;
  }

  hr {
    position: relative;
    width: 80%;
    background-color: #999;
    border: none;
    height: 1px;
    margin-top: 5px;
    margin-bottom: 20px;
  }

  .header-img {
    position: relative;
    height: 100px;
    top: 15%;
    text-align: center;
  }

  .header-img img {
    position: relative;
    /*border-radius: 50%;*/
    width: 100px;
    height: 100px;
  }

  .login-form {
    position: relative;
    top: 20%;
    /*text-align: center;*/
    /*background-color: #fff;*/
    width: 80%;
    margin-left: 10%;
    padding: 10px 0;
  }

  .form-img {
    position: relative;
    height: 30px;
    line-height: 30px;
    vertical-align: middle;
    left: 10%;
  }

  .form-input {
    position: relative;
    /*background-color: #007aff;*/
    /*width: 300px;*/
    left: 15%;
    height: 30px;
    line-height: 30px;
    vertical-align: middle;
    font-size: 15px;
  }

  .form-input::-webkit-input-placeholder {
    /*color:#00f;*/
  }

  .code-info {
    position: relative;
    top: 10px;
  }

  .get-code {
    position: relative;
    left: 25%;
    height: 28px;
    line-height: 28px;
    font-size: 12px;
    padding: 0 5px;
    background-color: #007aff;
    color: #fff;
    border: none;
    outline: none;
    border-radius: 5px;
  }

  .timer {
    position: relative;
    left: 25%;
    height: 28px;
    line-height: 28px;
    font-size: 12px;
    padding: 0 5px;
    background-color: gray;
    color: #fff;
    border: none;
    outline: none;
    border-radius: 5px;
  }

  .btn-container {
    /*background-color: #007aff;*/
    position: relative;
    top: 23%;
    text-align: center;
    height: 30px;
  }

  .login-btn {
    outline: none;
    border: none;
    height: 30px;
    line-height: 30px;
    width: 70%;
    background-color: #007aff;
    border-radius: 5px;
    color: #fff;
    font-size: 18px;
  }

  /*.count {*/
    /*background-color: #555555;*/
  /*}*/


</style>
