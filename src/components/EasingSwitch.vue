<script setup></script>
<template>
  <div class="container">
    <div class="inner">
      <button class="btn"><span class="btn-arrow btn-prev"></span></button>
      <p class="easing-name">ease-in-out</p>
      <button class="btn"><span class="btn-arrow btn-next"></span></button>
    </div>
  </div>
</template>
<style scoped>
.container {
  width: 100%;
  height: 100px;
}
.inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.btn {
  display: block;
  background-color: var(--color-gray);
  padding: 1em;
  border-radius: 100vmax;
}

@media (hover: hover) {
  .btn {
    transition: background 0.1s ease-out;
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
