<template>
  <div class="building">
    <div class="header">违章监控点TOP3</div>
    <div class="body">
      <ul class="building-list">
        <li class="building-li" v-for="(item, index) in list" :key="index">
          <div class="image">
            <img :src="item.path" alt />
          </div>
          <div class="info">
            <p>【违规类型】{{ item.type }}</p>
            <p>【违规地点】{{ item.address }}</p>
            <p>
              【违规次数】
              <span>{{ item.times }}次</span>
            </p>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { videoTop3 } from '@/services/IntelligentAnalytics.js';

export default {
  name: 'illegalBuilding',
  data() {
    return {
      list: [
        { path: require('./img/3.jpg'), type: '机动车违停', address: '某大厦1楼', times: '130' },
        { path: require('./img/2.jpg'), type: '垃圾堆放', address: '白鹿鞋城', times: '106' },
        { path: require('./img/1.jpg'), type: '非机动车违停', address: '底楼', times: '84' },
      ],
    };
  },
  mounted() {
    this.getList();
  },
  methods: {
    getList() {
      videoTop3().then(({ code, result }) => {
        if (code === 0 && result?.length > 0) this.list = result;
      });
    },
  },
};
</script>

<style lang="less" scoped>
.building {
  margin: 16px 0 0 20px;
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
.body {
  width: 592px;
  height: 410px;
  background: url('./img/back3.png') no-repeat;
  padding: 10px;
  background-size: contain;
}
.building-list {
  padding: 10px;
}
.building-li {
  display: flex;
  border: 1px solid #0c3bb1;
  background-color: rgba(27, 22, 87, 0.8);
  color: #a09eb7;
  margin-bottom: 10px;
  .image {
    width: 200px;
    height: 120px;
    img {
      width: 100%;
      height: 100%;
    }
  }
  .info {
    padding: 16px 10px 0 10px;
  }
  p {
    margin: 0 0 12px 0;
    span {
      color: #a03a55;
    }
    &:last-child {
      margin: 0;
    }
  }
}
</style>
