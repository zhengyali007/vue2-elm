<template>
  <div id="mail-box-detail">
    <mt-cell title="邮筒编号：" value="MB000000000000001"></mt-cell>
    <mt-cell title="设备状态：" value="故障"></mt-cell>
    <mt-cell title="设备电量：" value="50%"></mt-cell>
    <mt-cell title="当前信件量：" value="10"></mt-cell>
    <mt-cell title="邮筒所处位置：">

    </mt-cell>
  </div>
</template>

<script>
  import { Cell} from 'mint-ui';

  export default {
    components: {
      Cell
    },
    data() {
      return {}
    },
    mounted() {},
    methods: {},
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

  #mail-box-detail {
    position: absolute;
    width: 100%;
    height: 100%;
    background-color: #fff;
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



</style>
