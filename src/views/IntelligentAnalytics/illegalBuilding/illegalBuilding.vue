<template>
  <div class="building">
    <div class="header">违章监控点TOP3</div>
    <div class="body">
      <ul class="building-list">
        <li class="building-li" v-for="(item, index) in list" :key="index">
          <div class="image">
            <img :src="item.pic_url" alt />
          </div>
          <div class="info">
            <p>【违规类型】{{ item.pro_name }}</p>
            <p>【违规地点】{{ item.camera_name }}</p>
            <p>
              【违规次数】
              <span>{{ item.num }}次</span>
            </p>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { getCameraTopThree } from '@/services/IntelligentAnalytics.js';

export default {
  name: 'illegalBuilding',
  data() {
    return {
      list: [
        { pic_url: require('./img/3.jpg'), pro_name: '机动车违停', camera_name: '某大厦1楼', num: '130' },
        { pic_url: require('./img/2.jpg'), pro_name: '垃圾堆放', camera_name: '白鹿鞋城', num: '106' },
        { pic_url: require('./img/1.jpg'), pro_name: '非机动车违停', camera_name: '底楼', num: '84' },
      ],
    };
  },
  mounted() {
    this.getList();
  },
  methods: {
    getList() {
      getCameraTopThree().then(({ result }) => {
        if (result?.length > 0) this.list = result;
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
