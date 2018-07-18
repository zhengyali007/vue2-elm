<template>
  <div id="attendance-list">
    <ul>
      <li v-for="item in numbers">
        <section class="list">
          <img src="../../images/postBox.png"/>
          <label class="number">{{item.mailboxDeviceId}}</label>
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
  </div>
</template>

<script>
  import {loadMore} from 'src/components/common/mixin'
  import {animate} from 'src/config/mUtils'
  import loading from 'src/components/common/loading'
  import {getAttendanceList} from "../../service/getData";

  export default {
    components: { loading },
    mixins: [loadMore],
    data() {
      return {
        loading: true,
        //邮箱编号列表
        numbers: [],
        page: 1,
        limit: 10,
      }
    },
    mounted() {
      this.getList()
    },
    methods: {
      //获取考勤列表
      async getList() {
        var id = 1004;
        var attendanceList = await getAttendanceList(id,this.page,this.limit)
        console.log(attendanceList)
        var res = attendanceList.body.listAttendance
        if (attendanceList.errorCode === "200"){
          this.numbers =res
        }
      },
      //查看详情
      checkDetails(id) {
        this.$router.push({path: '/attendanceDetails',query: {id:id}})
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


</style>
