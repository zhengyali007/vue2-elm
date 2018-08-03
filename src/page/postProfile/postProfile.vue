<template>
  <div id="profile">
    <section class="profile-title">个人信息</section>
    <div class="cell">
      <label class="cell-label">姓名：</label>
      <input class="cell-input" placeholder="请输入真实姓名" v-model="name"/>
    </div>
    <!--<div class="cell">-->
      <!--<label class="cell-label">工号：</label>-->
      <!--<input class="cell-input no -change" placeholder="请输入工号" v-model="workNo"/>-->
    <!--</div>-->
    <!--<div class="cell">-->
      <!--<label class="cell-label">身份证号：</label>-->
      <!--<input class="cell-input no-change" placeholder="请输入身份证号" v-model="idCard"/>-->
    <!--</div>-->
    <div class="cell">
      <label class="cell-label">手机号码：</label>
      <input class="cell-input no-change" placeholder="请输入手机号码" v-model="phone" style="width: 50%;"/>
      <button class="change" @click="changePhone">变更</button>
    </div>
    <!--<div class="cell">-->
      <!--<label class="cell-label">邮箱：</label>-->
      <!--<input class="cell-input" placeholder="请输入邮箱" v-model="email"/>-->
    <!--</div>-->
    <div class="cell">
      <label class="cell-label">年龄：</label>
      <input class="cell-input no-change" type="number" placeholder="请输入年龄" v-model="age" readonly/>
    </div>
    <div class="cell">
      <label class="cell-label">居住地址：</label>
      <input class="cell-input" placeholder="请输入居住地址" v-model="address"/>
    </div>

    <div class="btn-container">
      <button @click="saveProfile" class="save">保存</button>
      <button @click="unBind" class="un-bind">解除绑定</button>
    </div>

  </div>
</template>

<script>
  import { Cell, Toast} from 'mint-ui';


  import {getProfile ,  saveProfile, unBind} from "../../service/getData";

  export default {
    components: {
       Cell, Toast
    },
    data() {
      return {
        id: '',
        sex: 1,
        name: '',
        phone: '',
        idCard: '',
        email: '',
        workNo: '',
        age: '',
        address: '',
      }
    },
    mounted() {
      this.getProfile()
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
      // 获取个人信息
      async getProfile() {
        // var id = 'cbfef88ffd4442bba6cc79b02c186f84';
        var profile = await getProfile()
        console.log(profile)
        if (profile.errorCode === "200"){
          var res = profile.body.postman;
          console.log(res.name);
          this.id = res.id
          this.name = res.name;
          this.phone = res.mobile;
          this.idCard = res.passportNo;
          this.sex = res.sex;
          this.email = res.email;
          this.workNo = res.workNo;
          this.age = res.age;
          this.address = res.address;
        }
      },
      //修改绑定手机号
      changePhone() {
        this.$router.push({path:'/changePhone'})
      },
      //保存个人信息
      async saveProfile() {
        console.log(this.id,this.address)
        var response = await saveProfile(this.address)
        console.log(response)
        if(response.errorCode === "200"){
          Toast({
            message: '保存成功',
            position: 'bottom',
            duration: 2000
          });
          this.getProfile()
      }
        // this.$router.push({path:'/myMailBox'})
      },
    //  解除绑定
      async unBind() {
        // 调取接口解除绑定并跳转至登录页面
        var response = await unBind()
        console.log(response)
        if (response.errorCode === '200'){
          localStorage.removeItem('token')
          Toast({
            message: '解绑成功',
            position: 'bottom',
            duration: 2000
          });
         window.location.reload()
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
    left:10px;
    /*background-color: #007aff;*/
  }

  .cell-input {
    outline: none;
    border: none;
    /*text-align: right;*/
    display: inline-block;
    position: relative;
    right:-10px;
    width: 70%;
    /*background-color: #4caf50;*/
  }

  .no-change {
    color: #999;
  }

  .change {
    position: relative;
    width:15%;
    left:5%;
    border: none;
    outline: none;
    background-color: #fff;
    color: #007aff;
  }

  .t- {
    position: relative;
    left:0;
    width: 100%;
  }

  .change-number {
    position: absolute;
    outline: none;
    border: none;
    background-color: #fff;
    color: #007aff;
    right:10%;
    /*width:20%;*/
  }

  .single {
    /*background-color: cadetblue;*/
    margin-right: 40px;
  }

  .edu {

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
