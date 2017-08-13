import { Element } from '../base/Element';
import {Game} from "../../service/Game";
import {Bullet} from "./Bullet";
import {Position} from "../base/Position";
import {ColoredShape} from "../base/ColoredShape";
import {StrokedText} from "../base/StrokedText";
import {Weapon} from "./Weapon";

export class DoubleWeapon extends Weapon {
  value: number = 1500;

  bulletHole: Position;
  bulletHole2: Position;

  constructor(x: number, y: number, z: number) {
    super(x, y, z);
    this.elements.push(new ColoredShape(x, y, z, 8, 8, "#0206ee").isDangerous(false));
    this.elements.push(new ColoredShape(x + 9, y, z, 8, 8, "#0206ee").isDangerous(false));
    this.elements.push(new ColoredShape(x + 18, y, z, 8, 8, "#0206ee").isDangerous(false));
    this.elements.push(new ColoredShape(x + 27, y, z, 8, 8, "#0206ee").isDangerous(false));

    this.elements.push(new ColoredShape(x, y + 9, z, 8, 8, "#0206ee").isDangerous(false));

    this.elements.push(new ColoredShape(x, y + 18, z, 8, 8, "#0206ee").isDangerous(false));
    this.elements.push(new ColoredShape(x + 9, y + 18, z, 8, 8, "#0206ee").isDangerous(false));
    this.elements.push(new ColoredShape(x + 18, y + 18, z, 8, 8, "#0206ee").isDangerous(false));
    this.elements.push(new ColoredShape(x + 27, y + 18, z, 8, 8, "#0206ee").isDangerous(false));
    if(!this.isAttached()) {
      this.label = new StrokedText(x + 40, y + 18, z, "green", "14pt Calibri", 1, "black");
      this.label.text = "Doppel-Wumme " + this.value + " §";
    }
  }

  attach(target: Element) {
    this.elements = [];
    this.label = undefined;
    this.target = target;
    this.elements.push(new ColoredShape(target.x+50, target.y+10+3, target.z, 8, 8, "#0206ee").isDangerous(false));
    this.elements.push(new ColoredShape(target.x+59, target.y+10+3, target.z, 8, 8, "#0206ee").isDangerous(false));
    this.elements.push(new ColoredShape(target.x+68, target.y+10+3, target.z, 8, 8, "#0206ee").isDangerous(false));
    this.elements.push(new ColoredShape(target.x+77, target.y+10+3, target.z, 8, 8, "#0206ee").isDangerous(false));

    this.elements.push(new ColoredShape(target.x+50, target.y+10+9+3, target.z, 8, 8, "#0206ee").isDangerous(false));

    this.elements.push(new ColoredShape(target.x+50, target.y+10+18+3, target.z, 8, 8, "#0206ee").isDangerous(false));
    this.elements.push(new ColoredShape(target.x+59, target.y+10+18+3, target.z, 8, 8, "#0206ee").isDangerous(false));
    this.elements.push(new ColoredShape(target.x+68, target.y+10+18+3, target.z, 8, 8, "#0206ee").isDangerous(false));
    this.elements.push(new ColoredShape(target.x+77, target.y+10+18+3, target.z, 8, 8, "#0206ee").isDangerous(false));
    this.bulletHole = new Position(target.x+80+2, target.y+28-6-8);
    this.bulletHole2 = new Position(target.x+80+2, target.y+28-6+10);
  }

  update(game: Game) {
    super.update(game);
    if(this.isAttached() && game.gameTime % 20 == 0 && game.controls.shoot) {
      game.gameArea.addElement(new Bullet(this, this.bulletHole2));
    }
  }

  move(x: number, y: number) {
    super.move(x, y);
    if(this.isAttached()) {
      this.bulletHole2.move(x, y);
    }
  }

  type: string = "Weapon";
}
