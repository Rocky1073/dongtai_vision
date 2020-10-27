<template>
  <div id="screen">
    <div class="content">
      <!--头部-->
      <Header></Header>
      <!--头部-->
      <div class="main-body">
        <iframe
          src="http://218.206.153.37:10000/dongtai/?userId=e0f48f30a4e511e856f64dd5bc2aa7bb"
          width="100%"
          height="100%"
          frameborder="0"
        ></iframe>
      </div>
    </div>
  </div>
</template>

<script>
import Header from '@/components/Header/Header';

export default {
  name: 'StreetAnalysis',
  components: { Header },
  mounted() {
    document.title = '道路画像专题';
  },
};
</script>

<style scope lang="less">
.main-body {
  padding: 20px 30px;
  height: 940px;
  > div {
    display: inline-block;
  }
}
</style>
