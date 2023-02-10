<template>
  <div class="wrapper">
    <div class="inner">
      <View />
      <div class="flex">
        <button @click="helloFromChild">親コンポーネント</button>
        <EasingList
          ref="child"
          @childEmit="helloFromParent"
          @switchEasing="setEasing"
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
import easingLists from '@/constants/easingLists.js';
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
    const defaultEasingTypeName = ref(Object.keys(easingLists[0][0])); //'ease-in-out'
    const defaultEasingPoints = ref(...Object.values(easingLists[0][0])); // [0.42, 0.0, 0.58, 1.0]

    // ease-in-out/ease-in/ease-out のタイプを子コンポーネントのクリックイベントから取得
    const getEasingType = (index) => {
      const currentEasingType = Object.keys(easingLists[index][0]).shift();
      return currentEasingType;
    };
    const getEasingPoints = (index) => {
      const currentEasingPoints = [
        ...Object.values(easingLists[index][0]),
      ].shift();
      return currentEasingPoints;
    };

    // 現在のイージングに設定
    const setEasingName = (index) => {
      defaultEasingTypeName.value = getEasingType(index);
      console.log(defaultEasingTypeName.value);
    };
    const setEasingPoints = (index) => {
      defaultEasingPoints.value = getEasingPoints(index);
      console.log(defaultEasingPoints.value);
    };
    const setEasing = (index) => {
      setEasingName(index);
      setEasingPoints(index);
    };

    const helloFromParent = () => {
      console.log('Hello from Parent!');
    };

    const helloFromChild = () => {
      child.value.helloFromChild();
    };

    return {
      child,
      helloFromParent,
      helloFromChild,
      getEasingType,
      getEasingPoints,
      defaultEasingTypeName,
      defaultEasingPoints,
      setEasing,
      setEasingName,
      setEasingPoints,
    };
  },
});
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
