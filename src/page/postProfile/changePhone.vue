<template>
  <div id="change-phone">
    <section class="change-title">修改手机号</section>
    <mt-cell title="旧手机号：">
      <input type="text" placeholder="请输入旧手机号码" v-model="oldPhone"/>
    </mt-cell>
    <mt-cell title="验证码：">
      <input class="code-input" type="text" placeholder="请输入验证码" v-model="code"/>
      <button class="get-code" v-show="codeShow" @click="getCode">获取验证码</button>
      <button class="timer" v-show="!codeShow">{{count}} s</button>
    </mt-cell>
    <mt-cell title="新手机号：">
      <input type="text" placeholder="请输入新手机号码" v-model="newPhone"/>
    </mt-cell>
    <button class="save-phone" @click="savePhone">保存</button>
  </div>
</template>

<script>
  import {Cell,Toast} from 'mint-ui';
  import {getAuthCode,updateMobile} from "../../service/getData";

  export default {
    components: {Cell,Toast},
    data() {
      return {
        count: '',
        codeShow: true, // 获取验证码
        timer: null,
        oldPhone: '',
        code: '',
        newPhone: '',
      }
    },
    mounted() {},
    methods: {
      async getCode() {
        try {
          let response = await getAuthCode(this.oldPhone);
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
            Toast({
              message: response.msg,
              position: 'middle',
              duration: 2000
            });
          }
        }catch(error){
          console.log(error)
        }
      },
      async savePhone() {
        var res = await updateMobile(this.newPhone,this.code)
        console.log(res)
        Toast({
          message: res.msg,
          position: 'middle',
          duration: 2000
        })
        this.$router.push({path: '/postProfile'})
      }
    },
  }
</script>

<style scoped lang="scss">
  @import '../../style/mixin';

  * {
    outline: none;
    border: none;
    padding: 0px;
    margin: 0px ;
    font-size: 14px;
    color: #333;
  }

  .change-title {
    position: relative;
    background-color: #f3f3f3;
    color: #007aff;
    text-align: center;
    height: 40px;
    line-height: 30px;
    padding-top: 5px;
    font-size: 16px;
  }

  .code-input {
    position: relative;
    width:100px;
    left:20%;
  }

  .get-code {
    position: relative;
    outline: none;
    border: none;
    background-color: #fff;
    color: #007aff;
    width: 80px;
  }

  .save-phone {
    position: relative;
    outline: none;
    border: none;
    background-color: #007aff;
    color: #fff;
    width: 80%;
    height: 30px;
    margin-left: 10%;
    margin-top: 30px;
    border-radius: 5px;
  }

  .timer {
    position: relative;
    border:none;
    outline: none;
    background-color: #fff;
    color: #555555;
    width: 80px;
    /*right: 18px;*/
  }


</style>
