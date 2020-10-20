<template>
  <div class="alarmSort">
    <div class="alarmSort_header" flex="main:right">
      <div class="navChartChange">
        <el-tabs v-model="activeName" @tab-click="handleClick">
          <el-tab-pane label="总计" name="总计"></el-tab-pane>
          <el-tab-pane label="本日" name="本日"></el-tab-pane>
          <el-tab-pane label="本周" name="本周"></el-tab-pane>
          <el-tab-pane label="本月" name="本月"></el-tab-pane>
        </el-tabs>
      </div>
    </div>
    <div class="sort_content" flex="dir:left">
      <div class="type-panel">
        <div style="height:100%;width:100%;padding-left:25px;" flex="main:center cross:center">
          <el-radio-group v-model="sjtype" @change="changeSJType">
            <el-radio label="01">事件</el-radio>
            <el-radio label="02">部件</el-radio>
          </el-radio-group>
        </div>
      </div>
      <div class="card-item">
        <div class="ul-panel scroll-height">
          <happy-scroll color="#073ec8" size="5" resize>
            <ul style="width:470px;">
              <li class="ul-header">
                <span>排名</span>
                <span>告警类型</span>
                <span>告警次数</span>
              </li>
              <li class="ul-body" v-for="(item, index) in tableDataList" :key="index">
                <span>
                  <i>{{ index + 1 }}</i>
                </span>
                <span>{{ item.type }}</span>
                <span>{{ item.num }}</span>
              </li>
            </ul>
          </happy-scroll>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getAlarmSortDataList } from '@/services/IntelligentAnalytics.js';

export default {
  name: 'alarmSort',
  data() {
    return { activeName: '总计', sjtype: '01', type: 4, interval: '', tableDataList: [] };
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
    handleClick(tab) {
      console.log(tab.label);
      if (tab.label === '本日') {
        this.type = 1;
      }
      if (tab.label === '本周') {
        this.type = 2;
      }
      if (tab.label === '本月') {
        this.type = 3;
      }
      if (tab.label === '总计') {
        this.type = 4;
      }
      this.cycleTime(this.optionCode);
    },
    changeSJType(val) {
      console.log('changeSJType', this.sjtype, val);
      this.cycleTime(this.optionCode);
    },
    cycleTime(placecode) {
      clearInterval(this.interval);
      this.acquire(placecode);
      this.interval = setInterval(() => this.acquire(placecode), SCREEN_CONFIG.setTimer);
    },
    acquire(placecode) {
      getAlarmSortDataList({ placecode, type: this.type, sjtype: this.sjtype, _t: new Date().getTime() }).then(
        ({ code, result }) => {
          if (code === '0') this.tableDataList = result;
        },
      );
    },
  },
};
</script>

<style scoped lang="less">
.alarmSort {
  width: 591px;
  height: 328px;
  /*margin-right: 30px;*/
  margin-top: 20px;
  .alarmSort_header {
    width: 100%;
    height: 56px;
    background: url('./img/title.png') no-repeat;
  }
  .sort_content {
    width: 100%;
    height: 272px;
    background: url('./img/background.png') no-repeat;
    background-size: 100% 100%;
    .type-panel {
      width: 93px;
      height: 257px;
      background-color: rgba(28, 125, 250, 0.2);
      margin-top: 10px;
      margin-left: 5px;
      ::v-deep.el-radio {
        color: #ffffff;
        &:last-child {
          margin-top: 30px;
        }
        .el-radio__inner {
          border: 1px solid #ffffff;
          background-color: transparent;
        }
        .el-radio__input.is-checked + .el-radio__label {
          color: #ffffff;
        }
        .el-radio__inner::after {
          width: 6px;
          height: 6px;
        }
      }
    }
    .card-item {
      height: 248px;
      width: 482px;
      margin-left: 5px;
      margin-top: 19px;
      .ul-panel {
        width: 100%;
        height: 100%;
        li {
          height: 40px;
          line-height: 40px;
          margin-top: 4px;
          list-style-type: none;
          &:first-child {
            margin-top: 0px;
          }
          span {
            display: inline-block;
            text-align: left;
            &:nth-child(1) {
              width: 120px;
              padding-left: 30px;
            }
            &:nth-child(2) {
              width: 250px;
            }
            &:nth-child(3) {
              width: 100px;
            }
          }
        }
        ul {
          .ul-header {
            background-color: rgba(7, 9, 60, 0.4);
            span {
              font-family: MicrosoftYaHei;
              font-size: 14px;
              letter-spacing: 0px;
              color: #6694fd;
            }
          }
          .ul-body {
            height: 38px;
            line-height: 38px;
            background-color: rgba(28, 125, 250, 0.2);
            span {
              font-family: PingFang-SC-Medium;
              font-size: 14px;
              letter-spacing: 0px;
              color: #ffffff;
              i {
                display: inline-block;
                width: 26px;
                height: 26px;
                border-radius: 26px;
                background-color: #00c0ff;
                color: #000000;
                text-align: center;
                vertical-align: middle;
                line-height: 26px;
                font-style: unset;
              }
            }
            &:nth-child(3) {
              i {
                background-color: #ff5959;
              }
            }
            &:nth-child(4) {
              i {
                background-color: #fe8900;
              }
            }
            &:nth-child(5) {
              i {
                background-color: #fed700;
              }
            }
          }
        }
      }
    }
  }
}
</style>
<style lang="less">
.alarmSort {
  .scroll-height {
    .happy-scroll-container {
      height: 250px !important;
    }
  }
}
</style>
<style lang="less">
.navChartChange {
  .el-tabs__header {
    margin: 22px 0px 0px 0px;
    z-index: 10;

    .el-tabs__item {
      font-size: 18px;
      color: #8f9ac2;
    }

    .is-active {
      color: #40cef9;
    }
  }

  .el-tabs__nav-wrap::after {
    background-color: transparent;
  }

  .el-tabs__active-bar {
    height: 4px;
    background-color: #ffe013;
  }
}
</style>
