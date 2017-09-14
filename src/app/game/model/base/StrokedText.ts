import {Camera} from "./Camera";
import {Text} from "./Text";
import {ElementType} from "./ElementType";

export class StrokedText extends Text {
  stroke: number;
  strokeColor: string;

  constructor(x: number, y: number, z: number, color: string, style: string, stroke: number, strokeColor: string) {
    super(x, y, z, color, style);
    this.stroke = stroke;
    this.strokeColor = strokeColor;
  }

  render(camera: Camera, canvas: string = "game") {
    super.render(camera, canvas);
    camera.gameArea.getContext(canvas).font = this.style;
    camera.gameArea.getContext(canvas).strokeStyle = this.strokeColor;
    camera.gameArea.getContext(canvas).lineWidth = this.stroke;
    camera.gameArea.getContext(canvas).strokeText(this.text, this.xOffset, this.yOffset);
    camera.gameArea.getContext(canvas).fillStyle = this.color;
    camera.gameArea.getContext(canvas).fillText(this.text, this.xOffset, this.yOffset);
  }

  type: ElementType = ElementType.STROKED_TEXT;
}
