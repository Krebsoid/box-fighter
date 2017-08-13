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

  constructor(x: number, y: number, z: number) {
    super(x, y, z);
    this.fuelConsumption = acceleration => acceleration / 10;
    this.level = this.capacity;
  }

  attach(target: Element) {
    this.elements = [];
    this.target = target;
    this.elements.push(new ColoredShape(target.x-10, target.y+20, target.z, 10, 10, "#ee0000").isDangerous(false));
    this.engineHole = new Position(target.x-12, target.y+24);
  }

  update(game: Game) {
    super.update(game);
  }

  move(x: number, y: number) {
    super.move(x, y);
    if(this.target) {
      this.engineHole.move(x, y);
    }
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

  type: string = "Engine";
}
