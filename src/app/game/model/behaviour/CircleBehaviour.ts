import {Behaviour} from "../base/Behaviour";
import {Game} from "../../service/Game";
import {Shape} from "../base/shapes/Shape";

export class CircleBehaviour implements Behaviour<Shape> {
  radius: number;
  speed: number;
  private angle: number;

  constructor(radius: number, speed: number, shape: Shape) {
    this.radius = radius;
    this.speed = speed;
    this.angle = Math.PI / 360 * this.speed;
    this.centerX = shape.position.x;
    this.centerY = shape.position.y;
  }

  private centerX: number;
  private centerY: number;
  behaviour: (game: Game, shape: Shape) => void = (game, shape) => {
    this.angle += Math.PI / 360 * this.speed;
    let x = this.centerX + this.radius * (Math.cos(this.angle));
    let y = this.centerY + this.radius * (Math.sin(this.angle));
    shape.setPosition(x, y);
  }
}
