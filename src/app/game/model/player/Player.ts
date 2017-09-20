import {Element} from '../base/Element';
import {Camera} from "../base/camera/Camera";
import {Game} from "../../service/Game";
import {Engine} from "./parts/Engine";
import {Weapon} from "./parts/Weapon";
import {ColoredShape} from "../base/shapes/ColoredShape";
import {Shape} from "../base/shapes/Shape";
import {Valuable} from "./currency/Valuable";
import {ValuableConsumer} from "./currency/ValuableConsumer";
import {Buyable} from "./currency/Buyable";
import {Vector} from "../base/Vector";
import {ElementCatalogue} from "../catalogues/ElementCatalogue";
import {SceneCatalogue} from "../catalogues/SceneCatalogue";

export class Player extends Element implements ValuableConsumer {

  elements: Element[] = [];
  hitboxes: Shape[] = [];
  engine: Engine;
  weapon: Weapon;
  weaponSlot: Vector;
  engineSlot: Vector;
  height: number;

  currency: number = 0;
  dead: boolean = false;
  lifes: number = 3;

  lastScene: SceneCatalogue;

  constructor() {
    super(100, 500/2 - 25, 5);
    this.weaponSlot = new Vector(50, 25);
    this.engineSlot = new Vector(0, 25);
    this.createModel(this.position.x, this.position.y, this.z, new Weapon(0,0,0), new Engine(0,0,0));
  }

  reset(x: number, y: number, z: number) {
    this.setPosition(x, y);

    let weapon = this.weapon;
    let engine = this.engine;
    this.weapon = undefined;
    this.engine = undefined;
    this.elements = [];
    this.hitboxes = [];
    this.createModel(x, y, z, weapon, engine);
  }

  revive(x: number, y: number, z: number) {
    this.reset(x, y, z);
    this.dead = false;
    this.weapon.reset();
    this.engine.reset();
  }

  createModel(x: number, y: number, z: number, weapon: Weapon, engine: Engine) {
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

  render(camera: Camera, canvas: string = "game") {
    this.elements.forEach(value => value.render(camera, canvas));
  }

  setEngine(engine: Engine) {
    if(this.engine) {
      let enginePosition = this.elements.indexOf(this.engine);
      this.engine.detach();
      this.elements.splice(enginePosition, 1);
    }
    engine.attach(this, this.engineSlot);
    this.elements.push(engine);
    this.engine = engine;
  }
  setWeapon(weapon: Weapon) {
    if(this.weapon) {
      let weaponPosition = this.elements.indexOf(this.weapon);
      this.weapon.detach();
      this.elements.splice(weaponPosition, 1);
    }
    weapon.attach(this, this.weaponSlot);
    this.elements.push(weapon);
    weapon.elements.forEach(element => {
      if(element instanceof ColoredShape) {
        this.hitboxes.push(element);
      }
    });
    this.weapon = weapon;
  }

  calculateHeight(): number {
    let minX = this.position.x;
    let maxX = this.position.x;
    this.elements.forEach(value => value instanceof Shape && minX >= value.position.x ? minX = value.position.x : minX);
    this.elements.forEach(value => value instanceof Shape && maxX <= value.position.x + value.h ? maxX = value.position.x + value.h : maxX);
    return maxX - minX;
  }

  update(game: Game) {
    if(this.destination) {
      this.moveTo(this.engine.power);
      console.log(this.distanceToTarget(this.destination));
      if(this.distanceToTarget(this.destination) < 5) {
        this.destination = undefined;
      }
    } else {
      this.doMovementAccelerated(game);
    }

    this.checkForHits(game);
  }

  checkForHits(game: Game) {
    if(!this.dead) {
      game.gameArea.elementsOnCamera().forEach((value) => {
        if(value instanceof ColoredShape && value.dangerous) {
          this.hitboxes.forEach(hitbox => {
            if(hitbox.collision(value)) {
              value.onHit(game);
              this.dying(game);
            }
          })
        }
      });
    }
  }

  dying(game: Game) {
    if(!this.dead) {
      this.dead = true;
      this.velocity = new Vector(0, 0);
      game.gameArea.removeElement(this);
      this.lifes -= 1;
      game.changeGameState(this.lifes == 0 ? SceneCatalogue.DEAD : SceneCatalogue.TRY_AGAIN, 1500);
      this.elements.forEach(colored => {
        if(colored instanceof ColoredShape) {
          colored.explode(game);
        }
      });
    }
  }

  consume(valuable: Valuable) {
    this.currency += valuable.value;
  }
  buy(buyable: Buyable) {
    this.currency -= buyable.value;
  }

  doMovement(game: Game) {
    this.elements.forEach(value => value.update(game));
    this.velocity = new Vector(0, 0);
    if(this.engine.level > 0 && !this.dead) {
      let acceleration = this.engine ? this.engine.maxSpeed : 0;
      let levelBorders = game.getActiveScene().levelBorders;
      let xAcceleration = 0;
      let yAcceleration = 0;
      if(game.controls.down) {
        yAcceleration = this.position.y <= levelBorders.h - this.height ? acceleration : 0;
      }
      if(game.controls.up) {
        yAcceleration = this.position.y >= levelBorders.position.y ? -acceleration : 0;
      }
      if(game.controls.right) {
        xAcceleration = this.position.x <= levelBorders.w ? acceleration : 0;
      }
      if(game.controls.left) {
        xAcceleration = this.position.x >= levelBorders.position.x ? -acceleration : 0;
      }
      if(game.controls.isMoving()) {
        this.velocity = new Vector(xAcceleration, yAcceleration);
        this.move(this.velocity);
        this.elements.forEach(value => value.move(this.velocity));
        this.engine.consumeFuel(Math.abs(acceleration));
      }
    }
  }

  doMovementAccelerated(game: Game) {
    this.elements.forEach(value => value.update(game));
    if(this.engine.level > 0 && !this.dead) {
      if(this.checkBorderHit(game)) return;

      this.applyAcceleration(game);

      if(game.controls.isMoving()) {
        this.engine.consumeFuel(Math.abs(this.engine.maxSpeed));
      }

      this.applyFriction(game);

      this.accelerate(this.acceleration);
      this.move(this.velocity);

      this.elements.forEach(value => {
        value.accelerate(this.acceleration);
        value.move(this.velocity);
      });
    }
  }

  private checkBorderHit(game: Game): boolean {
    let levelBorders = game.getActiveScene().levelBorders;
    if(this.position.y > levelBorders.h - this.height) {
      this.velocity = new Vector(0, 0);
      this.acceleration = new Vector(0, 0);
      this.reset(this.position.x, levelBorders.h - this.height, this.z);
      return true;
    }
    if(this.position.y < levelBorders.position.y) {
      this.velocity = new Vector(0, 0);
      this.acceleration = new Vector(0, 0);
      this.reset(this.position.x, 0, this.z);
      return true;
    }
    if(this.position.x > levelBorders.w) {
      this.velocity = new Vector(0, 0);
      this.acceleration = new Vector(0, 0);
      this.reset(levelBorders.w, this.position.y, this.z);
      return true;
    }
    if(this.position.x < levelBorders.position.x) {
      this.velocity = new Vector(0, 0);
      this.acceleration = new Vector(0, 0);
      this.reset(0, this.position.y, this.z);
      return true;
    }
    return false;
  }

  private applyAcceleration(game: Game) {
    if(game.controls.down) {
      if(this.velocity.y <= this.engine.maxSpeed) {
        this.acceleration.y = this.engine.power;
      } else {
        this.acceleration.y = 0;
      }
    }
    if(game.controls.up) {
      if(this.velocity.y >= -this.engine.maxSpeed) {
        this.acceleration.y = -this.engine.power;
      } else {
        this.acceleration.y = 0;
      }
    }
    if(game.controls.right) {
      if(this.velocity.x <= this.engine.maxSpeed) {
        this.acceleration.x = this.engine.power;
      } else {
        this.acceleration.x = 0;
      }
    }
    if(game.controls.left) {
      if(this.velocity.x >= -this.engine.maxSpeed) {
        this.acceleration.x = -this.engine.power;
      } else {
        this.acceleration.x = 0;
      }
    }
  }

  private applyFriction(game: Game) {
    if(!game.controls.isMovingX()) {
      this.acceleration.x = 0;
      if(Math.abs(this.velocity.x) <= this.engine.power) {
        this.velocity.x = 0;
      }
      if(this.velocity.x > 0) {
        this.velocity.x -= this.engine.power;
      } else if(this.velocity.x < 0) {
        this.velocity.x += this.engine.power;
      }
    }
    if(!game.controls.isMovingY()) {
      this.acceleration.y = 0;
      if(Math.abs(this.velocity.y) <= this.engine.power) {
        this.velocity.y = 0;
      }
      if(this.velocity.y > 0) {
        this.velocity.y -= this.engine.power;
      } else if(this.velocity.y < 0) {
        this.velocity.y += this.engine.power;
      }
    }
  }

  moveTo(speed: number): any {
    super.moveTo(speed);
    this.elements.forEach(value => value.move(this.velocity));
  }

  type: ElementCatalogue = ElementCatalogue.PLAYER;
}
