<template>
  <div class="one-item">
    <p class="num-text">{{ data.num }}</p>
    <div class="title-panel">
      <span class="title-text">{{ data.title }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'cardItem',
  props: { data: { type: Object, default: () => {} } },
};
</script>

<style scoped lang="less">
.one-item {
  display: inline-block;
  width: 120px;
  height: 75px;
  text-align: center;
  position: relative;
  .num-text {
    font-family: 'LCD';
    font-size: 40px;
    line-height: 30px;
    letter-spacing: 0px;
    color: #fed700;
  }
  &:nth-child(1),
  &:nth-child(2) {
    .num-text {
      color: #ff5959;
    }
  }
  .title-panel {
    position: absolute;
    bottom: 0px;
    left: 0px;
    width: 120px;
    background-image: linear-gradient(90deg, rgba(37, 95, 207, 0.7), rgba(37, 95, 207, 0));
    .title-text {
      font-family: FZZCHJW--GB1-0;
      font-size: 16px;
      line-height: 30px;
      letter-spacing: 0px;
      color: #ffffff;
    }
  }
}
</style>
