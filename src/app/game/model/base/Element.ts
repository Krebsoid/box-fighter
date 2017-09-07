import {Camera} from "./Camera";
import {Game, GameTime} from "../../service/Game";
import {Position} from "./Position";
import {ElementType} from "./ElementType";
import {Behaviour} from "../behaviour/Behaviour";
import {Vector} from "./Vector";

namespace Id {
  let index: number = 0;
  export function retrieveNextElementId() {
    return index++;
  }
}

export abstract class Element {
  id: number;
  position: Vector;
  velocity: Vector = new Vector(0, 0);
  z: number;

  birth: number;

  collidable: boolean = true;
  destructible: boolean = false;
  dangerous: boolean = true;
  fixed: boolean = false;

  maxLife: number = 1;
  life: number = 1;

  key: string = "";

  behaviours : Map<string, (game: Game, shape: any) => void> = new Map<string, (game: Game, shape: any) => void>();

  isOnScreen(camera: Camera): boolean {
    return this.position.x >= camera.position.x + camera.xOffset && this.position.x <= camera.position.x + 1024 + camera.xOffset
  }

  xOffset: number;
  yOffset: number;

  constructor(x: number, y: number, z: number) {
    this.position = new Vector(x, y);
    this.z = z;
    this.id = Id.retrieveNextElementId();
    this.birth = GameTime.frame();
  }

  render(camera: Camera) {
    this.xOffset = this.fixed ? this.position.x : this.position.x - camera.position.x + camera.xOffset;
    this.yOffset = this.fixed ? this.position.y : this.position.y - camera.position.y + camera.yOffset;
  }
  update(game: Game) {
    if(this.behaviours.size > 0) {
      this.behaviours.forEach(behaviour => behaviour(game, this));
    }
  }

  addBehaviour<SHAPE>(name: string, behaviour: (game: Game, shape: SHAPE) => void) {
    this.behaviours.set(name, behaviour);
  }

  addGenericBehaviour<SHAPE>(name: string, behaviour: Behaviour<SHAPE>) {
    this.behaviours.set(name, behaviour.behaviour);
  }

  removeBehaviour(name: string) {
    this.behaviours.delete(name);
  }

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

  destination: Vector;
  private percentageX: number;
  private percentageY: number;
  setDestination(vector: Vector) {
    this.destination = vector;
    let deltaX = this.position.x - vector.x;
    let deltaY = this.position.y - vector.y;
    let max = Math.abs(deltaX) + Math.abs(deltaY);
    this.percentageX = deltaX / max;
    this.percentageY = deltaY / max;
    return this;
  }

  moveTo(speed: number) {
    this.move(new Vector(-(this.percentageX * speed), -(this.percentageY * speed)));
  }

  move(velocity: Vector) {
    this.position.addTo(velocity);
  }

  setPosition(x: number, y: number) {
    this.position.x = x;
    this.position.y = y;
  }

  setLife(life: number) {
    this.life = life;
    this.maxLife = life;
    return this;
  }

  distanceToTarget(vector: Vector) {
    return Math.sqrt(Math.pow(this.position.x - vector.x, 2) + Math.pow(this.position.y - vector.y, 2));
  }

  toString() {
    return this.type + "(" + this.id + ")";
  }

  type: ElementType = ElementType.ELEMENT;
}
