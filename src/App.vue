<template>
  <div class="wrapper">
    <div class="inner">
      <View />
      <div class="flex">
        <EasingList @switchEasingCategory="setEasing" />
        <Bezier />
      </div>
      <EasingSwitch
        :defaultEasingType="defaultEasingType"
        @switchEasingChild="switchEasingChild"
      />
    </div>
  </div>
</template>

<script>
import Bezier from '@/components/Bezier.vue';
import EasingList from '@/components/EasingList.vue';
import View from '@/components/View.vue';
import EasingSwitch from '@/components/EasingSwitch.vue';
import easingList from '@/constants/easingList.js';
import { ref, reactive, defineComponent } from 'vue';

export default defineComponent({
  components: {
    Bezier,
    EasingList,
    EasingSwitch,
    View,
  },
  setup(props, { emit }) {
    const defaultEasingType = ref(easingList[0]);
    const defaultEasingName = ref(Object.keys(easingList[0][0])[0]);
    const defaultEasingPoints = ref(Object.values(easingList[0][0])[0]);

    // const defaultEasing = reactive({
    //   type: Object.keys(easingList[0][0]).shift(),
    //   points: [...Object.values(easingList[0][0])],
    // });

    // ease-in-out/ease-in/ease-out のタイプを子コンポーネントのクリックイベントから取得
    const getEasingType = (index) => {
      const currentEasingType = easingList[index];
      return currentEasingType;
    };
    const getEasingName = (index) => {
      const currentEasingName = Object.keys(easingList[index][0])[0];
      return currentEasingName;
    };
    const getEasingPoints = (index) => {
      const currentEasingPoints = Object.values(easingList[index][0])[0];
      return currentEasingPoints;
    };

    // 現在のイージングに設定
    const setEasingType = (index) => {
      defaultEasingType.value = getEasingType(index);
    };
    const setEasingName = (index) => {
      defaultEasingName.value = getEasingName(index);
      console.log(defaultEasingName.value);
    };
    const setEasingPoints = (index) => {
      defaultEasingPoints.value = getEasingPoints(index);
      console.log(defaultEasingPoints.value);
    };
    const setEasing = (index) => {
      setEasingType(index);
      setEasingName(index);
      setEasingPoints(index);
    };

    // イージングカテゴリ内でイージングを切り替える（ease-in→In Sine→...）
    const switchEasingChild = (direction) => {
      console.log(direction);
      console.log(defaultEasingType.value);
    };

    return {
      defaultEasingType,
      defaultEasingName,
      defaultEasingPoints,
      getEasingType,
      getEasingName,
      getEasingPoints,
      setEasingType,
      setEasingName,
      setEasingPoints,
      setEasing,
      switchEasingChild,
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
