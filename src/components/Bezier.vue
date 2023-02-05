<script setup>
import { onMounted } from 'vue';

const COLOR_STROKE = '#222222';
const COLOR_PRIMARY = '#c44fd8';
const COLOR_INFO = 'rgba(0,0,0,0.1)';

// ベジェ曲線のコンストラクタ設定
function BezierCurve(points) {
  this.points = [
    points[0], //始点
    points[3], //終点
    points[1], //始点の制御点
    points[2], //終点の制御点
  ];
  this.pointColors = [COLOR_STROKE, COLOR_STROKE, COLOR_PRIMARY, COLOR_PRIMARY];
  this.strokeStyle = COLOR_STROKE;
  this.lineWidth = 8;
  this.selectedPoint = -1;
  this.movingPoint = -1;
}

BezierCurve.prototype.draw = function (ctx, mouse) {
  // 点を移動中
  if (this.movingPoint > -1) {
    // 点の移動
    if (mouse.down) {
      this.points[this.movingPoint] = [mouse.x, mouse.y];
    } else {
      this.movingPoint = -1;
    }
  }
  // 始点と終点の背景線を描画
  ctx.beginPath();
  ctx.moveTo(100, 400);
  ctx.lineTo(400, 100);
  ctx.strokeStyle = COLOR_INFO;
  ctx.lineWidth = 4;
  ctx.stroke();

  // 制御点のハンドルを描画
  for (var i = 0; i < 2; i++) {
    ctx.beginPath();
    ctx.moveTo(this.points[i + 0][0], this.points[i + 0][1]);
    ctx.lineTo(this.points[i + 2][0], this.points[i + 2][1]);
    ctx.strokeStyle = COLOR_PRIMARY;
    ctx.lineWidth = 4;
    ctx.stroke();
  }

  // ベジェ曲線を描画
  ctx.beginPath();
  ctx.moveTo(this.points[0][0], this.points[0][1]);
  ctx.bezierCurveTo(
    this.points[2][0],
    this.points[2][1],
    this.points[3][0],
    this.points[3][1],
    this.points[1][0],
    this.points[1][1]
  );
  ctx.strokeStyle = this.strokeStyle;
  ctx.lineWidth = this.lineWidth;
  ctx.stroke();

  // 制御点の〇を描画
  for (var i = 2; i <= 3; i++) {
    ctx.beginPath();
    ctx.arc(this.points[i][0], this.points[i][1], 10, 0, Math.PI * 2, false);
    ctx.fillStyle = this.pointColors[i];
    ctx.fill();
  }
  // ホバーでカーソルにする
  if (this.selectedPoint >= 2) {
    ctx.canvas.style.cursor = 'pointer';
  } else {
    ctx.canvas.style.cursor = 'auto';
  }
};

BezierCurve.prototype.hitTest = function (mouse) {
  this.selectedPoint = -1;
  // 各点との当たり判定
  var hitTestP = function (mousePoint, origin, radius) {
    if (
      mouse.x >= origin[0] - radius &&
      mouse.x <= origin[0] + radius &&
      mouse.y >= origin[1] - radius &&
      mouse.y <= origin[1] + radius
    ) {
      return true;
    } else {
      return false;
    }
  };
  // 制御点のみ動かせるようにする
  for (var i = 2; i <= 3; i++) {
    if (hitTestP(mouse, this.points[i], 10)) {
      this.selectedPoint = i;
      if (mouse.down) {
        // マウスクリック中は移動モードにする
        this.movingPoint = i;
      }
      return true;
    }
  }
  return false;
};

// マウス情報
var mouse = { x: 0, y: 0, down: false };

var init = () => {
  var canvas = document.getElementById('bezier_canvas');
  if (!canvas || !canvas.getContext) {
    return false;
  }
  var ctx = canvas.getContext('2d');
  canvas.onmousemove = function (e) {
    var rect = e.target.getBoundingClientRect();
    mouse.x = e.clientX - rect.left;
    mouse.y = e.clientY - rect.top;
  };
  canvas.onmouseout = function () {
    mouse.down = false;
  };
  canvas.onmousedown = function () {
    mouse.down = true;
  };
  canvas.onmouseup = function () {
    mouse.down = false;
  };

  // ベジェ曲線と制御点のインスタンス
  var bezierField = new BezierCurve([
    [100, 400], //始点
    [260, 400], //始点の制御点
    [240, 100], //終点の制御点
    [400, 100], //終点
  ]);

  var timer;
  var loop = function () {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    bezierField.hitTest(mouse);
    bezierField.draw(ctx, mouse);
    clearTimeout(timer);
    timer = setTimeout(loop, 10);
  };
  loop();
};

// 実行関数
onMounted(() => {
  window.onload = () => init();
});
</script>

<template>
  <div class="container">
    <canvas id="bezier_canvas" width="500" height="500"></canvas>
  </div>
</template>

<style scoped></style>
