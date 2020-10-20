<template>
  <div class="map-container">
    <div class="map">
      <ol-map @click-Back="clickPrint"></ol-map>
    </div>
    <ul class="info-list" flex="main:justify">
      <li class="info-li" v-for="(item, index) in infoList" :key="index">
        <div class="info-icon">
          <span class="iconfont" :class="item.icon"></span>
        </div>
        <div class="info-number">
          {{ item.name }}
          <span>{{ item.number }}</span>
        </div>
        <div class="info-per">在线率: {{ item.per }}</div>
      </li>
    </ul>
  </div>
</template>

<script>
import olMap from '@/components/map/olMap';
import { getFourTotalOnline } from '@/services/IntelligentAnalytics.js';

export default {
  name: 'equipmentOnline',
  components: { olMap },
  data() {
    return {
      infoList: [
        { name: '级联监控点', number: '60', per: '92', icon: 'icon-lianjie1', type: 'unionView' },
        { name: '自建监控点', number: '35', per: '94', icon: 'icon-jianshejindu', type: 'selfView' },
        { name: '单兵作战', number: '46', per: '96', icon: 'icon-zhifajiluyi', type: 'executeRecord' },
        { name: '执法车辆', number: '32', per: '94', icon: 'icon-hangchejiluyi', type: 'carDevice' },
      ],
    };
  },
  mounted() {
    this.clickPrint('330921100');
  },
  methods: {
    clickPrint(val) {
      if (val === '330921100') {
        // this.$store.commit("setOption", "330921001");
      } else {
        // this.$store.commit("setOption", val);
      }
      console.log('clickPrint', val);
      getFourTotalOnline({ placecode: val }).then(({ result }) => {
        this.infoList[0].number = result.unionView.total;
        this.infoList[0].per = result.unionView.online;
        this.infoList[1].number = result.selfView.total;
        this.infoList[1].per = result.selfView.online;
        this.infoList[2].number = result.executeRecord.total;
        this.infoList[2].per = result.executeRecord.online;
        this.infoList[3].number = result.carDevice.total;
        this.infoList[3].per = result.carDevice.online;
      });
    },
  },
};
</script>

<style lang="less" scoped>
.map-container {
  width: 638px;
  height: 672px;
  position: relative;
  margin: 20px 0 0 20px;
  background: url('./img/middle_back.png');
  padding: 20px;
}
.map {
  width: 100%;
  height: 480px;
}
.info-list {
  position: absolute;
  bottom: 10px;
  left: 0;
  height: 150px;
  width: 100%;
  color: white;
  padding: 0 20px;
}
.info-li {
  font-size: 16px;
}
.info-icon {
  width: 70px;
  height: 70px;
  background: url('./img/icon_back.png');
  color: #000;
  font-size: 30px;
  padding-left: 26px;
  line-height: 70px;
  margin-bottom: 2px;
  .iconfont {
    color: #000;
    font-size: 30px;
  }
}
.info-number {
  margin-bottom: 0px;
  span {
    font-size: 34px;
    font-family: 'LCD';
    color: #49d9fe;
  }
}

.info-per {
  color: #49d9fe;
  background: linear-gradient(to right, rgb(37, 95, 207) 0%, rgba(37, 95, 207, 0) 100%);
}

// .圆角矩形_2705_拷贝_4 {
//   background-image: -moz-linear-gradient( 0deg, rgb(37,95,207) 0%, rgba(37,95,207,0) 100%);
//   background-image: -webkit-linear-gradient( 0deg, rgb(37,95,207) 0%, rgba(37,95,207,0) 100%);
//   background-image: -ms-linear-gradient( 0deg, rgb(37,95,207) 0%, rgba(37,95,207,0) 100%);
//   opacity: 0.502;
//   position: absolute;
//   left: 665px;
//   top: 991px;
//   width: 171px;
//   height: 30px;
//   z-index: 252;
// }
</style>
