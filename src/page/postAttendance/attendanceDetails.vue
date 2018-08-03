<template>
  <div id="attendance-details">
    <head-top go-back="true" head-title="考勤详情" style="position: relative"></head-top>
    <!--<section class="attendance-title">考勤详情</section>-->
    <div class="details">
      <mt-cell title="邮筒编号：" :value="deviceNo"></mt-cell>
      <mt-cell title="规定开箱时间：" :value="shouldOpenTime"></mt-cell>
      <mt-cell title="实际开箱时间：" :value="openTime"></mt-cell>
      <mt-cell title="考勤状态：" :value="status"></mt-cell>
    </div>

  </div>
</template>

<script>
  import { Cell} from 'mint-ui';
  import {getAttendanceDetail} from "../../service/getData";
  import headTop from 'src/components/header/head'

  export default {
    components: {
       Cell,headTop
    },
    data() {
      return {
        deviceNo:'',
        shouldOpenTime:'',
        openTime:'',
        status: '',
        date: '',
      }
    },
    mounted() {
      this.getDetail()
      this.date =  new Date();
    },
    methods: {
      async getDetail() {
        var id = this.$route.query.id;
        var res = await getAttendanceDetail(id)
        console.log(res)
        if (res.errorCode === '200'){
          var detail = res.body.listAttendanceById
          this.deviceNo=detail.mailboxDevice.deviceNo
          this.shouldOpenTime = detail.shouldPickupTime
          this.openTime = detail.pickupTime
          this.status= detail.status
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
    font-size: 16px;
    color: #333;
  }

  #attendance-details {
    position: absolute;
    width: 100%;
    height: 100%;
    background-color: #fff;
  }

  .attendance-title {
    position: relative;
    background-color: #f3f3f3;
    color: #007aff;
    text-align: center;
    height: 40px;
    line-height: 30px;
    padding-top: 5px;
    font-size: 16px;
  }

  .details {
    position: relative;
    /*margin-top: 20px;*/
  }



</style>
