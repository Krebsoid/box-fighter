import {Element} from "../base/Element";
import {Equipment} from "./Equipment";
import {Position} from "../base/Position";
import {Game} from "../../service/Game";
import {ColoredShape} from "../base/ColoredShape";

export class Engine extends Equipment {

  acceleration: number = 1;
  capacity: number = 100;
  level: number;
  engineHole: Position;
  fuelConsumption: (acceleration: number) => number;

  constructor(target: Element) {
    super(target);
    this.elements.push(new ColoredShape(target.x-10, target.y+20, target.z, 10, 10, "#ee0000"));
    this.engineHole = new Position(target.x-12, target.y+24);
    this.elements.push(this.engineHole);
    this.fuelConsumption = acceleration => acceleration / 10;
    this.level = this.capacity;
  }

  update(game: Game) {
    super.update(game);
  }

  move(x: number, y: number) {
    super.move(x, y);
  }

  refuel(fuel: number) {
    this.level += fuel;
    if(this.level > this.capacity) {
      this.level = this.capacity;
    }
  }

  consumeFuel(acceleration: number) {
    if(this.level > 0) {
      this.level -= this.fuelConsumption(acceleration);
    }
  }
}
