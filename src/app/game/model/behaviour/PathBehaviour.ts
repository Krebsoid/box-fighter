import {Behaviour} from "../base/Behaviour";
import {Game} from "../../service/Game";
import {Vector} from "../base/Vector";
import {Element} from "../base/Element";

export class PathBehaviour implements Behaviour<Element> {
  speed: number;
  path: Array<(game: Game) => Vector>;
  private active: number = 0;
  private needForNewTarget: boolean = true;

  constructor(speed: number, path: Array<(game: Game) => Vector>) {
    this.speed = speed;
    this.path = path;
  }

  behaviour: (game: Game, shape: Element) => void = (game, shape) => {
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
