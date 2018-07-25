<template>
  <div id="addMailBox">
    <head-top go-back="true" head-title="绑定邮筒" style="position: relative"></head-top>
    <!--<section class="add-title">绑定邮筒</section>-->
    <mt-cell title="邮筒编号：">
      <input class="text" type="text" placeholder="请输入邮筒编号" v-model="deviceNo"/>
    </mt-cell>
    <mt-cell title="邮筒类型：">
      <div class="sel">
        <select v-model="selectType">
          <option v-for="item in type"  :value="item.value">{{ item.label }}</option>
        </select>
        <img src="../../images/xiala.png"/>
      </div>
    </mt-cell>
      <mt-cell title="邮筒地址：">
        <div class="sel">
          <select v-model="selectAddress" >
            <option v-for="item in address"  :value="item.id">{{ item.address }}</option>
          </select>
          <img src="../../images/xiala.png"/>
        </div>
    </mt-cell>
    <button class="add" @click="addBox">
      绑定
    </button>
  </div>
</template>

<script>
  import { Cell,Toast} from 'mint-ui';
  import headTop from 'src/components/header/head'
  import {addMailBox,typeAndAddress} from "../../service/getData";

  export default {
    components: {
      Cell,Toast,headTop
    },
    data() {
      return {
        type:[],
        address:[],
        deviceNo:'',
        selectType: '',
        selectAddress:'',
      }
    },
    mounted() {
      this.getSelectValue()
    },
    methods: {
      async getSelectValue() {
        var res = await typeAndAddress()
        console.log(res)
        if(res.errorCode === '200'){
          var type = res.body.deviceType
          var address = res.body.dutyAddress
          var typeArr = []
          for (var i in type) {
            typeArr.push(type[i])
          }
          this.selectType=typeArr[0].value
          console.log(this.selectType)
          this.type = typeArr
          var addressArr = []
          for (var i in address) {
            addressArr.push(address[i])
          }
          this.address = addressArr
          // console.log(addressArr[0].id)
          this.selectAddress=addressArr[0].id
          console.log(this.selectAddress)
          this.address = addressArr
          console.log(this.type,this.address)
        }
      },
     async addBox() {
        console.log(this.deviceNo,this.selectAddress,this.selectType)
       if(this.deviceNo === ''){
         Toast({
           message:'请完善信息！'
         })
       }else {
         var res = await addMailBox(this.deviceNo,this.selectType,this.selectAddress)
         console.log(res)
         if (res.errorCode === '200'){
           Toast({
             message:'绑定成功'
           })
           this.$router.push({path:'/myMailBox'})
         }
         if (res.errorCode === '402'){
           Toast({
             message:res.msg
           })
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
    margin: 0px ;
    font-size: 14px;
    color: #333;
  }

   .add-title {
    position: relative;
    background-color: #f3f3f3;
    color: #007aff;
    text-align: center;
    height: 40px;
    line-height: 30px;
    padding-top: 5px;
    font-size: 16px;
  }

   .text {
     position: relative;
     width:100%;
     left:0;
   }

  .sel {
    //用div的样式代替select的样式
    width: 150px;
    height: 30px;
    border-radius: 5px;
    //盒子阴影修饰作用,自己随意
    position: relative;
    right: 5px;
    background-color: #fff;
  }

  .sel select {
    /*position: relative;*/
    //清除select的边框样式
    border: none;
    //清除select聚焦时候的边框颜色
    outline: none;
    //将select的宽高等于div的宽高
    width: 100%;
    height: 30px;
    line-height: 30px;
    //隐藏select的下拉图标
    appearance: none;
    -webkit-appearance: none;
    -moz-appearance: none;
    //通过padding-left的值让文字居中
    padding-left: 10px;
    background-color: #fff;
    color: #666;
  }

  .sel img {
    position: absolute;
    top:6px;
    right: 15px;
    pointer-events: none;
  }

  //使用伪类给select添加自己想用的图标
  /*.sel :after{*/
    /*content: "";*/
    /*width: 14px;*/
    /*height: 8px;*/
    /*background-color: #007aff;*/
    /*!*background: url(../../images/xiala.png) no-repeat center;*!*/
    /*//通过定位将图标放在合适的位置*/
    /*position: absolute;*/
    /*!*right: 20px;*!*/
    /*!*top: 45%;*!*/
    /*//给自定义的图标实现点击下来功能*/
    /*pointer-events: none;*/
  /*}*/

  .add {
    outline: none;
    border: none;
    position: relative;
    width: 80%;
    height: 30px;
    margin-top: 30px;
    margin-left: 10%;
    background-color: #007aff;
    color: #fff;
    border-radius: 5px;
  }




</style>
