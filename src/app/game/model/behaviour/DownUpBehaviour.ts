import {Behaviour} from "./Behaviour";
import {Game} from "../../service/Game";
import {Shape} from "../base/Shape";

export class DownUpBehaviour implements Behaviour<Shape> {
  speed: number;
  amplitude: number;

  constructor(shape: Shape, speed: number, amplitude: number, delayToStart: number) {
    this.amplitude = amplitude;
    this.speed = speed;
    this.startX = shape.position.x;
    this.startY = shape.position.y;
    this.delayToStart = delayToStart;
  }

  private delayToStart: number;
  private angle: number = 0;
  private startX: number;
  private startY: number;
  behaviour: (game: Game, shape: Shape) => void = (game, shape) => {
    if(game.gameTime > this.delayToStart) {
      let y = this.startY + Math.sin(this.angle) * this.amplitude;
      shape.setPosition(this.startX, y);
      this.angle += this.speed;
    }
  }
}
