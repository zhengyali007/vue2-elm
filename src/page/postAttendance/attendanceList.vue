<template>
  <div id="attendance-list" >
    <div>
    <ul  v-load-more="loaderMore" v-show="!empty" type="1" >
      <li v-for="item in numbers">
        <section class="list">
          <img src="../../images/postBox.png"/>
          <label class="number">{{item.mailboxDevice.deviceNo}}</label>
          <button @click="checkDetails(item.id)">查看详情</button>
          <div class="attendance-status" v-if="item.status === '1'">
            <img src="../../images/post_a1.png"/>
            <label>正常</label>
          </div>
          <div class="attendance-status" v-if="item.status === '2'">
            <img src="../../images/post_a2.png"/>
            <label>迟开</label>
          </div>
          <div class="attendance-status" v-if="item.status === '3'">
            <img src="../../images/post_a3.png"/>
            <label>未开</label>
          </div>
        </section>
      </li>
    </ul>
      <transition name="loading">
        <loading v-show="showLoading"></loading>
      </transition>
      <p v-if="touchend" class="empty_data">没有更多了</p>
    </div>
    <div v-show="empty" class="no-data">暂无考勤信息</div>


  </div>
</template>

<script>
  import {loadMore} from 'src/components/common/mixin'
  import {animate} from 'src/config/mUtils'
  import loading from 'src/components/common/loading'
  import {getAttendanceList} from "../../service/getData";

  export default {
    components: {loading},
    mixins: [loadMore],
    data() {
      return {
        offset: 0,
        loading: true,
        //邮箱编号列表
        numbers: [],
        page: 1,
        limit: 10,
        empty: false,
        dataList: [],
        preventRepeatReuqest: false, //到达底部加载数据，防止重复加载
        showBackStatus: false, //显示返回顶部按钮
        showLoading: false, //显示加载动画
        touchend: false, //没有更多数据
      }
    },
    mounted() {
      this.getList()
    },
    methods: {
      //获取考勤列表
      async getList() {
        this.dataList = []
        var attendanceList = await getAttendanceList(this.page, this.limit)
        console.log(attendanceList)
        var res = attendanceList.body.listAttendance
        if (attendanceList.errorCode === "200") {
          if (res.length === 0 && this.page === 1) {
            this.empty = true
          } else {
            this.dataList = res
            if (this.page === 1) {
              this.numbers = this.dataList
            }
          }
          // this.numbers =res

        }
      },
      //查看详情
      checkDetails(id) {
        this.$router.push({path: '/attendanceDetails', query: {id: id}})
      },
      //  加载更多
      async loaderMore() {
        // alert(1)
        if (this.touchend) {
          return
        }
        //防止重复请求
        if (this.preventRepeatReuqest) {
          return
        }
        this.showLoading = true;
        this.preventRepeatReuqest = true;

        //数据的定位加20位
        this.offset += this.limit;
        this.page ++;
        let response = await getAttendanceList(this.page, this.limit);
        var res = response.body.listAttendance
        this.showLoading = false;
        this.numbers = [...this.numbers, ...res];
        //当获取数据小于20，说明没有更多数据，不需要再次请求数据
        if (res.length < this.limit) {
          this.touchend = true;
          return
        }
        this.preventRepeatReuqest = false;
      }
    }
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


  .list {
    position: relative;
    height: 60px;
    background-color: #ffffff;
    margin: 10px 0;
  }

  .list img {
    position: absolute;
    width: 40px;
    height: 40px;
    left: 10px;
    top: 15px;
  }

  .number {
    position: absolute;
    left: 60px;
    height: 30px;
    line-height: 30px;
    top: 5px;
    font-size: 16px;
  }

  .list button {
    position: absolute;
    right: 5%;
    height: 30px;
    line-height: 30px;
    top: 15px;
    background-color: #ffffff;
    color: #007aff;
  }

  .attendance-status {
    display: inline-block;
    position: absolute;
    left: 50px;
    top:20px;
  }

  .attendance-status img {
    position: absolute;
    width: 20px;
    height: 20px;
    /*top:20px;*/
  }

  .attendance-status label {
    position: absolute;
    width: 100px;
    height: 20px;
    line-height: 20px;
    font-size: 12px;
    top:15px;
    left: 40px;
  }

  .no-data {
    position: relative;
    width: 100%;
    height: 100px;
    margin-top: 30px;
    text-align: center;
    color: #666;
  }

  .empty_data{
    @include sc(0.5rem, #666);
    text-align: center;
    line-height: 2rem;
  }

</style>
