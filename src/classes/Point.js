export default class Point {
  constructor(x, y) {
    this.x = x
    this.y = y
  }

  isEqual = (otherPoint) => {
    return otherPoint.x === this.x && otherPoint.y === this.y
  }
}
