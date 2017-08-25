import {Behaviour} from "./Behaviour";
import {Game} from "../../service/Game";
import {Position} from "../base/Position";
import {ColoredShape} from "../base/ColoredShape";

export class PathBehaviour implements Behaviour<ColoredShape> {
  speed: number;
  path: Array<(game: Game) => Position>;
  private active: number = 0;
  private needForNewTarget: boolean = true;

  constructor(speed: number, path: Array<(game: Game) => Position>) {
    this.speed = speed;
    this.path = path;
  }

  behaviour: (game: Game, shape: ColoredShape) => void = (game, shape) => {
    if(this.needForNewTarget) {
      shape.setDestination(this.path[this.active](game));
      this.needForNewTarget = false;
    }
    shape.moveTo(this.speed);
    if(shape.distanceToTarget(shape.destination) < this.speed) {
      shape.setPosition(shape.destination.x, shape.destination.y);
      this.active = this.active + 1 < this.path.length ? this.active + 1 : 0;
      this.needForNewTarget = true;
    }
  }
}
