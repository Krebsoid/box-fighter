import { Element } from './Element';
import {Camera} from "./Camera";
import {Game} from "../../service/Game";
import {Shape} from "./Shape";
import {Position} from "./Position";
import {ElementType} from "./ElementType";

export class Text extends Element {

  text: string;
  textWidth: number;
  textHeight: number;
  color: string;
  style: string;

  constructor(x: number, y: number, z: number, color: string, style: string) {
    super(x, y, z);
    this.color = color;
    this.style = style;
  }

  isOnScreen(camera: Camera): boolean {
    let cameraShape: Shape = camera.shape();
    return cameraShape.containsPosition(new Position(this.position.x + camera.xOffset + 50, this.position.y + camera.yOffset)) ||
      cameraShape.containsPosition(new Position(this.position.x + camera.xOffset + 50, this.position.y + camera.yOffset - this.textHeight)) ||
      cameraShape.containsPosition(new Position(this.position.x + camera.xOffset + 50 + this.textWidth, this.position.y + camera.yOffset)) ||
      cameraShape.containsPosition(new Position(this.position.x + camera.xOffset + + 50 + this.textWidth, this.position.y + camera.yOffset - this.textHeight));
  }

  render(camera: Camera) {
    super.render(camera);
    let context = camera.gameArea.getContext();
    context.font = this.style;
    context.fillStyle = this.color;
    context.fillText(this.text, this.xOffset, this.yOffset);
    let textMetrics = context.measureText(this.text);
    this.textWidth = textMetrics.width;
    this.textHeight = textMetrics.height;
  }

  type: ElementType = ElementType.TEXT;
}
