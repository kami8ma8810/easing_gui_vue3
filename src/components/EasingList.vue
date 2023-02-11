<template>
  <div class="container">
    <ul class="list">
      <li
        :class="['item', item.isActive && 'is-active']"
        v-for="(item, index) in easingTypes"
        :key="index"
        @click="onClickItem(index, item)"
      >
        <img :src="generateImgPath(item.name)" :alt="item.name" />
      </li>
    </ul>
  </div>
</template>
<script>
import { ref, defineComponent, watch } from 'vue';

export default defineComponent({
  emits: ['switchEasingCategory'],

  setup(props, { emit }) {
    const easingTypes = ref([
      { name: 'ease-in-out', isActive: true },
      { name: 'ease-in', isActive: false },
      { name: 'ease-out', isActive: false },
    ]);

    const generateImgPath = (fileName) => {
      return new URL(`../assets/images/${fileName}.png`, import.meta.url).href;
    };

    const onClickItem = (index, item) => {
      // is-active クラスを切り替える
      if (item.isActive) {
        return false;
      } else {
        [...easingTypes.value].map((e) => {
          return (e.isActive = false);
        });
        item.isActive = !item.isActive;
      }

      emit('switchEasingCategory', index);
    };

    return {
      easingTypes,
      generateImgPath,
      onClickItem,
    };
  },
});
</script>

<style scoped>
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
.item.is-active {
  filter: invert(1);
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
