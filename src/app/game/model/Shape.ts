import { Element } from './Element';
import {Camera} from "./Camera";
import {Game} from "../service/Game";

export class Shape extends Element {

  h: number;
  w: number;
  color: string;
  colliding: boolean;

  behaviours : Map<string, (game: Game, shape: Shape) => void> = new Map<string, (game: Game, shape: Shape) => void>();

  constructor(x: number, y: number, z: number, h: number, w: number, color: string) {
    super(x, y, z);
    this.h = h;
    this.w = w;
    this.color = color;
  }

  render(camera: Camera) {
    super.render(camera);
    if(this.colliding) {
      Element.context().fillStyle = "#ff0000";
    } else {
      Element.context().fillStyle = this.color;
    }

    Element.context().fillRect(this.xOffset, this.yOffset, this.h, this.w);
  }

  addBehaviour(name: string, behaviour: (game: Game, shape: Shape) => void) {
    this.behaviours.set(name, behaviour);
  }

  removeBehaviour(name: string) {
    this.behaviours.delete(name);
  }

  update(game: Game) {
    this.colliding = false;
    if(this.behaviours.size > 0) {
      this.behaviours.forEach((value, index, array) => value(game, this));
    }
  }

  collision?(shape: Shape) : boolean {
    return this.x < shape.x + shape.w &&
      this.x + this.w > shape.x &&
      this.y < shape.y + shape.h &&
      this.h + this.y > shape.y;
  }

  hit?(game: Game) {
    game.gameArea.removeElement(this);
  }

}
