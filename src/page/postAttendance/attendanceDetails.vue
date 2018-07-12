<template>
  <div id="attendance-details">
    <div class="details">
      <mt-cell title="邮筒编号：" value="MB000000000000001"></mt-cell>
      <mt-cell title="规定开箱时间：" value="08：00"></mt-cell>
      <mt-cell title="实际开箱时间：" value="09：00"></mt-cell>
      <mt-cell title="考勤状态：" value="迟开"></mt-cell>
    </div>

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

  #attendance-details {
    position: absolute;
    width: 100%;
    height: 100%;
    background-color: #fff;
  }

  .details {
    position: relative;
    /*margin-top: 20px;*/
  }



</style>
