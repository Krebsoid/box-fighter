import { Element } from './Element';
import {Camera} from "./Camera";
import {Game} from "../../service/Game";
import {Engine} from "../parts/Engine";
import {Weapon} from "../parts/Weapon";
import {ColoredShape} from "./ColoredShape";
import {Shape} from "./Shape";

export class Player extends Element{

  elements: Element[] = [];
  hitboxes: Shape[] = [];
  engine: Engine;
  weapon: Weapon;

  constructor() {
    super(100, 500/2 - 25, 5);
    this.elements.push(new ColoredShape(this.x, this.y, this.z, 25, 25, "#234242", false));
    this.elements.push(new ColoredShape(this.x+25, this.y, this.z, 25, 25, "#29ee4c", false));
    this.elements.push(new ColoredShape(this.x+25, this.y+25, this.z, 25, 25, "#234242", false));
    this.elements.push(new ColoredShape(this.x, this.y+25, this.z, 25, 25, "#29ee4c", false));
    let hitbox = new Shape(this.x, this.y, this.z, 50, 50);
    this.hitboxes.push(hitbox);
    this.elements.push(hitbox)
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
    this.doMovement(game);
    this.checkForHits(game);
  }

  checkForHits(game: Game) {
    game.gameArea.elementsOnCamera().forEach((value) => {
      if(value instanceof ColoredShape) {
        this.hitboxes.forEach((hitbox) => {
          if(hitbox.collision(value)) {
            value.onHit(game);
            game.gameArea.removeElement(this);
            game.changeGameState('DEAD', 1500);
            this.elements.forEach((colored) => {
              if(colored instanceof ColoredShape) {
                colored.explode(game);
              }
            });
          }
        })
      }
    });
  }

  doMovement(game: Game) {
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
      if(this.x >= 0) {
        this.move(-acceleration, 0);
        this.elements.forEach((value, index, array) => value.move(-acceleration, 0));
      }
    }
  }
}
