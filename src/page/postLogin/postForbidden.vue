<template>
  <div id="test">
    <div class="container">该用户已被禁用！</div>
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

  .container {
    position: relative;
    width: 100%;
    margin-top: 25%;
    text-align: center;
    top: 20px;
  }




</style>
