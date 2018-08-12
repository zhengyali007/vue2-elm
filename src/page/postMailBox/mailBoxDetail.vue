<template>
  <div id="mail-box-detail">
    <head-top go-back="true" head-title="邮筒详情" style="position: relative"></head-top>
    <!--<section class="detail-title">邮筒详情</section>-->
    <mt-cell title="邮筒编号：" :value="deviceNo"></mt-cell>
    <mt-cell title="设备状态：" :value="deviceStatus"></mt-cell>
    <!--<mt-cell title="设备状态：" value="正常" v-if="deviceStatus === '2'"></mt-cell>-->
    <!--<mt-cell title="设备状态：" value="离线" v-if="deviceStatus === '3'"></mt-cell>-->
    <!--<mt-cell title="设备状态：" value="维修" v-if="deviceStatus === '4'"></mt-cell>-->
    <!--<mt-cell title="设备状态：" value="报废" v-if="deviceStatus === '5'"></mt-cell>-->
    <!--<mt-cell title="设备电量：" value=0 v-if="surplusBattery === '' || surplusBattery === null"></mt-cell>-->
    <mt-cell title="设备电量：" :value="surplusBattery"></mt-cell>
    <mt-cell title="信件量：" :value="awaitingPickupQuantity"></mt-cell>
    <div class="address">
      <label>所处位置：</label>
      <p>{{address}}</p>
    </div>
    <!--<mt-cell title="所处位置：" :value="address">-->
      <!--<p style="width:200px;word-break:normal;word-wrapL:break-word;">{{address}}</p>-->
    <!--</mt-cell>-->

    <div class="unbind">
      <button @click="unBinding">解绑</button>
    </div>
  </div>
</template>

<script>
  import {Cell,Toast} from 'mint-ui';
  import {getMailDetail,unbindBox} from "../../service/getData";
  import headTop from 'src/components/header/head'

  export default {
    components: {
      Cell, headTop,Toast
    },
    data() {
      return {
        deviceNo: '',
        awaitingPickupQuantity: '',
        address: '',
        deviceStatus: '',
        surplusBattery: '',
      }
    },
    mounted() {
      this.getDetail()
    },
    methods: {
      async getDetail() {
        var id = this.$route.query.id
        var myMail = await getMailDetail(id);
        console.log(myMail)
        var response = myMail.body.listMailboxById
        if (myMail.errorCode === "200") {
          console.log(response)
          this.address = response.address
          this.awaitingPickupQuantity = response.awaitingPickupQuantity
          this.deviceNo = response.deviceNo
          this.deviceStatus = response.deviceStatus
          if(response.surplusBattery === null || response.surplusBattery  === ''){
            this.surplusBattery = '0%'
          }else {
            this.surplusBattery = response.surplusBattery + '%'
          }
        }
      },
      async unBinding() {
        var id = this.$route.query.id
        var res = await unbindBox(id)
        if (res.errorCode === "200") {
          Toast({
            message:'解绑成功!'
          })
          this.$router.push({path:'/myMailBox'})
        }else {
          Toast({
            message:'操作失败，请重试!'
          })
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
    font-size: 16px;
    color: #333;
  }

  #mail-box-detail {
    position: absolute;
    width: 100%;
    height: 100%;
    background-color: #fff;
  }

  .address {
    position: relative;
    width:100%;
    padding: 10px;
    border-top: solid #eeeeee 1px;
  }


  .address label {
    position: relative;
    width:20%;
    vertical-align: middle;
  }

  .address p {
    vertical-align: middle;
    display: inline-block;
    position: relative;
    width: 66%;
    left: 10%;
    text-align: right;
    word-wrap: break-word;
    word-break: break-all;
    overflow: hidden;
    color: #999;
  }

  .detail-title {
    position: relative;
    background-color: #f3f3f3;
    color: #007aff;
    text-align: center;
    height: 40px;
    line-height: 30px;
    padding-top: 5px;
    font-size: 16px;
  }

  .box-detail {
    position: relative;
    /*background-color: #007aff;*/
    height: 40px;
    /*margin-top: 20px;*/
  }

  .box-title {
    position: absolute;
    height: 30px;
    line-height: 30px;
    vertical-align: middle;
    left: 15%;
  }

  .box-content {
    position: absolute;
    height: 30px;
    line-height: 30px;
    vertical-align: middle;
    right: 15%;
    color: #007aff;
    /*background-color: #007aff;*/
  }

  .unbind {
    position: relative;
    margin-top: 60px;
    width: 80%;
    height: 30px;
    margin-left: 10%;
    text-align: center;
  }

  .unbind button{
    border: none;
    outline: none;
    position: relative;
    width: 100%;
    height: 100%;
    background-color: #e03636;
    color: #fff;
    font-size: 16px;
    border-radius: 5px;
  }


</style>
