<template>
  <div id="change-phone">
    <section class="change-title">修改手机号</section>
    <mt-cell title="旧手机号：">
      <input type="text" placeholder="请输入旧手机号码"/>
    </mt-cell>
    <mt-cell title="验证码：">
      <input type="text" placeholder="请输入验证码"/>
      <button class="get-code">获取验证码</button>
    </mt-cell>
    <mt-cell title="新手机号：">
      <input type="text" placeholder="请输入新手机号码"/>
    </mt-cell>
    <button class="save-phone" @click="savePhone">保存</button>
  </div>
</template>

<script>
  import {Cell} from 'mint-ui';
  export default {
    components: {Cell},
    data() {
      return {}
    },
    mounted() {},
    methods: {
      savePhone() {
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


</style>
