import {Camera} from "./Camera";
import {Text} from "./Text";

export class StrokedText extends Text {
  stroke: number;
  strokeColor: string;

  constructor(x: number, y: number, z: number, color: string, style: string, stroke: number, strokeColor: string) {
    super(x, y, z, color, style);
    this.stroke = stroke;
    this.strokeColor = strokeColor;
  }

  render(camera: Camera) {
    super.render(camera);
    camera.gameArea.getContext().font = this.style;
    camera.gameArea.getContext().strokeStyle = this.strokeColor;
    camera.gameArea.getContext().lineWidth = this.stroke;
    camera.gameArea.getContext().strokeText(this.text, this.xOffset, this.yOffset);
    camera.gameArea.getContext().fillStyle = this.color;
    camera.gameArea.getContext().fillText(this.text, this.xOffset, this.yOffset);
  }

  type: string = "Stroked Text";
}
