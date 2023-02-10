<template>
  <div class="container">
    <ul class="list">
      <li
        class="item"
        v-for="(item, index) in easingTypes"
        :key="index"
        @click="onClickItem(index)"
      >
        <img :src="generateImgPath(item)" :alt="item" />
      </li>
    </ul>
    <!-- <button @click="emitEvent">Emit!</button> -->
  </div>
</template>
<script>
import { defineComponent } from 'vue';

export default defineComponent({
  emits: ['childEmit', 'switchEasing'],
  setup(props, { emit }) {
    const emitEvent = () => {
      emit('childEmit');
    };

    const helloFromChild = () => {
      console.log('Hello from Child');
    };

    const easingTypes = ['ease-in-out', 'ease-in', 'ease-out'];

    const generateImgPath = (fileName) => {
      return new URL(`../assets/images/${fileName}.png`, import.meta.url).href;
    };

    const onClickItem = (index) => {
      emit('switchEasing', index);
    };

    return {
      emitEvent,
      helloFromChild,
      easingTypes,
      generateImgPath,
      onClickItem,
    };
  },
});
</script>

<style scoped>
.container {
  /* display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 40px;
  width: 100%;
  height: 100%; */
}
.list {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 40px;
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
  list-style-type: none;
}
.item {
  display: grid;
  place-items: center;
  border-radius: 16px;
  background-color: var(--color-gray);
  width: 150px;
  height: 150px;
  cursor: pointer;
  transition: all 0.1s ease-out;
}

.item:active {
  transform: scale(1.05);
}
@media (hover: hover) {
  .item:hover {
    background-color: rgba(220, 220, 220, 0.6);
  }
}
</style>
