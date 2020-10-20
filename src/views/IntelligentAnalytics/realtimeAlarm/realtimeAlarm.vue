<template>
  <div class="realtimeAlarm">
    <div class="realtimeAlarm_header" flex="main:right"></div>
    <div class="realtimeAlarm_content">
      <div class="ul-panel scroll-height">
        <happy-scroll color="#073ec8" size="5" resize>
          <ul style="width:548px;">
            <li v-for="(item, index) in tableDataList" class="ul-body" :key="index">
              <span>
                <i>{{ item.streetName }}</i>
              </span>
              <span>{{ item.time }}</span>
              <span>{{ item.address }}</span>
              <span>{{ item.type }}</span>
              <span v-if="item.statusName === '未处理'" style="color:#ff5959">{{ item.statusName }}</span>
              <span v-else>{{ item.statusName }}</span>
            </li>
          </ul>
        </happy-scroll>
      </div>
    </div>
  </div>
</template>

<script>
import { getRealTimeAlarmDataList } from '@/services/IntelligentAnalytics.js';

export default {
  name: 'realtimeAlarm',
  data() {
    return { type: 4, interval: '', tableDataList: [] };
  },
  created() {},
  mounted() {
    this.cycleTime();
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
      getRealTimeAlarmDataList({ placecode, _t: new Date().getTime() }).then(({ code, result }) => {
        if (code === '0') this.tableDataList = result;
      });
    },
  },
};
</script>

<style scoped lang="less">
.realtimeAlarm {
  width: 591px;
  height: 325px;
  /*margin-right: 30px;*/
  margin-top: 20px;
  .realtimeAlarm_header {
    width: 100%;
    height: 56px;
    background: url('./img/title.png') no-repeat;
  }
  .realtimeAlarm_content {
    width: 100%;
    height: 267px;
    background: url('./img/background.png') no-repeat;
    background-size: 100% 100%;
    padding: 18px 5px 0px 16px;
    .ul-panel {
      height: 240px;
      width: 570px;
      position: relative;
      li {
        height: 38px;
        line-height: 38px;
        margin-top: 4px;
        list-style-type: none;
        background-color: rgba(28, 125, 250, 0.2);
        &:first-child {
          margin-top: 0px;
        }
        span {
          display: inline-block;
          text-align: center;
          font-family: PingFang-SC-Medium;
          font-size: 14px;
          letter-spacing: 0px;
          color: #ffffff;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
          &:nth-child(1) {
            width: 80px;
            background: url('./img/table-one.png') no-repeat;
            color: #000000;
            i {
              display: block;
              text-align: left;
              padding-left: 10px;
            }
          }
          &:nth-child(2) {
            width: 80px;
          }
          &:nth-child(3) {
            width: 210px;
          }
          &:nth-child(4) {
            width: 100px;
            color: #ff5959;
          }
          &:nth-child(5) {
            width: 70px;
            color: #00c0ff;
          }
        }
      }
    }
  }
}
</style>
<style lang="less">
.realtimeAlarm {
  .scroll-height {
    .happy-scroll-container {
      height: 240px !important;
    }
  }
}
</style>
