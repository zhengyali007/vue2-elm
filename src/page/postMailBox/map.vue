<template>
  <div id="map-index">
    <head-top go-back="true" head-title="邮筒分布" style="position: relative"></head-top>
    <div id="map">
    </div>
  </div>
</template>


<script>
  import BMap from 'BMap'
  import headTop from 'src/components/header/head'
  import {allAddress} from "../../service/getData";

  export default {
    components: {headTop},
    data() {
      return {
        map:'',
        addressArr: [
          {
            latitude: '111.742579',
            longitude: '40.818675'
          },
          {
            latitude: '111.742579',
            longitude: '40.812675'
          }
        ]
      }
    },
    mounted() {
      this.getMap()
    },
    methods: {
      async getMap() {
        this.map = new BMap.Map('map')
        var res = await allAddress()
        var address  = res.body.mailboxAddress
        console.log(address)
        var testLa = address[0].latitude
        var testLo = address[0].longitude
        console.log(testLa,testLo)
        var  test= new BMap.Point(testLo,testLa)
        this.map.centerAndZoom(test, 15);
        for(var k in address){
          console.log(address[k].longitude,address[k].latitude) //经纬度
          var lat = address[k].latitude
          var lon = address[k].longitude
          var point = new BMap.Point(lon,lat)
          this.addMarker(point);
        }
      },
      addMarker(point){
        var marker = new BMap.Marker(point);
        this.map.addOverlay(marker);
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

  #map-index {
    position: absolute;
    width: 100%;
    height: 100%;
  }

  #map {
    position: relative;
    width: 100%;
    height: 90%;
    top:0;
  }


</style>
