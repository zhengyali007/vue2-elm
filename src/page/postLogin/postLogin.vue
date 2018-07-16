<template>
  <div id="login">
    <section class="header-img">
      <img src="../../images/postTest3.png"/>
    </section>
    <div class="login-form">
      <section class="phone-info">
        <!--<label class="form-label">手机号：</label>-->
        <img class="form-img" src="../../images/postPhone.png"/>
        <input class="form-input" type="text" placeholder="请输入手机号"/>
      </section>
      <hr>
      <section class="code-info">
        <img class="form-img" src="../../images/postCode.png"/>
        <input class="form-input" style="width: 100px;" type="text" placeholder="请输入验证码"/>
        <button class="get-code" v-show="codeShow" @click="getCode" >获取验证码</button>
        <button class="timer" v-show="!codeShow">{{count}} s</button>
      </section>
      <hr style="width: 56%; left: -11%;top:10px">
    </div>
    <div class="btn-container">
      <button class="login-btn" @click="bind">绑定</button>
    </div>
  </div>
</template>

<script>
  export default {
    components: {},
    data() {
      return {
        count: '',
        codeShow: true, // 获取验证码
        timer: null
      }
    },
    mounted() {},
    methods: {
    //  获取验证码
      getCode () {
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
      },
    //  绑定
      bind () {
        this.$router.push({path: '/postProfile'})
      },
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
