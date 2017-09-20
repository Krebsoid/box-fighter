import {Position} from "../../base/Position";
import {ColoredShape} from "../../base/shapes/ColoredShape";
import {Vector} from "../../base/Vector";
import {Player} from "../Player";
import {Engine} from "./Engine";
import {StrokedText} from "../../base/text/StrokedText";

export class FasterEngine extends Engine {
  power: number = .1;
  maxSpeed: number = 4;
  capacity: number = 400;

  constructor(x: number, y: number, z: number) {
    super(x, y, z);
    this.fuelConsumption = acceleration => acceleration / 5;
  }

  putOnPlayground() {
    this.elements.push(new ColoredShape(this.position.x, this.position.y, this.z, 10, 20, "#ee0000").setKey("player-engine").isDangerous(false));
    if(!this.isAttached()) {
      this.label = new StrokedText(this.position.x + 25, this.position.y + 8, this.z, "green", "14pt Calibri", 1, "black");
      this.label.text = "Super - Antrieb " + this.value + " §";
    }
    return this;
  }

  attach(target: Player, slot: Vector) {
    this.elements = [];
    this.target = target;
    this.elements.push(new ColoredShape(target.position.x + slot.x - 20, target.position.y + slot.y - 5, target.z, 10, 20, "#ee0000").setKey("player-engine").isDangerous(false));

    this.engineHole = new Position(target.position.x + slot.x - 22, target.position.y + slot.y - 1);
    this.engineFlame = new ColoredShape(target.position.x + slot.x - 12, target.position.y + slot.y - 1, 0, 3, 0, "#eeb900");
  }
}
