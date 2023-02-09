<script setup>
import { onMounted } from 'vue';

const setEasingType = (el, eaingType) => {
  el.style.transitionTimingFunction = eaingType;
};

onMounted(() => {
  const container = document.querySelector('.container');
  const containerWidth = container.clientWidth;
  const circle = document.querySelector('.circle');
  const circleWidth = circle.clientWidth;
  // 〇にイージングをセットする
  setEasingType(circle, 'cubic-bezier(0.68, -0.6, 0.32, 1.6)');
  //コンテナの幅から丸の幅を引いた分だけ移動させる
  circle.style.transform = `translateX(calc(${containerWidth}px - ${circleWidth}px))`;
});
</script>

<template>
  <div class="container">
    <div class="circle"></div>
  </div>
</template>

<style scoped>
.container {
  width: 100%;
  padding-bottom: 2em;
}
.circle {
  width: 40px;
  height: 40px;
  background-color: var(--color-primary);
  border-radius: 100vmax;
  transition-property: transform;
  transition-duration: 1s;
}
</style>
