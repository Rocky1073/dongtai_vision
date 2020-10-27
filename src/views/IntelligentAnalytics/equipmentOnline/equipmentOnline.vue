<template>
  <div class="map-container">
    <div class="map">
      <ol-map @click-Back="clickPrint"></ol-map>
    </div>
    <ul data-v-01a27b6d="" flex="main:justify" class="info-list">
      <li data-v-01a27b6d="" class="info-li">
        <div data-v-01a27b6d="" class="info-icon"><span data-v-01a27b6d="" class="iconfont icon-lianjie1"></span></div>
        <div data-v-01a27b6d="" class="info-number">
          级联监控点<span data-v-01a27b6d="">{{ result.cz_sb }}</span>
        </div>
        <div data-v-01a27b6d="" class="info-per">在线率: {{ result.cz_sb_zxl }}%</div>
      </li>
      <li data-v-01a27b6d="" class="info-li">
        <div data-v-01a27b6d="" class="info-icon"><span data-v-01a27b6d="" class="iconfont icon-jianshejindu"></span></div>
        <div data-v-01a27b6d="" class="info-number">
          自建监控点<span data-v-01a27b6d="">{{ result.jl_jkd }}</span>
        </div>
        <div data-v-01a27b6d="" class="info-per">在线率: {{ result.jl_jkd_zxl }}%</div>
      </li>
      <li data-v-01a27b6d="" class="info-li">
        <div data-v-01a27b6d="" class="info-icon"><span data-v-01a27b6d="" class="iconfont icon-zhifajiluyi"></span></div>
        <div data-v-01a27b6d="" class="info-number">
          单兵作战<span data-v-01a27b6d="">{{ result.zj_jkd }}</span>
        </div>
        <div data-v-01a27b6d="" class="info-per">在线率: {{ result.zj_jkd_zxl }}%</div>
      </li>
      <li data-v-01a27b6d="" class="info-li">
        <div data-v-01a27b6d="" class="info-icon"><span data-v-01a27b6d="" class="iconfont icon-hangchejiluyi"></span></div>
        <div data-v-01a27b6d="" class="info-number">
          执法车辆<span data-v-01a27b6d="">{{ result.zx_jly }}</span>
        </div>
        <div data-v-01a27b6d="" class="info-per">在线率: {{ result.zx_jly_zxl }}%</div>
      </li>
    </ul>
  </div>
</template>

<script>
import olMap from '@/components/map/olMap';
import { indicatorsMap } from '@/services/IntelligentAnalytics.js';

export default {
  name: 'equipmentOnline',
  components: { olMap },
  data() {
    return { result: {} };
  },
  mounted() {
    indicatorsMap().then(({ result }) => {
      this.result = result;
    });
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
