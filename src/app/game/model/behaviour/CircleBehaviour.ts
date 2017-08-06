import {Behaviour} from "./Behaviour";
import {Game} from "../../service/Game";
import {Shape} from "../base/Shape";

export class CircleBehaviour implements Behaviour<Shape> {
  radius: number;
  angle: number;

  constructor(radius: number) {
    this.radius = radius;
    this.angle = Math.PI / 180;
  }

  behaviour: (game: Game, shape: Shape) => void = (game, shape) => {
    this.angle += Math.PI / 180;
    let x = 500 + this.radius * (Math.cos(this.angle));
    let y = 250 + this.radius * (Math.sin(this.angle));
    shape.setPosition(x, y);
  }
}
