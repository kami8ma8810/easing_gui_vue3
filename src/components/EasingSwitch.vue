<template>
  <div class="container">
    <div class="inner">
      <button class="btn" @click="onClickButton('prev')">
        <span class="btn-arrow btn-prev"></span>
      </button>
      <p class="easing-name">{{ easingName }}</p>
      <button class="btn" @click="onClickButton('next')">
        <span class="btn-arrow btn-next"></span>
      </button>
    </div>
  </div>
</template>

<script>
import { computed, defineComponent } from 'vue';

export default defineComponent({
  props: {
    defaultEasingType: Array,
  },
  emits: ['switchEasingChild'],
  setup(props, { emit }) {
    const easingName = computed(
      () => Object.keys(props.defaultEasingType[0])[0]
    );

    const onClickButton = (direction) => {
      emit('switchEasingChild', direction);
    };

    return {
      easingName,
      onClickButton,
    };
  },
});
</script>

<style scoped>
.container {
  margin-top: 40px;
  width: 100%;
  font-size: 24px;
}
.inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.easing-name {
  margin: 0;
}

.btn {
  display: block;
  background-color: var(--color-gray);
  padding: 1em;
  border-radius: 100vmax;
}

@media (hover: hover) {
  .btn {
    transition: all 0.1s ease-out;
  }
  .btn:active {
    filter: invert(1);
    transform: scale(1.1);
  }
  .btn:hover {
    background-color: rgba(220, 220, 220, 0.6);
  }
}
.btn-arrow {
  display: inline-block;
  vertical-align: middle;
  line-height: 1;
  width: 1em;
  height: 1em;
  border: 2px solid currentColor;
  border-left: 0;
  border-bottom: 0;
  box-sizing: border-box;
}
.btn-prev {
  transform: translateX(20%) rotate(-135deg);
}
.btn-next {
  transform: translateX(-20%) rotate(45deg);
}
</style>
