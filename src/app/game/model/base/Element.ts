import {Camera} from "./Camera";
import {Game, GameTime} from "../../service/Game";

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

  birth: number;

  destructible: boolean = false;
  dangerous: boolean = true;
  fixed: boolean = false;

  xOffset: number;
  yOffset: number;

  constructor(x: number, y: number, z: number) {
    this.x = x;
    this.y = y;
    this.z = z;
    this.id = Id.retrieveNextElementId();
    this.birth = GameTime.frame();
  }

  render(camera: Camera) {
    this.xOffset = this.fixed ? this.x : this.x - camera.x + 50;
    this.yOffset = this.fixed ? this.y : this.y - camera.y;
  }
  abstract update(game: Game);

  setPosition(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  isDangerous(dangerous: boolean) {
    this.dangerous = dangerous;
    return this;
  }

  isDestructible(destructible: boolean) {
    this.destructible = destructible;
    return this;
  }

  isFixed(fixed: boolean) {
    this.fixed = fixed;
    return this;
  }

  move(x: number, y: number) {
    this.x += x;
    this.y += y;
  }

  toString() {
    return this.type + "(" + this.id + ")";
  }

  type: string = "Element";
}
