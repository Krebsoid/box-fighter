import {ColoredShape} from "./ColoredShape";
import {ElementType} from "./ElementType";
import {Camera} from "./Camera";
import {Shape} from "./Shape";

export class ShrinkingColoredShape extends ColoredShape {
  maxLife: number = 5;
  life: number = 5;

  shrunkX: number;
  shrunkY: number;
  shrunkW: number;
  shrunkH: number;
  render(camera: Camera) {
    this.xOffset = this.fixed ? this.x : this.x - camera.x + camera.xOffset;
    this.yOffset = this.fixed ? this.y : this.y - camera.y + camera.yOffset;
    camera.gameArea.getContext().fillStyle = this.color;
    if(this.gradient) {
      camera.gameArea.getContext().fillStyle = this.gradient;
    }
    let percentage = (this.life / this.maxLife);
    let x = ((this.w - this.w * percentage) / 2);
    let y = ((this.h - this.h * percentage) / 2);
    this.shrunkX = this.x + x;
    this.shrunkY = this.y + y;
    this.shrunkW = this.w * percentage;
    this.shrunkH = this.h * percentage;
    camera.gameArea.getContext().fillRect(this.xOffset + x, this.yOffset + y, this.w * percentage, this.h * percentage);
  }

  getHitBox(): Shape {
    return new Shape(this.shrunkX, this.shrunkY, this.z, this.shrunkH, this.shrunkW);
  }

  type: ElementType = ElementType.SHRINKING_COLORED_SHAPE;
}
