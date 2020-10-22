<template>
  <div class="header" flex="dir:left">
    <!--中间的icon-->
    <div class="header-left" flex="main:center cross:center">金开区运行驾驶舱</div>
    <div class="header-nav" flex="main:center cross:top">
      <a href="control.html">
        <div class="nav-icon nav" flex="dir:top main:justify cross:center">
          <img src="image/xqgk.png" alt="" />
          <div class="icon-title" flex="main:center cross:center">辖区概况</div>
        </div>
      </a>
      <a href="files.html">
        <div class="nav-icon nav" flex="dir:top main:justify cross:center">
          <img src="image/zhcg.png" alt="" />
          <div class="icon-title" flex="main:center cross:center">智慧城管</div>
        </div>
      </a>
      <a href="zhzf.html">
        <div class="nav-icon nav" flex="dir:top main:justify cross:center">
          <img src="image/zhzf.png" alt="" />
          <div class="icon-title" flex="main:center cross:center">综合执法</div>
        </div>
      </a>
      <a href="#/city-analytics">
        <div class="nav-icon nav active" flex="dir:top main:justify cross:center">
          <img src="image/cstz-a.png" alt="" />
          <div class="icon-title" flex="main:center cross:center">城市体征</div>
        </div>
      </a>
      <a href="#/intelligent-analytics">
        <div class="nav-icon nav" flex="dir:top main:justify cross:center">
          <img src="image/dlhx.png" alt="" />
          <div class="icon-title" flex="main:center cross:center">道路画像</div>
        </div>
      </a>
      <a href="#/street-analysis">
        <div class="nav-icon nav" flex="dir:top main:justify cross:center">
          <img src="image/znfx.png" alt="" />
          <div class="icon-title" flex="main:center cross:center">智能分析</div>
        </div>
      </a>
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
    const weeks = ['周天', '周一', '周二', '周三', '周四', '周五', '周六'];
    this.interval = setInterval(() => {
      const time = new Date();
      this.year = time.format('YYYY');
      this.month = time.format('MM');
      this.day = time.format('DD');
      this.hours = time.format('HH');
      this.minutes = time.format('mm');
      this.seconds = time.format('ss');
      this.week = weeks[time.getDay()];
    }, 1000);
  },
  beforeDestroy() {
    clearInterval(this.interval);
  },
};
</script>

<style scope lang="less">
@import 'Header';
</style>
