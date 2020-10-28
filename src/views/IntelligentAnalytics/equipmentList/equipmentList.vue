<template>
  <div class="equipment">
    <div class="header">高亭城区-设备设施</div>
    <div class="box">
      <ul class="equipment-list">
        <li class="equipment-li" v-for="(item, index) in equipments" :key="index">
          <div class="equipment-icon">
            <span class="iconfont" :class="item.icon"></span>
          </div>
          <div class="equipment-number">
            <p>正常：{{ item.normal }}</p>
            <p>总数：{{ item.total }}</p>
          </div>
          <div class="equipment-name">{{ item.name }}</div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { equipment, getDeviceState } from '@/services/IntelligentAnalytics.js';

export default {
  name: 'equipmentList',
  data() {
    return {
      equipments: [
        { name: '视频监控', icon: 'icon-shexiangtou', total: 60, normal: 60, deviceType: 'sp' },
        { name: '高空瞭望', icon: 'icon-wangyuanj', total: 4, normal: 4, deviceType: 'gklw' },
        { name: '执法车辆', icon: 'icon-che', total: 12, normal: 12 },
        { name: '单兵', icon: 'icon-shouchidanbing', total: 32, normal: 32, deviceType: 'db' },
        { name: '移动终端', icon: 'icon-yidongzhongduan', total: 164, normal: 160, deviceType: 'mobile' },
        { name: '车载一体机', icon: 'icon-shebei1', total: 20, normal: 16, deviceType: 'cz' },
        { name: '智能路灯', icon: 'icon-ludeng', total: 0, normal: 0 },
        { name: '消防栓', icon: 'icon-xiaofangshuan', total: 94, normal: 68, deviceType: 'fire' },
        { name: '智能窨井盖', icon: 'icon-manhole-cover', total: 54, normal: 50, deviceType: '3' },
        { name: '水位监测', icon: 'icon-shuiweijiance', total: 60, normal: 58, deviceType: '8' },
        { name: '智能垃圾箱', icon: 'icon-shanchulaji', total: 30, normal: 28, deviceType: '7' },
        { name: '公共自行车', icon: 'icon-sgongxiangdanche', total: 30, normal: 10, deviceType: 'bike' },
      ],
    };
  },
  methods: {
    getNumber() {
      equipment().then(({ code, result }) => {
        if (code !== 0) return;
        this.equipments = this.equipments.map(item => {
          const obj = result.filter(tar => tar.name === item.name);
          if (obj.length) return { ...item, total: obj[0].allnum, normal: obj[0].realnum };
          return { ...item };
        });
      });
    },
  },
  mounted() {
    this.getNumber();
  },
};
</script>

<style lang="less" scoped>
.equipment {
  margin: 0 0 0 20px;
  width: 592px;
}

.header {
  height: 45px;
  background: url('./img/title_back.png');
  width: 266px;
  font-size: 24px;
  color: white;
  text-align: center;
  line-height: 45px;
  margin-bottom: 10px;
  font-weight: 600;
}

.box {
  height: 340px;
  width: 100%;
  background: url('./img/back2.png') no-repeat;
  padding: 10px 14px;
}

.equipment-list {
  margin: 0;
  padding: 0;
  list-style: none;
  display: flex;
  flex-wrap: wrap;
  padding-top: 8px;
}

.equipment-li {
  width: 88px;
  height: 150px;
  border: 1px solid rgb(12, 59, 177);
  background-color: rgba(27, 22, 87, 0.8);
  color: #49d9fe;
  font-size: 14px;
  text-align: center;
  margin-right: 6px;
  margin-bottom: 8px;
}
.equipment-icon {
  text-align: center;
  height: 70px;
  span {
    font-size: 40px;
    text-shadow: 0px 0px 8px #49d9fe;
  }
}
.equipment-number {
  margin-bottom: 6px;
}
.equipment-name {
  height: 30px;
  width: 100%;
  background: #1c7dfa;
  color: #000;
  line-height: 30px;
}
</style>
