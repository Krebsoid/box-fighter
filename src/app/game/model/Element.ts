import {Camera} from "./Camera";
import {Game} from "../service/Game";

namespace Id {
  let index: number = 0;
  export function retrieveNextElementId() {
    return index++;
  }
}

export abstract class Element {
  id: number;
  x: number;
  y: number;
  z: number;

  xOffset: number;
  yOffset: number;

  constructor(x: number, y: number, z:number) {
    this.x = x;
    this.y = y;
    this.z = z;
    this.id = Id.retrieveNextElementId();
  }

  render(camera: Camera) {
    this.xOffset = this.x - camera.x + 50;
    this.yOffset = this.y - camera.y;
  }
  abstract update(game: Game);

  setPosition(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  move(x: number, y: number) {
    this.x += x;
    this.y += y;
  }

  toString() {
    return this.constructor.name + "(" + this.id + ")";
  }
}
