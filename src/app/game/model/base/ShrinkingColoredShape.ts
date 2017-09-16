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
  render(camera: Camera, canvas: string = "game") {
    this.xOffset = this.fixed ? this.position.x : this.position.x - camera.position.x + camera.xOffset;
    this.yOffset = this.fixed ? this.position.y : this.position.y - camera.position.y + camera.yOffset;
    camera.gameArea.getContext(canvas).fillStyle = this.color;
    if(this.gradient) {
      camera.gameArea.getContext(canvas).fillStyle = this.gradient;
    }
    let percentage = (this.life / this.maxLife);
    this.shrunkW = this.w - ((this.w - (this.w * percentage)) / 2);
    this.shrunkH = this.h - ((this.h - (this.h * percentage)) / 2);
    let x = ((this.w - this.w * percentage) / 2) - (((this.w - this.shrunkW) / 2));
    let y = ((this.h - this.h * percentage) / 2) - (((this.h - this.shrunkH) / 2));
    this.shrunkX = this.position.x + x;
    this.shrunkY = this.position.y + y;
    camera.gameArea.getContext(canvas).fillRect(this.xOffset + x, this.yOffset + y, this.shrunkW, this.shrunkH);
  }

  getHitBox(): Shape {
    return new Shape(this.shrunkX, this.shrunkY, this.z, this.shrunkH, this.shrunkW);
  }

  type: ElementType = ElementType.SHRINKING_COLORED_SHAPE;
}
