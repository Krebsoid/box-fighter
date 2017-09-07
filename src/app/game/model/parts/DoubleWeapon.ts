import {Element} from '../base/Element';
import {Game} from "../../service/Game";
import {Bullet} from "./Bullet";
import {Position} from "../base/Position";
import {ColoredShape} from "../base/ColoredShape";
import {StrokedText} from "../base/StrokedText";
import {Weapon} from "./Weapon";
import {Vector} from "../base/Vector";

export class DoubleWeapon extends Weapon {
  value: number = 1500;
  reloadSpeed: number = 20;

  bulletHole: Vector;
  bulletHole2: Vector;

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
    this.elements.push(new ColoredShape(target.position.x+50, target.position.y+10+3, target.z, 8, 8, "#0206ee").isDangerous(false));
    this.elements.push(new ColoredShape(target.position.x+59, target.position.y+10+3, target.z, 8, 8, "#0206ee").isDangerous(false));
    this.elements.push(new ColoredShape(target.position.x+68, target.position.y+10+3, target.z, 8, 8, "#0206ee").isDangerous(false));
    this.elements.push(new ColoredShape(target.position.x+77, target.position.y+10+3, target.z, 8, 8, "#0206ee").isDangerous(false));

    this.elements.push(new ColoredShape(target.position.x+50, target.position.y+10+9+3, target.z, 8, 8, "#0206ee").isDangerous(false));

    this.elements.push(new ColoredShape(target.position.x+50, target.position.y+10+18+3, target.z, 8, 8, "#0206ee").isDangerous(false));
    this.elements.push(new ColoredShape(target.position.x+59, target.position.y+10+18+3, target.z, 8, 8, "#0206ee").isDangerous(false));
    this.elements.push(new ColoredShape(target.position.x+68, target.position.y+10+18+3, target.z, 8, 8, "#0206ee").isDangerous(false));
    this.elements.push(new ColoredShape(target.position.x+77, target.position.y+10+18+3, target.z, 8, 8, "#0206ee").isDangerous(false));
    this.bulletHole = new Vector(target.position.x+80+2, target.position.y+28-6-8);
    this.bulletHole2 = new Vector(target.position.x+80+2, target.position.y+28-6+10);
  }


  shoot(game: Game) {
    super.shoot(game);
    game.gameArea.addElement(new Bullet(this, this.bulletHole2).isDangerous(false));
  }

  move(vector: Vector) {
    super.move(vector);
    if(this.isAttached()) {
      this.bulletHole2.addTo(vector);
    }
  }
}
