import { Element } from './Element';
import {Camera} from "./Camera";
import {Game} from "../service/Game";

export class Text extends Element {

  text: string;
  color: string;
  style: string;

  constructor(x: number, y: number, z: number, color: string, style: string) {
    super(x, y, z);
    this.color = color;
    this.style = style;
  }

  render(camera: Camera) {
    super.render(camera);
    camera.gameArea.getContext().font = this.style;
    camera.gameArea.getContext().fillStyle = this.color;
    camera.gameArea.getContext().fillText(this.text, this.xOffset, this.yOffset);
  }

  update(game: Game) {

  }

}
