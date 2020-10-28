<template>
  <div id="screen">
    <div class="content">
      <!--头部-->
      <Header></Header>
      <!--头部-->
      <div class="main-body">
        <div>
          <div class="generalize-score">
            <div class="head">
              <img src="@/assets/images/generalize-score.png" alt="" draggable="false" />
              <div class="dimension">
                <div :class="[generalizeScore === 0 ? 'active' : '']" @click="getDimension('generalizeScore', 0)">
                  <span>总计</span>
                  <div class="bottom-line" v-if="generalizeScore === 0"></div>
                </div>
                <div :class="[generalizeScore === 1 ? 'active' : '']" @click="getDimension('generalizeScore', 1)">
                  <span>本日</span>
                  <div class="bottom-line" v-if="generalizeScore === 1"></div>
                </div>
                <div :class="[generalizeScore === 2 ? 'active' : '']" @click="getDimension('generalizeScore', 2)">
                  <span>本周</span>
                  <div class="bottom-line" v-if="generalizeScore === 2"></div>
                </div>
                <div :class="[generalizeScore === 3 ? 'active' : '']" @click="getDimension('generalizeScore', 3)">
                  <span>本月</span>
                  <div class="bottom-line" v-if="generalizeScore === 3"></div>
                </div>
              </div>
            </div>
            <div class="generalize-score-content">
              <div>
                <div v-for="(item, i) in scopeList" :key="i">
                  <img src="@/assets/images/first.png" alt="" draggable="false" v-if="i === 0" />
                  <img src="@/assets/images/second.png" alt="" draggable="false" v-else-if="i === 1" />
                  <img src="@/assets/images/third.png" alt="" draggable="false" v-else-if="i === 2" />
                  <div class="range" v-else>{{ i + 1 }}</div>
                  <span class="label" :title="item.place">{{ item.place }}</span>
                  <div class="progress-outer">
                    <div class="progress-inner" :style="{ width: `${item.score}%` }"></div>
                  </div>
                  <span class="percentage">{{ item.score }}/100</span>
                </div>
              </div>
            </div>
          </div>
          <div class="most-progress" :style="{ marginTop: '36px' }">
            <div class="head">
              <img src="@/assets/images/most-progress.png" alt="" draggable="false" />
              <div class="dimension">
                <div :class="[mostProgress === 2 ? 'active' : '']" @click="getDimension('mostProgress', 2)">
                  <span>本周</span>
                  <div class="bottom-line" v-if="mostProgress === 2"></div>
                </div>
                <div :class="[mostProgress === 3 ? 'active' : '']" @click="getDimension('mostProgress', 3)">
                  <span>本月</span>
                  <div class="bottom-line" v-if="mostProgress === 3"></div>
                </div>
              </div>
            </div>
            <div class="most-progress-content">
              <div class="bar">
                <span>— {{ progressList.place }} —</span>
                <span>进步分：+{{ progressList.def }}</span>
              </div>
              <div id="stack-bar" ref="stack-bar"></div>
            </div>
          </div>
        </div>
        <div :style="{ marginLeft: '30px' }">
          <div class="city-generalize">
            <div class="head">
              <img src="@/assets/images/city-generalize.png" alt="" draggable="false" />
              <div class="dimension">
                <div :class="[cityGeneralize === 0 ? 'active' : '']" @click="getDimension('cityGeneralize', 0)">
                  <span>总计</span>
                  <div class="bottom-line" v-if="cityGeneralize === 0"></div>
                </div>
                <div :class="[cityGeneralize === 1 ? 'active' : '']" @click="getDimension('cityGeneralize', 1)">
                  <span>本日</span>
                  <div class="bottom-line" v-if="cityGeneralize === 1"></div>
                </div>
                <div :class="[cityGeneralize === 2 ? 'active' : '']" @click="getDimension('cityGeneralize', 2)">
                  <span>本周</span>
                  <div class="bottom-line" v-if="cityGeneralize === 2"></div>
                </div>
                <div :class="[cityGeneralize === 3 ? 'active' : '']" @click="getDimension('cityGeneralize', 3)">
                  <span>本月</span>
                  <div class="bottom-line" v-if="cityGeneralize === 3"></div>
                </div>
              </div>
            </div>
            <div class="city-generalize-content">
              <div class="description">
                城市公共文明建设，是衡量一个城市文明程度的重要标尺，是文明城市创建和精神文明建设的重要内容和基础工作，也是一个城市整体形象的重要体现。加强城市公共文明建设，营造整洁优美的城市环境，建设文明和谐的公共秩序，倡树互助友爱的人际关系，开展进步奉献的.
              </div>
              <div class="index">
                <span :class="[cityIndex === 'WmScore' ? 'index-active' : '']" @click="changeIndex('cityIndex', 'WmScore')">
                  <div>
                    <img src="@/assets/images/civilization.png" alt="" draggable="false" />
                    <span>文明指数</span>
                  </div>
                </span>
                <span :class="[cityIndex === 'ZjScore' ? 'index-active' : '']" @click="changeIndex('cityIndex', 'ZjScore')">
                  <div>
                    <img src="@/assets/images/tidy.png" alt="" draggable="false" />
                    <span>整洁指数</span>
                  </div>
                </span>
                <span :class="[cityIndex === 'LsScore' ? 'index-active' : '']" @click="changeIndex('cityIndex', 'LsScore')">
                  <div>
                    <img src="@/assets/images/health.png" alt="" draggable="false" />
                    <span>绿色指数</span>
                  </div>
                </span>
                <span :class="[cityIndex === 'AqScore' ? 'index-active' : '']" @click="changeIndex('cityIndex', 'AqScore')">
                  <div>
                    <img src="@/assets/images/safety.png" alt="" draggable="false" />
                    <span>安全指数</span>
                  </div>
                </span>
                <span :class="[cityIndex === 'XlScore' ? 'index-active' : '']" @click="changeIndex('cityIndex', 'XlScore')">
                  <div>
                    <img src="@/assets/images/efficiency.png" alt="" draggable="false" />
                    <span>效率指数</span>
                  </div>
                </span>
              </div>
              <div class="rate">
                <div v-for="(item, index) in cityScopeList" :key="index">
                  <span class="text" :title="item.place">{{ item.place }}</span>
                  <div>
                    <template v-for="target in scope">
                      <img src="@/assets/images/checked.png" alt="" draggable="false" v-if="item[cityIndex] >= target" />
                      <img src="@/assets/images/check.png" alt="" draggable="false" v-else />
                    </template>
                  </div>
                  <span>{{ item.score }}</span>
                </div>
              </div>
            </div>
          </div>
          <div class="trend" :style="{ marginTop: '36px' }">
            <div class="head">
              <img src="@/assets/images/trend.png" alt="" draggable="false" />
              <div class="dimension">
                <div :class="[trend === 1 ? 'active' : '']" @click="getDimension('trend', 1)">
                  <span>日</span>
                  <div class="bottom-line" v-if="trend === 1"></div>
                </div>
                <div :class="[trend === 2 ? 'active' : '']" @click="getDimension('trend', 2)">
                  <span>周</span>
                  <div class="bottom-line" v-if="trend === 2"></div>
                </div>
                <div :class="[trend === 3 ? 'active' : '']" @click="getDimension('trend', 3)">
                  <span>月</span>
                  <div class="bottom-line" v-if="trend === 3"></div>
                </div>
              </div>
            </div>
            <div class="trend-content">
              <div class="index">
                <span
                  :class="[trendIndex === '文明指数' ? 'index-active' : '']"
                  @click="changeIndex('trendIndex', '文明指数')"
                  >文明指数</span
                >
                <span
                  :class="[trendIndex === '整洁指数' ? 'index-active' : '']"
                  @click="changeIndex('trendIndex', '整洁指数')"
                  >整洁指数</span
                >
                <span
                  :class="[trendIndex === '绿色指数' ? 'index-active' : '']"
                  @click="changeIndex('trendIndex', '绿色指数')"
                  >绿色指数</span
                >
                <span
                  :class="[trendIndex === '安全指数' ? 'index-active' : '']"
                  @click="changeIndex('trendIndex', '安全指数')"
                  >安全指数</span
                >
                <span
                  :class="[trendIndex === '效率指数' ? 'index-active' : '']"
                  @click="changeIndex('trendIndex', '效率指数')"
                  >效率指数</span
                >
              </div>
              <div id="line" ref="line"></div>
            </div>
          </div>
        </div>
        <div class="region-compare" :style="{ marginLeft: '30px' }">
          <div class="head">
            <img src="@/assets/images/region-compare.png" alt="" draggable="false" />
            <div class="dimension">
              <div :class="[regionCompare === 0 ? 'active' : '']" @click="getDimension('regionCompare', 0)">
                <span>总计</span>
                <div class="bottom-line" v-if="regionCompare === 0"></div>
              </div>
              <div :class="[regionCompare === 1 ? 'active' : '']" @click="getDimension('regionCompare', 1)">
                <span>本日</span>
                <div class="bottom-line" v-if="regionCompare === 1"></div>
              </div>
              <div :class="[regionCompare === 2 ? 'active' : '']" @click="getDimension('regionCompare', 2)">
                <span>本周</span>
                <div class="bottom-line" v-if="regionCompare === 2"></div>
              </div>
              <div :class="[regionCompare === 3 ? 'active' : '']" @click="getDimension('regionCompare', 3)">
                <span>本月</span>
                <div class="bottom-line" v-if="regionCompare === 3"></div>
              </div>
            </div>
          </div>
          <div class="region-compare-content">
            <el-checkbox-group v-model="checkList" class="bar" @change="onChangePlaceCode">
              <el-checkbox :label="item.name" v-for="item in placeCodeList"></el-checkbox>
            </el-checkbox-group>
            <div id="radar" ref="radar"></div>
            <div class="table">
              <div class="table-head">
                <div class="column">指数表</div>
                <span>文明<br />指数</span>
                <span>整洁<br />指数</span>
                <span>绿色<br />指数</span>
                <span>安全<br />指数</span>
                <span>效率<br />指数</span>
              </div>
              <div class="table-tr" v-for="item in areaList">
                <div class="column" :title="item.place">{{ item.place }}</div>
                <span :class="(item.WmScore >= 80 ? 'pass' : '', item.WmScore < 60 ? 'failed' : '')">{{
                  item.WmScore
                }}</span>
                <span :class="(item.ZjScore >= 80 ? 'pass' : '', item.ZjScore < 60 ? 'failed' : '')">{{
                  item.ZjScore
                }}</span>
                <span :class="(item.LsScore >= 80 ? 'pass' : '', item.LsScore < 60 ? 'failed' : '')">{{
                  item.LsScore
                }}</span>
                <span :class="(item.AqScore >= 80 ? 'pass' : '', item.AqScore < 60 ? 'failed' : '')">{{
                  item.AqScore
                }}</span>
                <span :class="(item.XlScore >= 80 ? 'pass' : '', item.XlScore < 60 ? 'failed' : '')">{{
                  item.XlScore
                }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Header from '@/components/Header/Header';
import { allScoreRank, areaContrast, cityIndex, mostBetter, placeCode, trendChange } from '@/services/CityAnalytics.js';

export default {
  name: 'CityAnalytics',
  components: { Header },
  data() {
    return {
      generalizeScore: 0,
      mostProgress: 2,
      cityGeneralize: 0,
      trend: 1,
      regionCompare: 0,
      // 城市编码
      placeCodeList: [],
      // 综合得分排名
      scopeList: [],
      // 进步最大
      progressList: [],
      // 城市体征综合指数
      cityScopeList: [],
      cityIndex: 'WmScore',
      // 趋势变化
      trendList: [],
      trendIndex: '文明指数',
      // 区域对比
      areaList: [],
      scope: [10, 20, 30, 40, 50, 60, 70, 80, 90, 100],
      checkList: [],
      // graph
      stackBar: undefined,
      line: undefined,
      radar: undefined,
    };
  },
  methods: {
    getDimension(text, index) {
      this[text] = index;
      let type = '';
      if (index === 1) type = 'day';
      else if (index === 2) type = 'week';
      else if (index === 3) type = 'month';
      if (text === 'generalizeScore') this.getAllScoreRank(type);
      else if (text === 'mostProgress') this.getMostProgress(type);
      else if (text === 'cityGeneralize') this.getCityIndex(type);
      else if (text === 'trend') this.getTrendChange(type);
      else if (text === 'regionCompare') this.getAreaContrast(type);
    },
    changeIndex(text, index) {
      this[text] = index;
      if (text === 'trendIndex') {
        const params = { type: 'line', symbol: 'circle', symbolSize: 8 };
        this.line.setOption({
          series: [
            { ...params, name: '东台镇', data: this.trendList[this.trendIndex][0] },
            { ...params, name: '启平街道', data: this.trendList[this.trendIndex][1] },
            { ...params, name: '新东街道', data: this.trendList[this.trendIndex][2] },
            { ...params, name: '金海街道', data: this.trendList[this.trendIndex][3] },
            { ...params, name: '城东新区街道', data: this.trendList[this.trendIndex][4] },
            { ...params, name: '五烈镇', data: this.trendList[this.trendIndex][5] },
            { ...params, name: '经济开发区', data: this.trendList[this.trendIndex][6] },
            { ...params, name: '西溪景区', data: this.trendList[this.trendIndex][7] },
          ],
        });
      }
    },
    onChangePlaceCode(value) {
      let type = '';
      if (this.regionCompare === 1) type = 'day';
      else if (this.regionCompare === 2) type = 'week';
      else if (this.regionCompare === 3) type = 'month';
      this.getAreaContrast(type);
    },
    // 城市编码
    getPlaceCode() {
      placeCode().then(({ code, result }) => {
        if (code !== 0) return;
        this.placeCodeList = result;
      });
    },
    // 综合得分排名
    getAllScoreRank(type) {
      allScoreRank({ type }).then(({ code, result }) => {
        if (code !== 0) return;
        this.scopeList = result;
      });
    },
    // 进步最大
    getMostProgress(type) {
      mostBetter({ type }).then(({ code, result }) => {
        if (code !== 0) return;
        this.progressList = result;
        let name = '周';
        if (this.mostProgress === 3) name === '月';
        this.stackBar.setOption({
          tooltip: { trigger: 'axis', axisPointer: { type: 'shadow' } },
          grid: { top: '5%', right: '5%', bottom: '5%', left: '5%', containLabel: true },
          xAxis: [
            {
              type: 'value',
              axisLabel: { textStyle: { color: '#49d9fe', fontSize: 14 } },
              axisTick: { show: false },
              axisLine: { lineStyle: { color: '#49d9fe' } },
              splitLine: { show: true, lineStyle: { type: 'dashed', color: '#49d9fe' } },
            },
          ],
          yAxis: [
            {
              type: 'category',
              axisLabel: { textStyle: { color: '#49d9fe', fontSize: 14 } },
              axisTick: { show: false },
              axisLine: { show: false },
              splitLine: { show: true, lineStyle: { type: 'dashed', color: '#49d9fe' } },
              data: ['文明指数', '整洁指数', '绿色指数', '安全指数', '效率指数'],
            },
          ],
          series: [
            {
              name: `上${name}`,
              type: 'bar',
              label: { show: true, position: 'inside' },
              itemStyle: { color: '#49d9fe' },
              data: [result.WmScore1, result.ZjScore1, result.LsScore1, result.AqScore1, result.XlScore1],
            },
            {
              name: `本${name}`,
              type: 'bar',
              label: { show: true, position: 'inside' },
              itemStyle: { color: '#fed700' },
              data: [result.WmScore2, result.ZjScore2, result.LsScore2, result.AqScore2, result.XlScore2],
            },
          ],
        });
      });
    },
    // 城市体征综合指数
    getCityIndex(type) {
      cityIndex({ type }).then(({ code, result }) => {
        if (code !== 0) return;
        this.cityScopeList = result;
      });
    },
    // 趋势变化
    getTrendChange(type) {
      trendChange({ type }).then(({ code, result }) => {
        if (code !== 0) return;
        const resultFormat = {};
        result.forEach(item => {
          const keys = Object.keys(item);
          keys.forEach(t => {
            resultFormat[t] = item[t];
          });
        });
        let keys = Object.keys(resultFormat);
        let xAxis = [];
        let yAxis = { 文明指数: [], 整洁指数: [], 绿色指数: [], 安全指数: [], 效率指数: [] };
        for (let i = 0; i < resultFormat[keys[0]].length; i++) {
          const item = resultFormat[keys[0]][i];
          xAxis.push(item.time);
        }
        for (let i = 0; i < keys.length; i++) {
          yAxis[this.trendIndex][i] = resultFormat[keys[i]].map(item => item.WmScore);
          yAxis['整洁指数'][i] = resultFormat[keys[i]].map(item => item.ZjScore);
          yAxis['绿色指数'][i] = resultFormat[keys[i]].map(item => item.LsScore);
          yAxis['安全指数'][i] = resultFormat[keys[i]].map(item => item.AqScore);
          yAxis['效率指数'][i] = resultFormat[keys[i]].map(item => item.XlScore);
        }
        this.trendList = yAxis;
        const params = { type: 'line', symbol: 'circle', symbolSize: 8 };
        this.line.setOption({
          tooltip: { trigger: 'axis' },
          legend: { data: keys, top: 0, right: 0, textStyle: { color: '#93c9ff' } },
          grid: { top: '20%', left: 0, right: 0, bottom: 0, containLabel: true },
          xAxis: {
            type: 'category',
            data: xAxis,
            axisLabel: {
              interval: 0,
              textStyle: { color: '#93c9ff', fontStyle: 'normal', fontFamily: '微软雅黑', fontSize: 12 },
            },
            axisTick: { show: false },
            axisLine: { lineStyle: { color: '#00c0ff' } },
          },
          yAxis: [
            {
              type: 'value',
              splitNumber: 3,
              axisLabel: { textStyle: { color: '#93c9ff', fontStyle: 'normal', fontFamily: '微软雅黑', fontSize: 12 } },
              axisLine: { show: false },
              axisTick: { show: false },
              splitLine: { show: true, lineStyle: { type: 'dashed', color: '#00c0ff' } },
            },
          ],
          series: [
            { ...params, name: '东台镇', data: yAxis[this.trendIndex][0] },
            { ...params, name: '启平街道', data: yAxis[this.trendIndex][1] },
            { ...params, name: '新东街道', data: yAxis[this.trendIndex][2] },
            { ...params, name: '金海街道', data: yAxis[this.trendIndex][3] },
            { ...params, name: '城东新区街道', data: yAxis[this.trendIndex][4] },
            { ...params, name: '五烈镇', data: yAxis[this.trendIndex][5] },
            { ...params, name: '经济开发区', data: yAxis[this.trendIndex][6] },
            { ...params, name: '西溪景区', data: yAxis[this.trendIndex][7] },
          ],
        });
      });
    },
    // 区域对比
    getAreaContrast(type) {
      areaContrast({
        type,
        placecode: this.placeCodeList
          .filter(item => this.checkList.includes(item.name))
          .map(item => item.code)
          .join(),
      }).then(({ code, result }) => {
        if (code !== 0) return;
        this.areaList = result;
        if (!result.length) return;
        const color = [
          '55, 162, 218',
          '255, 219, 92',
          '103, 224, 227',
          '251, 114, 147',
          '255, 159, 127',
          '224, 98, 174',
          '131, 120, 234',
          '231, 188, 243',
        ];
        this.radar.setOption({
          tooltip: {},
          radar: [
            {
              indicator: [
                { text: '文明指数' },
                { text: '整洁指数' },
                { text: '绿色指数' },
                { text: '安全指数' },
                { text: '效率指数' },
              ],
              // radius: 120,
              startAngle: 90,
              splitNumber: 4,
              shape: 'circle',
              name: { formatter: '【{value}】', textStyle: { color: '#FFFFFF' } },
              splitArea: {
                areaStyle: {
                  color: [
                    'rgba(45, 97, 236, 0.2)',
                    'rgba(45, 97, 236, 0.4)',
                    'rgba(45, 97, 236, 0.6)',
                    'rgba(45, 97, 236, 0.8)',
                    'rgba(45, 97, 236, 1)',
                  ],
                  shadowColor: 'rgba(0, 0, 0, 0.3)',
                  shadowBlur: 10,
                },
              },
            },
          ],
          series: [
            {
              name: '雷达图',
              type: 'radar',
              data: result.map((item, i) => ({
                symbolSize: 5,
                name: item.place,
                value: [item.WmScore, item.ZjScore, item.LsScore, item.AqScore, item.XlScore],
                itemStyle: { color: `rgba${color[i]}` },
                lineStyle: { color: `rgba${color[i]}`, width: 3 },
                areaStyle: { color: `rgba(${color[i]}, 0.4)` },
              })),
            },
          ],
        });
      });
    },
  },
  mounted() {
    document.title = '城市运行体征专题';
    this.line = echarts.init(document.getElementById('line'));
    this.stackBar = echarts.init(document.getElementById('stack-bar'));
    this.radar = echarts.init(document.getElementById('radar'));
    this.getPlaceCode();
    this.getAllScoreRank(); // 综合得分排名
    this.getMostProgress('week'); // 进步最大
    this.getCityIndex(); // 城市体征综合指数
    this.getTrendChange('day'); // 趋势变化
    this.getAreaContrast(); // 区域对比
    // todo
    window.addEventListener('resize', () => {
      this.stackBar.resize();
      this.line.resize();
      this.radar.resize();
    });
  },
};
</script>

<style scoped lang="less">
@import 'CityAnalytics';
</style>
