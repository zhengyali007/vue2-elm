<template>
  <div id="test">
    <div class="btn-container">
      <button @click="toLogin">账号绑定</button>
      <br>
      <button @click="toList">我的邮筒</button>
      <br>
      <button @click="toAtt">考勤记录</button>
      <br>
    </div>
  </div>
</template>

<script>
  export default {
    components: {},
    data() {
      return {}
    },
    mounted() {},
    methods: {
      toLogin() {
        this.$router.push({path: '/postLogin'})
      },
      toList() {
        this.$router.push({path: '/myMailBox'})
      },
      toAtt() {
        this.$router.push({path: '/attendanceList'})
      },
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
    font-size: 16px;
    color: #333;
  }

  #test {
    position: absolute;
    width: 100%;
    height: 100%;
    background-color: #fff;
  }

  .btn-container {
    position: relative;
    width: 100%;
    margin-top: 25%;
    text-align: center;
    top: 20px;

  }

  .btn-container button {
    background-color: #fff;
    color: cadetblue;
    margin-top: 20px;
  }



</style>
