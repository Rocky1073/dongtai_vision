<template>
  <div class="analytics">
    <!--头部-->
    <Header></Header>
    <!--头部-->
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
</template>

<script>
import Header from '@/components/Header/Header';
import Quota from './quota/quota.vue';
import AlarmSort from './alarmSort/alarmSort.vue';
import RealtimeAlarm from './realtimeAlarm/realtimeAlarm.vue';
import EquipmentNum from './equipmentNum/equipmentNum.vue';
import EquipmentOnline from './equipmentOnline/equipmentOnline.vue';
import EquipmentList from './equipmentList/equipmentList.vue';
import IllegalBuilding from './illegalBuilding/illegalBuilding.vue';

export default {
  name: 'intelligentAnalytics',
  components: { Header, Quota, AlarmSort, RealtimeAlarm, EquipmentNum, EquipmentOnline, EquipmentList, IllegalBuilding },
  mounted() {
    document.title = '视频分析专题';
  },
};
</script>

<style scoped lang="less">
@import 'IntelligentAnalytics';
</style>
