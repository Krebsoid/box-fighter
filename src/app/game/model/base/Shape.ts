import {Element} from './Element';
import {Camera} from "./Camera";
import {Game} from "../../service/Game";
import {Behaviour} from "../behaviour/Behaviour";
import {Position} from "./Position";
import {Damage} from "./Damage";
import {ElementType} from "./ElementType";

export class Shape extends Element {

  h: number;
  w: number;
  colliding: boolean;
  maxLife: number = 1;
  life: number = 1;

  behaviours : Map<string, (game: Game, shape: any) => void> = new Map<string, (game: Game, shape: any) => void>();

  constructor(x: number, y: number, z: number, h: number, w: number) {
    super(x, y, z);
    this.h = h;
    this.w = w;
  }

  isOnScreen(camera: Camera): boolean {
    let cameraShape: Shape = camera.shape();
    return cameraShape.containsPosition(new Position(this.x + camera.xOffset, this.y + camera.yOffset)) ||
      cameraShape.containsPosition(new Position(this.x + camera.xOffset, this.y + camera.yOffset + this.h)) ||
      cameraShape.containsPosition(new Position(this.x + camera.xOffset + this.w, this.y + camera.yOffset)) ||
      cameraShape.containsPosition(new Position(this.x + camera.xOffset + this.w, this.y + camera.yOffset + this.h));
  }

  render(camera: Camera) {
    super.render(camera);
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

  update(game: Game) {
    this.colliding = false;
    if(this.behaviours.size > 0) {
      this.behaviours.forEach(value => value(game, this));
    }
  }

  containsPosition?(position: Position): boolean {
    return position.x > this.x && position.x < this.x + this.w && position.y > this.y && position.y < this.y + this.h;
  }

  collision?(shape: Shape) : boolean {
    return shape != this && shape.collidable && this.x < shape.x + shape.w &&
      this.x + this.w > shape.x &&
      this.y < shape.y + shape.h &&
      this.h + this.y > shape.y;
  }

  onDamage(damage: Damage) {
    this.life -= damage.damage;
  }

  onHit(game: Game) {
    this.life <= 0 && this.destructible ? this.onKill(game) : undefined;
  }

  onKill(game: Game) {
    game.gameArea.removeElement(this);
  }

  type: ElementType = ElementType.SHAPE;
}
