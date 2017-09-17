import {Shape} from "../../base/shapes/Shape";
import {Camera} from "../../base/camera/Camera";
import {Game} from "../../../service/Game";
import {Weapon} from "./Weapon";
import {ColoredShape} from "../../base/shapes/ColoredShape";
import {Valuable} from "../currency/Valuable";
import {Player} from "../Player";
import {Damage, DamageType} from "../../base/Damage";
import {Vector} from "../../base/Vector";
import {ElementCatalogue} from "../../catalogues/ElementCatalogue";

export class Bullet extends ColoredShape implements Damage {
  maxRange: number = 800;
  speed: number = 5;
  travelled: number = 0;
  damage: number = 1;
  damageType: DamageType = DamageType.BASIC;
  weapon: Weapon;

  constructor(weapon: Weapon, origin: Vector) {
    super(origin.x, origin.y, 0, 5, 5, "#000");
    this.weapon = weapon;
  }

  render(camera: Camera, canvas: string = "game") {
    super.render(camera, canvas);
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
    this.move(new Vector(this.speed, 0));
    this.travelled += this.speed;
  }

  type: ElementCatalogue = ElementCatalogue.BULLET;
}
