<script setup>
import { onMounted } from 'vue';

const COLOR_STROKE = '#222222';
const COLOR_PRIMARY = '#c44fd8';
const COLOR_INFO = 'rgba(0,0,0,0.1)';

// ベジェ曲線クラス
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

// 描画の処理
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
  ctx.moveTo(0, 500);
  ctx.lineTo(400, 100);
  ctx.strokeStyle = COLOR_INFO;
  ctx.lineWidth = 4;
  ctx.stroke();

  // 制御点のハンドルを描画
  for (let i = 0; i < 2; i++) {
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
    this.points[2][0], //制御点1のx座標
    this.points[2][1], //制御点1のy座標
    this.points[3][0], //制御点2のx座標
    this.points[3][1], //制御点2のy座標
    this.points[1][0], //追加点x座標
    this.points[1][1] //追加点y座標
  );
  ctx.strokeStyle = this.strokeStyle;
  ctx.lineWidth = this.lineWidth;
  ctx.stroke();

  // 制御点の〇を描画
  for (let i = 2; i <= 3; i++) {
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

// 制御点情報
// let handlePoints = { x1: 168, y1: 500, x2: 232, y2: 100 };
// let { x1, y1, x2, y2 } = handlePoints;

BezierCurve.prototype.hitTest = function (mouse) {
  this.selectedPoint = -1;
  // 各点との当たり判定
  const hitTestP = function (mousePoint, origin, radius) {
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
  for (let i = 2; i <= 3; i++) {
    if (hitTestP(mouse, this.points[i], 10)) {
      this.selectedPoint = i;
      if (mouse.down) {
        // マウスクリック中は移動モードにする
        this.movingPoint = i;
        // 制御点の情報を出力する
        // handlePoints.x1 = this.points[2][0];
        // handlePoints.y1 = this.points[2][1];
        // handlePoints.x2 = this.points[3][0];
        // handlePoints.y2 = this.points[3][1];
        // console.log(handlePoints);
      }
      return true;
    }
  }
  return false;
};

// マウス情報
const mouse = { x: 0, y: 0, down: false };

// 制御点情報
let zeroOneEasing = [0.42, 0.0, 0.58, 1.0]; //初期イージング（ease-in-out）
// 0-1のイージング数値をcanvas軸の数値に変換する（小数点以下切り捨て）
const canvasEasing = zeroOneEasing.map((value, index) => {
  return index % 2 === 0 ? (value * 400) | 0 : -((400 / value) | 0) + 500;
});
let [x1, y1, x2, y2] = canvasEasing;

const initCanvas = (id) => {
  const canvas = document.getElementById(id);
  if (!canvas || !canvas.getContext) {
    return false;
  }
  const ctx = canvas.getContext('2d');

  canvas.onmousemove = function (e) {
    const rect = e.target.getBoundingClientRect();
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

  // 初期化
  // const bezierField = new BezierCurve([
  //   [0, 500],//始点
  //   [168, 500],//始点の制御点
  //   [232, 100],//終点の制御点
  //   [400, 100], //終点
  // ]);
  const bezierField = new BezierCurve([
    [0, 500], //始点
    [x1, y1], //始点の制御点
    [x2, y2], //終点の制御点
    [400, 100], //終点
  ]);

  // メインループ
  let timer;
  let loop = function () {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    bezierField.hitTest(mouse);
    bezierField.draw(ctx, mouse);

    //マウス位置デバッグ
    // ctx.fillText(mouse.x + ', ' + mouse.y, 10, 10);

    //制御点デバッグ
    // ctx.fillText(
    //   `${handlePoints.x1}, ${handlePoints.y1}, ${handlePoints.x2}, ${handlePoints.y2}, `,
    //   10,
    //   10
    // );
    clearTimeout(timer);
    timer = setTimeout(loop, 10);
  };
  loop();
};

onMounted(() => {
  initCanvas('canvas');
});
</script>

<template>
  <div class="container">
    <canvas id="canvas" width="400" height="600"></canvas>
  </div>
</template>

<style scoped></style>
