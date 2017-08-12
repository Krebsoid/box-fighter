import {Element} from './Element';
import {Camera} from "./Camera";
import {Game} from "../../service/Game";
import {Engine} from "../parts/Engine";
import {Weapon} from "../parts/Weapon";
import {ColoredShape} from "./ColoredShape";
import {Shape} from "./Shape";
import {Valuable} from "./Valuable";
import {ValuableConsumer} from "./ValuableConsumer";
import {Buyable} from "./Buyable";

export class Player extends Element implements ValuableConsumer {

  elements: Element[] = [];
  hitboxes: Shape[] = [];
  engine: Engine;
  weapon: Weapon;

  currency: number = 1000;

  constructor() {
    super(100, 500/2 - 25, 5);
    this.elements.push(new ColoredShape(this.x, this.y, this.z, 25, 25, "#234242"));
    this.elements.push(new ColoredShape(this.x+25, this.y, this.z, 25, 25, "#29ee4c"));
    this.elements.push(new ColoredShape(this.x+25, this.y+25, this.z, 25, 25, "#234242"));
    this.elements.push(new ColoredShape(this.x, this.y+25, this.z, 25, 25, "#29ee4c"));
    let hitbox = new Shape(this.x, this.y, this.z, 50, 50);
    this.hitboxes.push(hitbox);
    this.elements.push(hitbox);
  }

  render(camera: Camera) {
    this.elements.forEach(value => value.render(camera));
  }

  setEngine(engine: Engine) {
    if(this.engine) {
      let enginePosition = this.elements.indexOf(this.engine);
      this.elements = this.elements.slice(enginePosition, enginePosition + 1);
    }
    engine.attach(this);
    this.elements.push(engine);
    this.engine = engine;
  }
  setWeapon(weapon: Weapon) {
    if(this.weapon) {
      let weaponPosition = this.elements.indexOf(this.weapon);
      this.elements = this.elements.slice(weaponPosition, weaponPosition + 1);
    }
    weapon.attach(this);
    this.elements.push(weapon);
    weapon.elements.forEach(element => {
      if(element instanceof ColoredShape) {
        this.hitboxes.push(element);
      }
    });
    this.weapon = weapon;
  }

  update(game: Game) {
    this.doMovement(game);
    //this.checkForHits(game);
  }

  checkForHits(game: Game) {
    let colliding = false;
    game.gameArea.elementsOnCamera().forEach((value) => {
      if(value instanceof ColoredShape && value.dangerous) {
        this.hitboxes.forEach(hitbox => {
          if(!colliding && hitbox.collision(value)) {
            colliding = true;
            value.onHit(game);
            game.gameArea.removeElement(this);
            game.changeGameState('DEAD', 1500);
            this.elements.forEach(colored => {
              if(colored instanceof ColoredShape) {
                colored.explode(game);
              }
            });
          }
        })
      }
    });
  }

  consume(valuable: Valuable) {
    this.currency += valuable.value;
    console.log("player got " + this.currency + " currency");
  }
  buy(buyable: Buyable) {
    this.currency -= buyable.value;
    console.log("player got " + this.currency + " currency");
  }

  doMovement(game: Game) {
    this.elements.forEach(value => value.update(game));
    if(this.engine.level > 0) {
      let acceleration = this.engine ? this.engine.acceleration : 0;
      if(game.controls.down) {
        if(this.y <= 450) {
          this.move(0, acceleration);
          this.elements.forEach(value => value.move(0, acceleration));
        }
      }
      if(game.controls.up) {
        if(this.y >= 0) {
          this.move(0, -acceleration);
          this.elements.forEach(value => value.move(0, -acceleration));
        }
      }
      if(game.controls.right) {
        this.move(acceleration, 0);
        this.elements.forEach(value => value.move(acceleration, 0));
      }
      if(game.controls.left) {
        if(this.x >= 0) {
          this.move(-acceleration, 0);
          this.elements.forEach(value => value.move(-acceleration, 0));
        }
      }
      if(game.controls.isMoving()) {
        this.engine.consumeFuel(Math.abs(acceleration));
      }
    }
  }

  type: string = "Player";
}
