<template>
  <div class="wrapper">
    <div class="inner">
      <View />
      <div class="flex">
        <button @click="helloFromChild">親コンポーネント</button>
        <EasingList
          ref="child"
          @childEmit="helloFromParent"
          @switchEasing="helloFromSwitch"
        />
        <Bezier />
      </div>
      <EasingSwitch />
      <p>テスト</p>
    </div>
  </div>
</template>

<script>
import Bezier from '@/components/Bezier.vue';

import EasingList from '@/components/EasingList.vue';
import View from '@/components/View.vue';
import EasingSwitch from '@/components/EasingSwitch.vue';
import easingList from '@/constants/easingList.js';
import { ref, defineComponent } from 'vue';

export default defineComponent({
  components: {
    Bezier,
    EasingList,
    EasingSwitch,
    View,
  },
  setup(props, { emit }) {
    const child = ref(null);

    const defaultEasingName = Object.keys(easingList.easeInOut[0]);
    const defaultEasingPoints = [...Object.values(easingList.easeInOut[0])][0];
    // console.log(defaultEasingName[0]);
    // console.log(defaultEasingPoints);

    const helloFromParent = () => {
      console.log('Hello from Parent!');
    };
    const helloFromSwitch = (index) => {
      console.log(index);
    };

    const helloFromChild = () => {
      child.value.helloFromChild();
    };

    return {
      child,
      helloFromParent,
      helloFromChild,
      helloFromSwitch,
      defaultEasingName,
      defaultEasingPoints,
    };
  },
});

// Object.keys(easingList).forEach((key) => {
//   easingList[key].forEach((elm) => {
//     console.log(elm);
//   });
// });
</script>

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
