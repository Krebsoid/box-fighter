import {ColoredShape} from "./ColoredShape";
import {Element} from "./Element";

export class HomingColoredShape extends ColoredShape {
  target: Element;
  percentageX: number;
  percentageY: number;

  constructor(x: number, y: number, z: number, h: number, w: number, color: string, target: Element) {
    super(x, y, z, h, w, color);
    this.target = target;
    let deltaX = this.x - target.x;
    let deltaY = this.y - target.y;
    let max = Math.abs(deltaX) + Math.abs(deltaY);
    this.percentageX = deltaX / max;
    this.percentageY = deltaY / max;
  }

  moveTo(speed: number) {
    this.move(-(this.percentageX * speed), -(this.percentageY * speed));
  }
}
