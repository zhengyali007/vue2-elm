<template>
  <div id="change-phone">
    <head-top go-back="true" head-title="修改手机号" style="position: relative"></head-top>
    <div class="cell">
      <label class="cell-label">旧手机号：</label>
      <input type="number" class="cell-input" placeholder="请输入旧手机号码" v-model="oldPhone"/>
    </div>
    <div class="cell">
      <label class="cell-label">验证码：</label>
      <input class="cell-input" type="number" placeholder="请输入验证码" v-model="code" style="width: 40%;"/>
      <button class="get-code" v-show="codeShow" @click="getCode">获取验证码</button>
      <button class="timer" v-show="!codeShow">{{count}} s</button>
    </div>
    <div class="cell">
      <label class="cell-label">新手机号：</label>
      <input class="cell-input" type="number" placeholder="请输入新手机号码" v-model="newPhone"/>
    </div>

    <button class="save-phone" @click="savePhone">保存</button>
  </div>
</template>

<script>
  import {Cell, Toast} from 'mint-ui';
  import {getAuthCode, updateMobile} from "../../service/getData";
  import headTop from 'src/components/header/head'

  export default {
    components: {Cell, Toast, headTop},
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
    mounted() {
    },
    methods: {
      async getCode() {
        if(this.oldPhone === ''){
          Toast({
            message: '请输入旧号码',
            position: 'middle',
            duration: 2000
          })
        }else {
          try {
            let response = await getAuthCode(this.oldPhone);
            console.log('response:', response);
            if (response.errorCode == 200) {
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
            } else if (response.errorCode == 402) {
              Toast({
                message: response.msg,
                position: 'middle',
                duration: 2000
              });
            }
          } catch (error) {
            console.log(error)
          }
        }
      },
      async savePhone() {
        if (this.oldPhone === '' || this.code === '' || this.newPhone === '') {
          Toast({
            message: '请完善信息',
            position: 'middle',
            duration: 2000
          })
        } else {
          var res = await updateMobile(this.newPhone, this.code)
          console.log(res)
          Toast({
            message: res.msg,
            position: 'middle',
            duration: 2000
          })
          if (res.errorCode === '200') {
            this.$router.push({path: '/postProfile'})
          }
        }
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
    margin: 0px;
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

  .cell {
    position: relative;
    /*background-color: #007aff;*/
    width: 100%;
    height: 40px;
    line-height: 30px;
    padding-top: 5px;
    /*padding: 5px 10px;*/
    border-bottom: solid #dcdcdc 1px;
    background-color: #fff;
  }

  .cell-label {
    display: inline-block;
    position: relative;
    width: 20%;
    left: 10px;
    /*background-color: #007aff;*/
  }

  .cell-input {
    outline: none;
    border: none;
    /*text-align: right;*/
    display: inline-block;
    position: relative;
    right: -10px;
    width: 70%;
    /*background-color: #4caf50;*/
  }

  .code-input {
    position: relative;
    width: 40%;
    left: 0;
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
    border: none;
    outline: none;
    background-color: #fff;
    color: #555555;
    width: 80px;
    /*right: 18px;*/
  }


</style>
