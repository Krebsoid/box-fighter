import {Camera} from "./Camera";
import {Game, GameTime} from "../../service/Game";
import {Position} from "./Position";

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

  collidable: boolean = true;
  destructible: boolean = false;
  dangerous: boolean = true;
  fixed: boolean = false;

  key: string = "";

  isOnScreen(camera: Camera): boolean {
    return this.x >= camera.x + camera.xOffset && this.x <= camera.x + 1024 + camera.xOffset
  }

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
    this.xOffset = this.fixed ? this.x : this.x - camera.x + camera.xOffset;
    this.yOffset = this.fixed ? this.y : this.y - camera.y + camera.yOffset;
  }
  abstract update(game: Game);

  setKey(key: string) {
    this.key = key;
    return this;
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

  isCollidable(collidable: boolean) {
    this.collidable = collidable;
    return this;
  }

  destination: Position;
  private percentageX: number;
  private percentageY: number;
  setDestination(destination: Position) {
    this.destination = destination;
    let deltaX = this.x - destination.x;
    let deltaY = this.y - destination.y;
    let max = Math.abs(deltaX) + Math.abs(deltaY);
    this.percentageX = deltaX / max;
    this.percentageY = deltaY / max;
    return this;
  }

  moveTo(speed: number) {
    this.move(-(this.percentageX * speed), -(this.percentageY * speed));
  }

  move(x: number, y: number) {
    this.x += x;
    this.y += y;
  }

  setPosition(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  distanceToTarget(target: Element) {
    return Math.sqrt(Math.pow(this.x - target.x, 2) + Math.pow(this.y - target.y, 2));
  }

  toString() {
    return this.type + "(" + this.id + ")";
  }

  type: string = "Element";
}
