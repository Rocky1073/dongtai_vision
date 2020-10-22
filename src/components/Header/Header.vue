<template>
  <div class="header" flex="dir:left">
    <!--中间的icon-->
    <div class="header-left" flex="main:center cross:center">金开区运行驾驶舱</div>
    <div class="header-nav" flex="main:center cross:top">
      <div class="nav-icon nav">
        <template v-if="zhddChildren.includes($route.name)">
          <img src="image/zhcg-a.png" alt="" draggable="false" />
          <img data-v-3aa2c809="" src="image/active.png" alt="" class="active" draggable="false" />
        </template>
        <a draggable="false" href="#/jurisdiction" v-else>
          <img src="image/zhcg.png" alt="" draggable="false" />
        </a>
      </div>
      <div class="nav-icon nav">
        <img src="image/zhzf.png" alt="" draggable="false" />
      </div>
      <div class="nav-icon nav">
        <img src="image/khpj.png" alt="" draggable="false" />
      </div>
      <div class="nav-icon nav">
        <img src="image/spzp.png" alt="" draggable="false" />
      </div>
      <div class="nav-icon nav">
        <template v-if="$route.name === 'Dispatch'">
          <img src="image/zhdd-a.png" alt="" draggable="false" />
          <img data-v-3aa2c809="" src="image/active.png" alt="" class="active" draggable="false" />
        </template>
        <a draggable="false" href="#/dispatch" v-else>
          <img src="image/zhdd.png" alt="" draggable="false" />
        </a>
      </div>
      <div flex="main:center" class="nav-menu" v-if="zhddChildren.includes($route.name)">
        <a draggable="false" href="#/jurisdiction" :style="{ color: $route.name === 'Jurisdiction' ? '#fff' : '' }"
          >【&nbsp;辖区概况&nbsp;】</a
        >
        <a draggable="false" href="#/map" :style="{ color: $route.name === 'Map' ? '#fff' : '' }"
          >【&nbsp;一图管城&nbsp;】</a
        >
        <a draggable="false" href="#/exhibition" :style="{ color: $route.name === 'Exhibition' ? '#fff' : '' }"
          >【&nbsp;专题展示&nbsp;】</a
        >
        <a draggable="false" href="files.html">【&nbsp;案卷处理&nbsp;】</a>
      </div>
      <!--左右的滚动箭头-->
      <div class="nav-left-zuo">
        <div class="zuo" flex="dir:left"></div>
      </div>
      <div class="nav-left-you"></div>
      <!--左右的滚动箭头-->
      <!--中间的横线-->
      <div class="nav-border-mid">
        <img src="image/nav-border.png" alt="" draggable="false" />
      </div>
      <!--中间的横线-->
    </div>
    <div class="header-right" flex=" main:center cross:center">
      <div class="time>" flex="dir:left main:center cross:center">
        <div class="years" flex="dir:left">
          <div class="year">{{ year }}</div>
          <span style="margin: 0 5px;">-</span>
          <div class="month">{{ month }}</div>
          <span style="margin: 0 5px;">-</span>
          <div class="day">{{ day }}</div>
        </div>
        <div class="hour" flex="dir:left">
          <div class="hours">{{ hours }}</div>
          <span style="margin: 0 5px;">:</span>
          <div class="minutes">{{ minutes }}</div>
          <span style="margin: 0 5px;">:</span>
          <div class="seconds">{{ seconds }}</div>
        </div>
        <div class="week">{{ week }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import moment from 'moment';

export default {
  name: 'Header',
  data() {
    return {
      zhddChildren: ['CityAnalytics', 'IntelligentAnalytics', 'StreetAnalysis'],
      interval: undefined,
      year: '',
      month: '',
      day: '',
      hours: '',
      minutes: '',
      seconds: '',
      week: '',
    };
  },
  mounted() {
    const time = moment();
    function week(string) {
      if (string === '1') return '周一';
      else if (string === '2') return '周二';
      else if (string === '3') return '周三';
      else if (string === '4') return '周四';
      else if (string === '5') return '周五';
      else if (string === '6') return '周六';
      else if (string === '7') return '周日';
    }
    this.interval = setInterval(() => {
      this.year = time.format('YYYY');
      this.month = time.format('MM');
      this.day = time.format('DD');
      this.hours = time.format('HH');
      this.minutes = time.format('mm');
      this.seconds = time.format('ss');
      this.week = week(time.format('E'));
      time.add('second', 1);
    }, 1000);
  },
  beforeDestroy() {
    clearInterval(this.interval);
  },
};
</script>
