import {Behaviour} from "./Behaviour";
import {Game} from "../../service/Game";
import {Position} from "../base/Position";
import {HomingColoredShape} from "../base/HomingColoredShape";

export class PathBehaviour implements Behaviour<HomingColoredShape> {
  speed: number;
  path: Array<(game: Game) => Position>;
  private active: number = 0;
  private needForNewTarget: boolean = true;

  constructor(speed: number, path: Array<(game: Game) => Position>) {
    this.speed = speed;
    this.path = path;
  }

  behaviour: (game: Game, shape: HomingColoredShape) => void = (game, shape) => {
    if(this.needForNewTarget) {
      shape.setTarget(this.path[this.active](game));
      this.needForNewTarget = false;
    }
    shape.moveTo(this.speed);
    if(shape.distanceToTarget(shape.target) < this.speed) {
      shape.setPosition(shape.target.x, shape.target.y);
      this.active = this.active + 1 < this.path.length ? this.active + 1 : 0;
      this.needForNewTarget = true;
    }
  }
}
