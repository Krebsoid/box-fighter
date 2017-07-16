import {Element} from "../../Element";
import {Equipment} from "../Equipment";
import {Position} from "../../Position";
import {Game} from "../../../service/Game";
import {ColoredShape} from "../../ColoredShape";

export class Engine extends Equipment {

  acceleration: number = 1;
  engineHole: Position;

  constructor(target: Element) {
    super(target);
    this.elements.push(new ColoredShape(target.x-10, target.y+20, target.z, 10, 10, "#ee0000", false));
    this.engineHole = new Position(target.x-12, target.y+24);
  }

  update(game: Game) {
    super.update(game);
  }

  move(x: number, y: number) {
    super.move(x, y);
    this.engineHole.move(x, y);
  }

}
