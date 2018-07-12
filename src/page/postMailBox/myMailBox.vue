<template>
  <div id="my-mail-box">
    <mt-navbar v-model="selected">
      <mt-tab-item id="1">邮筒列表</mt-tab-item>
      <mt-tab-item id="2">邮筒分布</mt-tab-item>
    </mt-navbar>
    <div class="list" v-if="selected === '1'">
      <div class="sort">
        <div class="sort-title"  @click="changeSort">信件量：
          <img v-show="active" class="sort-control" src="../../images/postDesc.png"/>
          <img v-show="!active" class="sort-control" src="../../images/postAsc.png"/>
        </div>
        <!--<label class="sort-control" :class = "{ sorted: active}" @click="descending">由高到低</label>-->
        <!--<label class="sort-control sort2" :class = "{ sorted: !active}" @click="ascending">由低到高</label>-->
        <button class="break">只看故障邮筒</button>
      </div>
      <ul>
        <li v-for="item in numbers">
          <section class="mail-box-list">
            <img class="list-img" src="../../images/postBox.png"/>
            <label class="list-no">{{item.number}}</label>
            <div class="list-letter">
              <img src="../../images/postLetters.png"/>
              <label>{{ item.letterNo }}</label>
            </div>
            <div class="low-elec" v-if="item.status === 2">
              <img src="../../images/postLow.png"/>
            </div>
            <div class="low-elec" v-if="item.status === 3">
              <img src="../../images/postBreak2.png"/>
            </div>
            <button @click="checkDetails">查看详情</button>
          </section>
        </li>
      </ul>
    </div>
    <div class="location" v-else>
    </div>

  </div>
</template>

<script>
  import { Navbar, TabItem } from 'mint-ui';
  import wx from 'weixin-js-sdk'

  export default {
    components: {
      Navbar, TabItem
    },
    data() {
      return {
        selected: '1',
        active: true,
        //邮箱编号列表
        numbers: [
          {
            number: 'MB000000000001',
            letterNo: 96,
            status: 1
          },
          {
            number: 'MB000000000089',
            letterNo: 90,
            status: 2
          },
          {
            number: 'MB000000000096',
            letterNo: 80,
            status: 1
          },
          {
            number: 'MB000000000045',
            letterNo: 65,
            status: 2
          },
          {
            number: 'MB000000000005',
            letterNo: 54,
            status: 3
          },
          {
            number: 'MB000000000079',
            letterNo: 37,
            status: 1
          },
          {
            number: 'MB000000000017',
            letterNo: 36,
            status: 3
          },
          {
            number: 'MB000000000028',
            letterNo: 19,
            status: 1
          },
        ]
      }
    },
    watch: {
      selected:function () {
        console.log(this.selected)
      }
    },
    mounted() {
    },
    methods: {
      checkDetails() {
        this.$router.push({path: '/mailBoxDetail'})
      },
      //改变排序方式
      changeSort () {
        this.active = !this.active
      },
      // 微信分参数
      getConfig() {
        let url = location.href.split('#')[0] //获取锚点之前的链接
        // this.$http.get('/index.php',{
        //   params: {
        //     url: url
        //   }
        // }).then(response => {
        //   let res = response.data;
        // })
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
    margin: 0px;
    font-size: 14px;
    color: #333;
  }



  .list {
  }

  .sort {
    /*background-color: cadetblue;*/
    position: relative;
    height: 40px;
    line-height: 30px;
  }

  .sort-title {
    position: relative;
    width: 20%;
    height: 30px;
    top:5px;
    /*right: 10px;*/
    left: 72%;
    /*padding-left:10px;*/
  }

  .sort-control {
    /*background-color: cadetblue;*/
    position: absolute;
    width: 20px;
    height: 20px;
    top: 5px;
    margin-left: 5px;
  }


  .break {
    position: absolute;
    /*display: inline-block;*/
    width: 30%;
    left: 10px;
    top: 5px;
    height: 30px;
    background-color: #f5f5f5;
    color: #007aff;
  }

  .mail-box-list {
    position: relative;
    height: 60px;
    background-color: #ffffff;
    margin-bottom: 10px;
  }

  .list-img{
    position: absolute;
    width: 42px;
    height: 42px;
    left: 20px;
    top: 8px;
    /*border-radius: 50%;*/
  }

  .list-no {
    position: relative;
    left: 80px;
    height: 30px;
    line-height: 30px;
    top: 5px
  }

  .list-letter {
    /*background-color: cadetblue;*/
    position: absolute;
    height: 20px;
    left: 22%;
    bottom: 5px;
  }

  .list-letter  img{
    position: relative;
    width: 16px;
    height: 16px;
    line-height: 16px;
    top: 2px;
  }

  .list-letter label {
    position: relative;
    height: 16px;
    line-height: 16px;
    top: 0px;
    color: #007aff;
  }

  .low-elec {
    position: absolute;
    height: 20px;
    left: 35%;
    bottom: 5px;
  }

  .low-elec img {
    position: relative;
    width: 20px;
    height: 20px;
    line-height: 20px;
  }

  .mail-box-list button {
    position: absolute;
    right: 20px;
    height: 30px;
    line-height: 30px;
    top: 15px;
    background-color: #ffffff;
    color: #007aff;
  }


</style>
