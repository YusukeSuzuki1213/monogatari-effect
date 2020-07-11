// 2次関数ある点のy座標を計算 y = a(x - p)^2 + q
export const quadraticFuncCoordY = (
  x: number,
  gradient: number,
  vertexX: number,
  vertexY: number
): number => gradient * (x - vertexX) ** 2 + vertexY;

// 2次関数の変化の割合を計算 a = (y-q)/(x-q)^2
export const calcGradient = (
  vertexX: number,
  vertexY: number,
  coordX: number,
  coordY: number
): number => (coordY - vertexY) / (coordX - vertexX) ** 2;

// 2次関数の頂点のY座標を計算 q = y - a(x - p)^2
export const calcVertexY = (
  y: number,
  gradient: number,
  x: number,
  vertexX: number
): number => y - gradient * (x - vertexX) ** 2;

// lower〜upperまでのランダムな整数を返す
export const calcRandomValueFromRange = (
  lower: number,
  upper: number
): number => Math.floor(Math.random() * (upper - lower)) + lower;

// ある値Xの+_N%の範囲でランダムな数字を返す。
// e.g. X=10, N=50% -> 5〜15の間のランダムな数字を返す
export const calcRandomValueFromValueAndRate = (
  value: number,
  rate: number
): number => Math.floor(Math.random() * value) + value * rate;
