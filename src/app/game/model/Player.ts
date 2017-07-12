import { Element } from './Element';
import {Camera} from "./Camera";
import {Game} from "../service/Game";
import {Engine} from "./parts/engine/Engine";
import {Weapon} from "./Weapon";
import {ColoredShape} from "./ColoredShape";

export class Player extends Element{

  elements: Element[] = [];
  engine: Engine;
  weapon: Weapon;

  constructor() {
    super(100, 500/2 - 25, 5);
    this.elements.push(new ColoredShape(this.x, this.y, this.z, 25, 25, "#234242"));
    this.elements.push(new ColoredShape(this.x+25, this.y, this.z, 25, 25, "#29ee4c"));
    this.elements.push(new ColoredShape(this.x+25, this.y+25, this.z, 25, 25, "#234242"));
    this.elements.push(new ColoredShape(this.x, this.y+25, this.z, 25, 25, "#29ee4c"));
  }

  render(camera: Camera) {
    this.elements.forEach((value, index, array) => value.render(camera));
  }

  setEngine(engine: Engine) {
    this.elements.push(engine);
    this.engine = engine;
  }
  setWeapon(weapon: Weapon) {
    this.elements.push(weapon);
    this.weapon = weapon;
  }

  update(game: Game) {
    this.elements.forEach((value, index, array) => value.update(game));
    let acceleration = this.engine ? this.engine.acceleration : 0;
    if(game.controls.down) {
      if(this.y <= 450) {
        this.move(0, acceleration);
        this.elements.forEach((value, index, array) => value.move(0, acceleration));
      }
    }
    if(game.controls.up) {
      if(this.y >= 0) {
        this.move(0, -acceleration);
        this.elements.forEach((value, index, array) => value.move(0, -acceleration));
      }
    }
    if(game.controls.right) {
      this.move(acceleration, 0);
      this.elements.forEach((value, index, array) => value.move(acceleration, 0));
    }
    if(game.controls.left) {
      this.move(-acceleration, 0);
      this.elements.forEach((value, index, array) => value.move(-acceleration, 0));
    }
  }

}
