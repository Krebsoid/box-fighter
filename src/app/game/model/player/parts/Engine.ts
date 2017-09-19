import {Position} from "../../base/Position";
import {Game} from "../../../service/Game";
import {ColoredShape} from "../../base/shapes/ColoredShape";
import {Vector} from "../../base/Vector";
import {Equipment} from "./Equipment";
import {ElementCatalogue} from "../../catalogues/ElementCatalogue";
import {Player} from "../Player";
import {Camera} from "../../base/camera/Camera";

export class Engine extends Equipment {
  power: number = .1;
  maxSpeed: number = 2;
  capacity: number = 200;
  level: number;
  engineHole: Position;
  engineFlame: ColoredShape;
  fuelConsumption: (acceleration: number) => number;

  constructor(x: number, y: number, z: number) {
    super(x, y, z);
    this.fuelConsumption = acceleration => acceleration / 20;
    this.level = this.capacity;
  }

  attach(target: Player, slot: Vector) {
    this.elements = [];
    this.target = target;
    this.elements.push(new ColoredShape(target.position.x + slot.x - 10, target.position.y + slot.y - 5, target.z, 10, 10, "#ee0000").setKey("player-engine").isDangerous(false));

    this.engineHole = new Position(target.position.x + slot.x -12, target.position.y + slot.y - 1);
    this.engineFlame = new ColoredShape(target.position.x + slot.x -12, target.position.y + slot.y - 1, 0, 3, 0, "#eeb900");
  }

  update(game: Game) {
    this.engineFlame.w = Math.abs(this.target.velocity.x) * 15;
    this.engineFlame.position.x = this.engineHole.position.x - this.engineFlame.w;
    super.update(game);
  }

  move(vector: Vector) {
    super.move(vector);
    if(this.target) {
      this.engineFlame.move(vector);
      this.engineHole.move(vector);
    }
  }

  render(camera: Camera, canvas: string = "game"): any {
    this.engineFlame.render(camera, canvas);
    return super.render(camera, canvas);
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
