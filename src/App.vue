<script setup>
import Bezier from './components/Bezier.vue';

import EasingCategory from './components/EasingCategory.vue';
import EasingType from './components/EasingType.vue';
import View from './components/View.vue';
</script>

<template>
  <div class="wrapper">
    <div class="inner">
      <View />
      <div class="flex">
        <EasingCategory />
        <Bezier />
      </div>
      <EasingType />
    </div>
  </div>
</template>

<style scoped>
.wrapper {
  margin-inline: auto;
  width: 800px;
}
.inner {
  padding: 2em;
  box-sizing: border-box;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0px 8px 8px 0px #e0e0e0;
}
.flex {
  display: flex;
  gap: 80px;
}
</style>
