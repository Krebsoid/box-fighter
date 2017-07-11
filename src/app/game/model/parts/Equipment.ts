import {Element} from "../Element";
import {Game} from "../../service/Game";
import {Camera} from "../Camera";

export class Equipment extends Element {

  target: Element;
  elements: Element[] = [];

  constructor(target: Element) {
    super(target.x, target.y, target.z);
    this.target = target;
  }

  render(camera: Camera) {
    this.elements.forEach((value, index, array) => value.render(camera));
  }

  update(game: Game) {
    this.elements.forEach((value, index, array) => value.update(game));
  }

  move(x: number, y: number) {
    this.elements.forEach((value, index, array) => value.move(x, y));
  }

}
