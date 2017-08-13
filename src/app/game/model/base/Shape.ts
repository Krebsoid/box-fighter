import {Element} from './Element';
import {Camera} from "./Camera";
import {Game} from "../../service/Game";
import {Behaviour} from "../behaviour/Behaviour";
import {Position} from "./Position";

export class Shape extends Element {

  h: number;
  w: number;
  colliding: boolean;

  behaviours : Map<string, (game: Game, shape: any) => void> = new Map<string, (game: Game, shape: any) => void>();

  constructor(x: number, y: number, z: number, h: number, w: number) {
    super(x, y, z);
    this.h = h;
    this.w = w;
  }

  isOnScreen(camera: Camera): boolean {
    let cameraShape: Shape = camera.shape();
    return cameraShape.containsPosition(new Position(this.x + 50, this.y)) ||
      cameraShape.containsPosition(new Position(this.x + 50, this.y + this.h)) ||
      cameraShape.containsPosition(new Position(this.x + 50 + this.w, this.y)) ||
      cameraShape.containsPosition(new Position(this.x + + 50 + this.w, this.y + this.h));
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
    return this.x < shape.x + shape.w &&
      this.x + this.w > shape.x &&
      this.y < shape.y + shape.h &&
      this.h + this.y > shape.y;
  }

  onHit(game: Game) {
    game.gameArea.removeElement(this);
  }

  type: string = "Shape";
}
