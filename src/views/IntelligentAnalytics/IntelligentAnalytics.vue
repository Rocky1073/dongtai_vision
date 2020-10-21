<template>
  <div class="analytics">
    <div class="screen_header"></div>
    <div class="screen_content" flex="main:center">
      <div class="screen_main">
        <div class="intelligentAnalytics" flex>
          <div class="intelligentAnalytics_left" flex="dir:top">
            <quota></quota>
            <alarm-sort></alarm-sort>
            <realtime-alarm></realtime-alarm>
          </div>
          <div flex="dir:top">
            <equipment-num></equipment-num>
            <equipment-online></equipment-online>
          </div>
          <!-- <files-list></files-list> -->
          <div class="intelligentAnalytics_right">
            <equipment-list></equipment-list>
            <illegal-building></illegal-building>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Quota from './quota/quota.vue';
import AlarmSort from './alarmSort/alarmSort.vue';
import RealtimeAlarm from './realtimeAlarm/realtimeAlarm.vue';
import EquipmentNum from './equipmentNum/equipmentNum.vue';
import EquipmentOnline from './equipmentOnline/equipmentOnline.vue';
import EquipmentList from './equipmentList/equipmentList.vue';
import IllegalBuilding from './illegalBuilding/illegalBuilding.vue';

export default {
  name: 'intelligentAnalytics',
  components: {
    Quota,
    AlarmSort,
    RealtimeAlarm,
    EquipmentNum,
    EquipmentOnline,
    EquipmentList,
    IllegalBuilding,
  },
  mounted() {
    document.title = '视频分析专题';
  },
};
</script>

<style scoped lang="less">
@font-face {
  font-family: 'LCD';
  src: url('../../assets/fonts/GDR.TTF') format('truetype');
  font-weight: normal;
  font-style: normal;
}

@font-face {
  font-family: 'BigYoungMedium';
  src: url('../../assets/fonts/BIGYONG.TTF') format('truetype');
  font-weight: normal;
  font-style: normal;
}
.analytics {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  width: 1920px;
  height: 1080px;
  background: url('../../assets/img/blurred-bg.png');
  overflow: hidden;
}
.screen_header {
  height: 182px;
}
.screen_content {
  width: 100%;
  height: calc(100% - 182px);
  .screen_main {
    width: 1862px;
    height: 880px;
    overflow: hidden;
  }
}
.intelligentAnalytics {
  height: 100%;
  width: 100%;
}
</style>
