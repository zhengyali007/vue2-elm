<template>
  <div id="my-mail-box">
    <!--<mt-navbar v-model="selected">
      <mt-tab-item id="1">邮筒列表</mt-tab-item>
      <mt-tab-item id="2">邮筒分布</mt-tab-item>
    </mt-navbar>-->
    <div class="list">
      <div class="sort">
        <div class="sort-title" @click="changeSort" v-show="breakStatus">信件量：
          <img v-show="active" class="sort-control" src="../../images/postDesc.png"/>
          <img v-show="!active" class="sort-control" src="../../images/postAsc.png"/>
        </div>
        <!--<label class="sort-control" :class = "{ sorted: active}" @click="descending">由高到低</label>-->
        <!--<label class="sort-control sort2" :class = "{ sorted: !active}" @click="ascending">由低到高</label>-->
        <button class="break" @click="checkBreak" v-show="breakStatus">只看故障邮筒</button>
        <button class="break" @click="checkAll" v-show="!breakStatus">查看全部邮筒</button>
      </div>
        <ul v-load-more="loaderMore" class="mail-list" v-show="!empty">
          <li v-for="item in numbers">
            <section class="mail-box-list">
              <img class="list-img" src="../../images/postBox.png"/>
              <label class="list-no">{{item.deviceNo}}</label>
              <div class="list-letter">
                <img src="../../images/postLetters.png"/>
                <label>{{ item.awaitingPickupQuantity }}</label>
              </div>
              <label class="elc">电量：{{ item.surplusBattery }}</label>
              <label class="if-normal" v-if="item.deviceStatus === '2'" style="color: #007aff;">正常</label>
              <label class="if-normal" v-if="item.deviceStatus === '1'" style="color: cadetblue;">待安装</label>
              <label class="if-normal" v-if="item.deviceStatus === '3'">离线</label>
              <label class="if-normal" v-if="item.deviceStatus === '4'" style="color: red;">维修</label>
              <label class="if-normal" v-if="item.deviceStatus === '5'">报废</label>
              <!--<div class="low-elec" v-if="item.deviceStatus === 2">-->
              <!--正常-->
              <!--</div>-->
              <button @click="checkDetails(item.id)">查看详情</button>
            </section>
          </li>
        </ul>
        <div v-show="empty" class="empty">暂无数据</div>
        <div class="btn-container">
          <button @click="addMailBox">绑定新邮筒</button>
          <button @click="getMap" style="margin-left: 53%">邮筒分布</button>
        </div>
        <aside class="return_top" @click="backTop" v-if="showBackStatus">
          <svg class="back_top_svg">
            <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#backtop"></use>
          </svg>
        </aside>
      </div>
      <!--<button @click="getMap">查看地图</button>-->
      <!--</div>-->
      <transition name="loading">
        <loading v-show="showLoading"></loading>
      </transition>
    </div>
</template>

<script>
  import {Toast} from 'mint-ui';
  import wx from 'weixin-js-sdk'
  import {loadMore} from 'src/components/common/mixin'
  import {animate} from 'src/config/mUtils'
  import loading from 'src/components/common/loading'
  import {getMyMailList, getBreakMailBox, ticket,allAddress} from 'src/service/getData'
  import {appid} from "../../service/getData";

  export default {
    components: {
      Toast,loading
    },
    mixins: [loadMore],
    data() {
      return {
        page: '1',
        limit: '10',
        orderStatus: 2,
        selected: '1',
        active: true,//调整升序降序
        showLoading: false,// 展示loading图标
        showBackStatus: false,// 展示"回到顶部"图标
        asc: true,// 升序降序请求标识，控制加载更多请求数据
        numbers: [],
        breakStatus: true,
        empty: false,
      }
    },
    mounted() {
      this.getList()
    },
    methods: {
      //获取数据
      async getList() {
        this.page = 1;
        this.empty = false;
        var myMail = await getMyMailList(this.page, this.limit, this.orderStatus);
        console.log(myMail)
        var res = myMail.body.mailbox
        if (myMail.errorCode === "200") {
          if (res.length === 0){
            this.empty = true;
          }
          this.numbers = res;
        } else {
          this.numbers == null;
        }
        this.showLoading = false;
      },
      // 只看故障邮筒
      async checkBreak() {
        this.empty = false;
        this.breakStatus = false;
        this.page = 1;
        // var id = 1004;
        var breakBox = await getBreakMailBox(this.page, this.limit)
        console.log(breakBox)
        var res = breakBox.body.mailboxFault
        if (breakBox.errorCode === "200") {
          if(res.length === 0){
            this.empty = true;
          }
          this.numbers = res
          console.log(this.numbers)
        }
      },
      //查看全部邮筒
      checkAll() {
        this.breakStatus = true;
        this.getList();
      },
      //查看详情
      checkDetails(id) {
        console.log(id)
        this.$router.push({path: '/mailBoxDetail', query: {id: id}})
      },
      //改变排序方式
      changeSort() {
        this.active = !this.active
        if (this.orderStatus === 1) {
          this.orderStatus = 2
        } else {
          this.orderStatus = 1
        }
        this.getList(this.page, this.limit, this.orderStatus)
      },
      // 绑定新邮筒
      addMailBox() {
        this.$router.push({path: '/addMailBox'})
      },
      //到达底部加载更多数据
      async loaderMore() {
        if (this.touchend) {
          return
        }
        //防止重复请求
        if (this.preventRepeatReuqest) {
          return
        }
        this.showLoading = true;
        this.preventRepeatReuqest = true;

        //数据的定位加10位
        this.offset += 10;
        let res = [{
          number: 'test1',
          letterNo: 96,
          status: 1
        },
          {
            number: 'test2',
            letterNo: 90,
            status: 2
          },
          {
            number: 'test3',
            letterNo: 80,
            status: 1
          }, {
            number: 'test4',
            letterNo: 80,
            status: 1
          }, {
            number: 'test5',
            letterNo: 80,
            status: 1
          }, {
            number: 'test6',
            letterNo: 80,
            status: 1
          }, {
            number: 'test7',
            letterNo: 80,
            status: 1
          }];

        // let res = await shopList(this.latitude, this.longitude, this.offset, this.restaurantCategoryId);
        this.showLoading = false;
        console.log(this.numbers)
        this.numbers = [...this.numbers, ...res];
        console.log(this.numbers)
        //当获取数据小于10，说明没有更多数据，不需要再次请求数据
        if (res.length < 10) {
          this.touchend = true;
          return
        }
        this.preventRepeatReuqest = false;
      },
      //返回顶部
      backTop() {
        animate(document.body, {scrollTop: '0'}, 400, 'ease-out');
      },
      //  查看邮筒分布
      getMap() {
        this.$router.push({path:'/showMap'})
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

  #my-mail-box {
    position: absolute;
    width: 100%;
    height: 100%;
  }

  .list {
  }

  .mail-list {
    /*position: relative;*/
    margin-bottom: 60px;
  }

  .sort {
    /*background-color: cadetblue;*/
    position: relative;
    height: 40px;
    line-height: 30px;
    border-bottom: solid #999 1px;
  }

  .sort-title {
    position: relative;
    width: 20%;
    height: 30px;
    top: 5px;
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

  .list-img {
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
    top: 5px;
    font-size: 16px;
  }

  .list-letter {
    /*background-color: cadetblue;*/
    position: absolute;
    height: 20px;
    left: 22%;
    bottom: 5px;
  }

  .list-letter img {
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

  .elc {
    position: absolute;
    height: 20px;
    left: 55%;
    bottom: 3px;
    font-size: 12px;
  }

  .if-normal {
    position: absolute;
    height: 20px;
    left: 38%;
    bottom: 3px;
    font-size: 12px;
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

  .return_top {
    position: fixed;
    bottom: 2rem;
    right: 1rem;
    .back_top_svg {
      @include wh(1.5rem, 1.5rem);
    }
  }

  .btn-container {
    position: fixed;
    width: 100%;
    height: 50px;
    bottom: 0;
    background: rgba(0, 0, 0, 0.3);
  }

  .btn-container button {
    display: inline-block;
    position: absolute;
    background-color: #007aff;
    color: #fff;
    width: 41%;
    height: 30px;
    line-height: 30px;
    vertical-align: middle;
    top: 10px;
    /*margin-left: 10%;*/
    border-radius: 5px;
    margin-left: 6%;
  }

  .empty {
    position: relative;
    width: 100%;
    height: 100px;
    /*background-color: #007aff;*/
    text-align: center;
    color: #999;
    margin-top: 30px;
  }


</style>
