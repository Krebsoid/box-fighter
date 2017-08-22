import {Camera} from "./Camera";
import {ColoredShape} from "./ColoredShape";

export class ShrinkingColoredShape extends ColoredShape {
  maxLife: number = 5;
  life: number = 5;

  render(camera: Camera) {
    this.xOffset = this.fixed ? this.x : this.x - camera.x + 50;
    this.yOffset = this.fixed ? this.y : this.y - camera.y;
    camera.gameArea.getContext().fillStyle = this.color;
    if(this.gradient) {
      camera.gameArea.getContext().fillStyle = this.gradient;
    }
    let percentage = (this.life / this.maxLife);
    camera.gameArea.getContext().fillRect(this.xOffset + ((this.w - this.w * percentage) / 2), this.yOffset + ((this.h - this.h * percentage) / 2), this.w * percentage, this.h * percentage);
  }

  type: string = "Shrinking Colored Shape";
}
