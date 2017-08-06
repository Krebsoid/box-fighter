import {Element} from './Element';
import {Camera} from "./Camera";
import {Game} from "../../service/Game";
import {Behaviour} from "../behaviour/Behaviour";

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

  collision?(shape: Shape) : boolean {
    return this.x < shape.x + shape.w &&
      this.x + this.w > shape.x &&
      this.y < shape.y + shape.h &&
      this.h + this.y > shape.y;
  }

  onHit(game: Game) {
    game.gameArea.removeElement(this);
  }

}
