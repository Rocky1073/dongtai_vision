<template>
  <div class="panel">
    <div class="content" flex="dir:left cross:center">
      <div class="rollNum-roll-icon">
        <!--转圈的圆形-->
        <roll-animation>
          <img :src="imgsrc" alt />
        </roll-animation>
      </div>
      <div class="total-panel">
        <div class="num">{{ sourceList[0] }}</div>
        <div class="text">设备总数</div>
      </div>
      <div style="margin-left: 70px;width:100%;padding-right:20px;" flex="dir:left cross:center main:justify">
        <div class="alarm-panel" flex="dir:left cross:center">
          <div class="text">告警设备</div>
          <div class="num">{{ sourceList[1] }}</div>
        </div>
        <div class="outline-panel" flex="dir:left cross:center">
          <div class="text">离线设备</div>
          <div class="num">{{ sourceList[2] }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import RollAnimation from '@/components/filesDispose/rollNum/rollAnimation/rollAnimation';
import { getDeviceState } from '@/services/IntelligentAnalytics.js';

export default {
  name: 'equipmentNum',
  components: {
    RollAnimation,
  },
  data() {
    return { imgsrc: require('./img/tuceng.png'), interval: '', sourceList: [] };
  },
  mounted() {
    this.cycleTime(this.optionCode);
  },
  computed: {
    optionCode() {
      return this.$store.state.optionCode;
    },
  },
  watch: {
    optionCode: function(val) {
      this.cycleTime(val);
    },
  },
  methods: {
    cycleTime(placecode) {
      clearInterval(this.interval);
      this.acquire(placecode);
      this.interval = setInterval(() => this.acquire(placecode), SCREEN_CONFIG.setTimer);
    },
    acquire(placecode) {
      getDeviceState({ placecode, _t: new Date().getTime() }).then(({ code, result }) => {
        if (code === '0') {
          const { count } = result;
          this.sourceList = [count.sumCount, count.alarmSumCount, count.offlineSumCount];
        }
      });
    },
  },
};
</script>

<style scoped lang="less">
.panel {
  height: 128px;
  width: 638px;
  margin-left: 20px;
  margin-top: 56px;
  .content {
    width: 100%;
    height: 100%;
    background: url('img/background.png') no-repeat;
    background-size: 100% 100%;
    position: relative;
    .rollNum-roll-icon {
      width: 63px;
      height: 63px;
      margin-left: 24px;
      ::v-deep.leijiicon {
        width: 22px;
      }
    }
    .total-panel {
      margin-left: 16px;
      min-width: 80px;
      .text {
        font-family: BigYoungMedium;
        font-size: 18px;
        color: #ffffff;
      }
      .num {
        font-family: LCD;
        font-size: 42px;
        color: #49d9fe;
      }
    }
    .alarm-panel {
      background: url('img/gaojing.png') no-repeat 1px;
      background-color: #1c195c;
      border-radius: 14px;
      padding-right: 20px;
    }
    .outline-panel {
      background: url('img/lixian.png') no-repeat 1px;
      background-color: #1c195c;
      border-radius: 14px;
      padding-right: 20px;
    }
    .alarm-panel,
    .outline-panel {
      .text {
        padding-left: 36px;
        font-family: BigYoungMedium;
        font-size: 16px;
        color: #ffffff;
      }
      .num {
        font-family: LCD;
        font-size: 26px;
        color: #49d9fe;
        margin-left: 16px;
        line-height: 28px;
      }
    }
  }
}
</style>
