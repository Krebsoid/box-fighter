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
    Element.context().font = this.style;
    Element.context().fillStyle = this.color;
    Element.context().fillText(this.text, this.xOffset, this.yOffset);
  }

  update(game: Game) {

  }

}
