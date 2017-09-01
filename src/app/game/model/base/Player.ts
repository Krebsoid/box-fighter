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
import {ElementType} from "./ElementType";
import {SceneType} from "../scene/SceneType";

export class Player extends Element implements ValuableConsumer {

  elements: Element[] = [];
  hitboxes: Shape[] = [];
  engine: Engine;
  weapon: Weapon;
  height: number;

  currency: number = 0;

  constructor() {
    super(100, 500/2 - 25, 5);
    this.elements.push(new ColoredShape(this.x, this.y, this.z, 25, 25, "#234242"));
    this.elements.push(new ColoredShape(this.x+25, this.y, this.z, 25, 25, "#29ee4c"));
    this.elements.push(new ColoredShape(this.x+25, this.y+25, this.z, 25, 25, "#234242"));
    this.elements.push(new ColoredShape(this.x, this.y+25, this.z, 25, 25, "#29ee4c"));
    let hitbox = new Shape(this.x, this.y, this.z, 50, 50);
    this.hitboxes.push(hitbox);
    this.elements.push(hitbox);
    this.height = this.calculateHeight();
    this.setWeapon(new Weapon(0,0,0));
    this.setEngine(new Engine(0,0,0));
  }

  resetPosition(x: number, y: number, z: number) {
    this.setPosition(x, y);
    let weapon = this.weapon;
    let engine = this.engine;
    this.weapon = undefined;
    this.engine = undefined;
    this.elements = [];
    this.hitboxes = [];
    this.elements.push(new ColoredShape(x, y, z, 25, 25, "#234242"));
    this.elements.push(new ColoredShape(x+25, y, z, 25, 25, "#29ee4c"));
    this.elements.push(new ColoredShape(x+25, y+25, z, 25, 25, "#234242"));
    this.elements.push(new ColoredShape(x, y+25, z, 25, 25, "#29ee4c"));
    let hitbox = new Shape(x, y, z, 50, 50);
    this.hitboxes.push(hitbox);
    this.elements.push(hitbox);
    this.height = this.calculateHeight();
    this.setWeapon(weapon);
    this.setEngine(engine);
  }

  isOnScreen(): boolean {
    return true;
  }

  render(camera: Camera) {
    this.elements.forEach(value => value.render(camera));
  }

  setEngine(engine: Engine) {
    if(this.engine) {
      let enginePosition = this.elements.indexOf(this.engine);
      this.elements.splice(enginePosition, 1);
    }
    engine.attach(this);
    this.elements.push(engine);
    this.engine = engine;
  }
  setWeapon(weapon: Weapon) {
    if(this.weapon) {
      let weaponPosition = this.elements.indexOf(this.weapon);
      this.weapon.detach();
      this.elements.splice(weaponPosition, 1);
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

  calculateHeight(): number {
    let minX = this.x;
    let maxX = this.x;
    this.elements.forEach(value => value instanceof Shape && minX >= value.x ? minX = value.x : minX);
    this.elements.forEach(value => value instanceof Shape && maxX <= value.x + value.h ? maxX = value.x + value.h : maxX);
    return maxX - minX;
  }

  update(game: Game) {
    this.doMovement(game);
    this.checkForHits(game);
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
            game.changeGameState(SceneType.DEAD, 1500);
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
  }
  buy(buyable: Buyable) {
    this.currency -= buyable.value;
  }

  doMovement(game: Game) {
    this.elements.forEach(value => value.update(game));
    if(this.engine.level > 0) {
      let acceleration = this.engine ? this.engine.acceleration : 0;
      let levelBorders = game.getActiveScene().levelBorders;
      if(game.controls.down) {
        if(this.y <= levelBorders.h - this.height) {
          this.move(0, acceleration);
          this.elements.forEach(value => value.move(0, acceleration));
        }
      }
      if(game.controls.up) {
        if(this.y >= levelBorders.y) {
          this.move(0, -acceleration);
          this.elements.forEach(value => value.move(0, -acceleration));
        }
      }
      if(game.controls.right) {
        if(this.x <= levelBorders.w) {
          this.move(acceleration, 0);
          this.elements.forEach(value => value.move(acceleration, 0));
        }
      }
      if(game.controls.left) {
        if(this.x >= levelBorders.x) {
          this.move(-acceleration, 0);
          this.elements.forEach(value => value.move(-acceleration, 0));
        }
      }
      if(game.controls.isMoving()) {
        this.engine.consumeFuel(Math.abs(acceleration));
      }
    }
  }

  type: ElementType = ElementType.PLAYER;
}
