<script setup lang="ts">
import Graph from './Graph.vue';
</script>
<template>
  <div class="graphs">
    <Graph></Graph>
    <Graph></Graph>
    <Graph></Graph>
  </div>
</template>
<style scoped>
.graphs {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 40px;
  width: 100%;
  height: 100%;
}
</style>
