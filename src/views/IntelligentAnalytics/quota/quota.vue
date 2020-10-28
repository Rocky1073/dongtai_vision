<template>
  <div class="panel">
    <div class="header">
      <div class="title" flex="cross:center main:center"></div>
    </div>
    <div class="card-item">
      <card-item v-for="(item, index) in sourceList" :data="item" class="item" :key="index"></card-item>
    </div>
  </div>
</template>

<script>
import CardItem from './item.vue';
import { indicators } from '@/services/IntelligentAnalytics.js';

export default {
  name: 'quota',
  components: { CardItem },
  data() {
    return { interval: '', sourceList: [] };
  },
  computed: {
    optionCode() {
      return this.$store.state.optionCode;
    },
  },
  mounted() {
    this.cycleTime(this.optionCode);
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
      indicators({ placecode }).then(({ code, result }) => {
        if (code === 0) {
          this.sourceList = [
            { title: '当月告警', num: result.month_warn },
            { title: '当日告警', num: result.day_warn },
            { title: '当月上报', num: result.month_sb },
            { title: '当日上报', num: result.day_sb },
          ];
        }
      });
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.panel {
  height: 183px;
  width: 591px;
  .header {
    width: 100%;
    height: 44px;
    margin-bottom: 12px;

    .title {
      width: 181px;
      height: 44px;
      background: url('img/title.png');
    }
  }
  .card-item {
    width: 100%;
    height: 127px;
    background: url('img/background.png') no-repeat;
    background-size: 100% 100%;
    padding-left: 20px;
    .item {
      margin-left: 20px;
      margin-top: 26px;
      &:first-child {
        margin-left: 0px;
      }
    }
  }
}
</style>
