const easeInOutList = [
  { 'ease-in-out': [0.42, 0.0, 0.58, 1.0] },
  { 'In Out Sine': [0.45, 0.05, 0.55, 0.95] },
  { 'In Out Quadratic': [0.46, 0.03, 0.52, 0.96] },
  { 'In Out Cubic': [0.65, 0.05, 0.36, 1.0] },
  { 'Fast Out, Show In': [0.4, 0.0, 0.2, 1.0] },
  { 'In Out Back': [0.68, -0.55, 0.27, 1.55] },
];

const easeInList = [
  { 'ease-in': [0.42, 0.0, 1.0, 1.0] },
  { 'In Sine': [0.47, 0.0, 0.75, 0.72] },
  { 'In Quadratic': [0.55, 0.09, 0.68, 0.53] },
  { 'In Cubic': [0.55, 0.06, 0.68, 0.19] },
  { 'In Back': [0.6, -0.28, 0.74, 0.05] },
  { 'Fast Out, Linear In': [0.4, 0.0, 1.0, 1.0] },
];

const easeOutList = [
  { 'ease-out': [0.0, 0.0, 0.58, 1.0] },
  { 'Out Sine': [0.39, 0.58, 0.57, 1.0] },
  { 'Out Quadratic': [0.25, 0.46, 0.45, 0.94] },
  { 'Out Cubic': [0.22, 0.61, 0.36, 1.0] },
  { 'Linear Out, Show In': [0.0, 0.0, 0.2, 1.0] },
  { 'Out Back': [0.18, 0.89, 0.32, 1.28] },
];

const easingLists = [easeInOutList, easeInList, easeOutList];

// Object.freezeを使用して外部では書き換えできないようにする
export default Object.freeze(easingLists);
