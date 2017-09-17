import {Element} from '../Element';
import {Camera} from "../camera/Camera";
import {Shape} from "../shapes/Shape";
import {Position} from "../Position";
import {ElementCatalogue} from "../../catalogues/ElementCatalogue";

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

  render(camera: Camera, canvas: string = "game") {
    super.render(camera, canvas);
    let context = camera.gameArea.getContext(canvas);
    context.font = this.style;
    context.fillStyle = this.color;
    context.fillText(this.text, this.xOffset, this.yOffset);
    let textMetrics = context.measureText(this.text);
    this.textWidth = textMetrics.width;
    this.textHeight = textMetrics.height;
  }

  type: ElementCatalogue = ElementCatalogue.TEXT;
}
