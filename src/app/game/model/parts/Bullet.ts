import {Shape} from "../base/Shape";
import {Camera} from "../base/Camera";
import {Game} from "../../service/Game";
import {Weapon} from "./Weapon";
import {ColoredShape} from "../base/ColoredShape";
import {Valuable} from "../base/Valuable";
import {Player} from "../base/Player";
import {Position} from "../base/Position";
import {Damage, DamageType} from "../base/Damage";
import {ElementType} from "../base/ElementType";

export class Bullet extends ColoredShape implements Damage {
  maxRange: number = 800;
  speed: number = 5;
  travelled: number = 0;
  damage: number = 1;
  damageType: DamageType = DamageType.BASIC;
  weapon: Weapon;

  constructor(weapon: Weapon, origin: Position) {
    super(origin.x, origin.y, origin.z, 5, 5, "#000");
    this.weapon = weapon;
  }

  render(camera: Camera) {
    super.render(camera);
  }

  update(game: Game) {
    function instanceOfValuable(valuable: any): valuable is Valuable {
      return 'value' in valuable;
    }

    game.gameArea.elementsOnCamera().forEach((value) => {
      if(value instanceof Shape) {
        if(this.collision(value)) {
          if(value.destructible) {
            value.onDamage(this);
            value.onHit(game);
          }
          this.onKill(game);
          if(instanceOfValuable(value) && value.life <= 0) {
            this.weapon.target && (<Player>this.weapon.target).consume(value);
          }
        }
      }
    });
    if(this.maxRange <= this.travelled) {
      game.gameArea.removeElement(this);
    }
    this.move(this.speed, 0);
    this.travelled += this.speed;
  }

  type: ElementType = ElementType.BULLET;
}
