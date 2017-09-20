import {Position} from "../../base/Position";
import {Game} from "../../../service/Game";
import {ColoredShape} from "../../base/shapes/ColoredShape";
import {Vector} from "../../base/Vector";
import {Equipment} from "./Equipment";
import {ElementCatalogue} from "../../catalogues/ElementCatalogue";
import {Player} from "../Player";
import {Camera} from "../../base/camera/Camera";
import {StrokedText} from "../../base/text/StrokedText";
import {Buyable} from "../currency/Buyable";

export class Engine extends Equipment implements Buyable {
  value: number = 0;
  power: number = .1;
  maxSpeed: number = 2;
  capacity: number = 200;
  level: number;
  engineHole: Position;
  engineFlame: ColoredShape;
  fuelConsumption: (acceleration: number) => number;

  label: StrokedText;

  constructor(x: number, y: number, z: number) {
    super(x, y, z);
    this.fuelConsumption = acceleration => acceleration / 20;
    this.level = this.capacity;
  }

  putOnPlayground() {
    this.elements.push(new ColoredShape(this.position.x, this.position.y, this.z, 10, 10, "#ee0000").setKey("player-engine").isDangerous(false));
    if(!this.isAttached()) {
      this.label = new StrokedText(this.position.x + 15, this.position.y + 8, this.z, "green", "14pt Calibri", 1, "black");
      this.label.text = " Lumpen - Antrieb " + this.value + " §";
    }
    return this;
  }

  attach(target: Player, slot: Vector) {
    this.elements = [];
    this.target = target;
    this.elements.push(new ColoredShape(target.position.x + slot.x - 10, target.position.y + slot.y - 5, target.z, 10, 10, "#ee0000").setKey("player-engine").isDangerous(false));

    this.engineHole = new Position(target.position.x + slot.x -12, target.position.y + slot.y - 1);
    this.engineFlame = new ColoredShape(target.position.x + slot.x -12, target.position.y + slot.y - 1, 0, 3, 0, "#eeb900");
  }

  update(game: Game) {
    if(this.isAttached()) {
      this.engineFlame.w = this.level > 0 ? Math.abs(this.target.velocity.x) * 15 : 0;
      this.engineFlame.position.x = this.engineHole.position.x - this.engineFlame.w;
    }
    if(!this.isAttached()) {
      this.checkForHit(game);
    }
    super.update(game);
  }

  checkForHit(game: Game) {
    let colliding = false;
    game.gameArea.elementsOnCamera().forEach((value) => {
      if(value instanceof Player) {
        this.elements.forEach(element => {
          value.hitboxes.forEach(hitboxPlayer => {
            if(!colliding && element.collision(hitboxPlayer)) {
              if(value.currency >= this.value) {
                colliding = true;
                game.gameArea.removeElement(this);
                value.buy(this);
                this.elements.forEach((colored) => {
                  if(colored instanceof ColoredShape) {
                    colored.explode(game);
                  }
                });
                value.setEngine(this);
              }
            }
          });
        })
      }
    });
  }

  move(vector: Vector) {
    super.move(vector);
    if(!this.isAttached()) {
      this.label.move(vector);
    }
    if(this.isAttached()) {
      this.engineFlame.move(vector);
      this.engineHole.move(vector);
    }
  }

  render(camera: Camera, canvas: string = "game"): any {
    super.render(camera, canvas);
    if(this.isAttached()) {
      this.engineFlame.render(camera, canvas);
    }
    if(!this.isAttached()) {
      this.label.render(camera, canvas);
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
    if(this.isAttached() && this.level > 0) {
      this.level -= this.fuelConsumption(acceleration);
    }
  }

  type: ElementCatalogue = ElementCatalogue.ENGINE;
}
