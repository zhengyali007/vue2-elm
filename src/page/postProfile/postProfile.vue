<template>
  <div id="profile">
    <section class="profile-title">个人信息</section>
    <mt-cell title="姓名：">
      <input type="text" placeholder="请输入真实姓名"/>
    </mt-cell>
    <mt-cell title="手机号码：">
      <!--<input type="text" placeholder="请输入真实姓名"/>-->
      <label>15655376973</label>
      <button class="change-number" @click="changePhone">变更</button>
    </mt-cell>
    <mt-cell title="身份证号：">
      <input type="text" placeholder="请输入身份证号"/>
    </mt-cell>
    <mt-cell title="居住地址:">
      <input type="text" placeholder="请输入居住地址"/>
    </mt-cell>
    <mt-cell title="性别:">
      <label class="single" @click="setSex1"><input type="radio" name="sex" value="male" checked/>男</label>
      <label class="single" @click="setSex2"><input type="radio" name="sex" value="female"/>女</label>
      <!--<input type="text" placeholder="请输入性别"/>-->
    </mt-cell>
    <mt-cell title="年龄:">
      <input type="text" placeholder="请输入年龄"/>
    </mt-cell>
    <mt-cell title="学历:">
      <input type="text" placeholder="请输入学历"/>
    </mt-cell>
    <mt-cell title="专业:">
      <input type="text" placeholder="请输入专业"/>
    </mt-cell>
    <div class="btn-container">
      <button @click="saveProfile" class="save">保存</button>
      <button @click="unBind" class="un-bind">解除绑定</button>
    </div>

  </div>
</template>

<script>
  import {Radio, Cell} from 'mint-ui';

  export default {
    components: {
      Radio, Cell
    },
    data() {
      return {
        sex: 1,
      }
    },
    mounted() {
    },
    methods: {
      setSex1() {
       this.sex = 1
        console.log(this.sex)
      },
      setSex2() {
        this.sex = 2
        console.log(this.sex)
      },
      //修改绑定手机号
      changePhone() {
        this.$router.push({path:'/changePhone'})
      },
      saveProfile() {
        this.$router.push({path:'/myMailBox'})
      },
    //  解除绑定
      unBind() {
        // 调取接口解除绑定并跳转至登录页面
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

  #profile {
    position: absolute;
    width: 100%;
    height: 100%;
    background-color: #fff;
  }

  .profile-title {
    position: relative;
    background-color: #f3f3f3;
    color: #007aff;
    text-align: center;
    height: 40px;
    line-height: 30px;
    padding-top: 5px;
    font-size: 18px;
  }

  .change-number {
    position: relative;
    outline: none;
    border: none;
    background-color: #fff;
    color: #007aff;
    width:60px;
  }

  .single {
    /*background-color: cadetblue;*/
    margin-right: 40px;
  }


  .btn-container {
    /*background-color: #fff3e1;*/
    position: relative;
    height: 30px;
    text-align: center;
    margin-top: 30px;
  }

  .btn-container button {
    position: relative;
    display: inline-block;
    height: 30px;
    color: #fff;
    width: 40%;
    border-radius: 5px;
    font-size: 16px;
    margin: 5px;
  }

  .save {
    background-color: #007aff;
  }

  .un-bind {
    background-color: red;
  }

  input[type=radio] {

    display: inline-block;

    vertical-align: middle;

    width: 20px;

    height: 20px;

    -webkit-appearance: none;

    background-color: transparent;

    border: 0;

    outline: 0 !important;

    line-height: 20px;

    color: #d8d8d8;

  }

  input[type=radio]:after {

    content: "";

    display: block;

    width: 20px;

    height: 20px;

    border-radius: 50%;

    text-align: center;

    line-height: 14px;

    font-size: 16px;

    color: #fff;

    border: 3px solid #ddd;

    background-color: #fff;

    box-sizing: border-box;

  }

  input[type=radio]:checked:after {

    content: "L";

    transform: matrix(-0.766044, -0.642788, -0.642788, 0.766044, 0, 0);

    -webkit-transform: matrix(-0.766044, -0.642788, -0.642788, 0.766044, 0, 0);

    border-color: #007aff;

    background-color: #007aff;

  }


</style>
