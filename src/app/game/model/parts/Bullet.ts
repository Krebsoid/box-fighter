import {Shape} from "../base/Shape";
import {Camera} from "../base/Camera";
import {Game} from "../../service/Game";
import {Weapon} from "./Weapon";
import {ColoredShape} from "../base/ColoredShape";
import {Valuable} from "../base/Valuable";
import {Player} from "../base/Player";
import {Position} from "../base/Position";

export class Bullet extends ColoredShape {
  maxRange: number = 800;
  speed: number = 5;
  travelled: number = 0;
  weapon: Weapon;

  constructor(weapon: Weapon, origin: Position) {
    super(origin.x, origin.y, origin.z, 5, 5, "#000");
    this.weapon = weapon;
  }

  render(camera: Camera) {
    super.render(camera);
  }

  update(game: Game) {
    let self = this;

    function instanceOfValuable(valuable: any): valuable is Valuable {
      return 'value' in valuable;
    }

    game.gameArea.elementsOnCamera().forEach((value) => {
      if(value instanceof Shape) {
        if(this.collision(value) && value != self) {
          if(value.destructible) {
            value.onHit(game);
          }
          game.gameArea.removeElement(self);
          if(instanceOfValuable(value)) {
            (<Player>this.weapon.target).consume(value);
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

  type: string = "Bullet";
}
