export class Vector {
  x: number;
  y: number;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  setAngle(angle: number): Vector {
    let length = this.getLength();
    this.x = Math.cos(angle) * length;
    this.y = Math.sin(angle) * length;
    return this;
  }

  getAngle() {
    return Math.atan2(this.y, this.x);
  }

  setLength(length: number): Vector {
    let angle = this.getAngle();
    this.x = Math.cos(angle) * length;
    this.y = Math.sin(angle) * length;
    return this;
  }

  getLength() {
    return Math.sqrt(this.x * this.x  * this.y * this.y);
  }

  add(vector: Vector): Vector {
    return new Vector(this.x + vector.x, this.y + vector.y);
  }

  subtract(vector: Vector): Vector {
    return new Vector(this.x - vector.x, this.y - vector.y);
  }

  multiply(value: number): Vector {
    return new Vector(this.x * value, this.y * value);
  }

  divide(value: number): Vector {
    return new Vector(this.x / value, this.y / value);
  }

  addTo(vector: Vector) {
    this.x += vector.x;
    this.y += vector.y;
  }

  subtractFrom(vector: Vector) {
    this.x -= vector.x;
    this.y -= vector.y;
  }

  multiplyBy(value: number) {
    this.x *= value;
    this.y *= value;
  }

  divideBy(value: number) {
    this.x /= value;
    this.y /= value;
  }
}
