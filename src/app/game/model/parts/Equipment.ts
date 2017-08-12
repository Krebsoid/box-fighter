import {Element} from "../base/Element";
import {Game} from "../../service/Game";
import {Camera} from "../base/Camera";
import {Shape} from "../base/Shape";

export abstract class Equipment extends Element {

  target: Element;
  elements: Shape[] = [];

  constructor(x: number, y: number, z: number) {
    super(x, y, z);
  }

  abstract attach(target: Element);

  isAttached() : boolean {
    return !!this.target;
  }

  render(camera: Camera) {
    this.elements.forEach(value => value.render(camera));
  }

  update(game: Game) {
    this.elements.forEach(value => value.update(game));
  }

  move(x: number, y: number) {
    this.elements.forEach(value => value.move(x, y));
  }

}
