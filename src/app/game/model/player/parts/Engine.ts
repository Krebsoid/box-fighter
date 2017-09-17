import {Position} from "../../base/Position";
import {Game} from "../../../service/Game";
import {ColoredShape} from "../../base/shapes/ColoredShape";
import {Vector} from "../../base/Vector";
import {Equipment} from "./Equipment";
import {Element} from "../../base/Element";
import {ElementCatalogue} from "../../catalogues/ElementCatalogue";

export class Engine extends Equipment {
  acceleration: number = .1;
  maxSpeed: number = 2;
  capacity: number = 200;
  level: number;
  engineHole: Position;
  fuelConsumption: (acceleration: number) => number;

  constructor(x: number, y: number, z: number) {
    super(x, y, z);
    this.fuelConsumption = acceleration => acceleration / 20;
    this.level = this.capacity;
  }

  attach(target: Element) {
    this.elements = [];
    this.target = target;
    this.elements.push(new ColoredShape(target.position.x-10, target.position.y+20, target.z, 10, 10, "#ee0000").isDangerous(false));
    this.engineHole = new Position(target.position.x-12, target.position.y+24);
  }

  update(game: Game) {
    super.update(game);
  }

  move(vector: Vector) {
    super.move(vector);
    if(this.target) {
      this.engineHole.move(vector);
    }
  }

  reset() {
    this.level = this.capacity;
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

  type: ElementCatalogue = ElementCatalogue.ENGINE;
}
