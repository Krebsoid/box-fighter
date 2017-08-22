import {ColoredShape} from "./ColoredShape";
import {Element} from "./Element";
import {Position} from "./Position";

export class HomingColoredShape extends ColoredShape {
  target: Position;
  percentageX: number;
  percentageY: number;

  constructor(x: number, y: number, z: number, h: number, w: number, color: string) {
    super(x, y, z, h, w, color);
  }

  setTarget(target: Position) : HomingColoredShape {
    this.target = target;
    let deltaX = this.x - target.x;
    let deltaY = this.y - target.y;
    let max = Math.abs(deltaX) + Math.abs(deltaY);
    this.percentageX = deltaX / max;
    this.percentageY = deltaY / max;
    return this;
  }

  moveTo(speed: number) {
    this.move(-(this.percentageX * speed), -(this.percentageY * speed));
  }

  type: string = "Homing Colored Shape";
}
