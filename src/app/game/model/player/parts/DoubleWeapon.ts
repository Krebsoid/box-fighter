import {Game} from "../../../service/Game";
import {Bullet} from "./Bullet";
import {ColoredShape} from "../../base/shapes/ColoredShape";
import {StrokedText} from "../../base/text/StrokedText";
import {Weapon} from "./Weapon";
import {Vector} from "../../base/Vector";
import {Element} from '../../base/Element';

export class DoubleWeapon extends Weapon {
  value: number = 1500;
  reloadSpeed: number = 20;

  bulletHole2: Vector;

  constructor(x: number, y: number, z: number) {
    super(x, y, z);

  }

  putOnPlayground() {
    this.elements.push(new ColoredShape(this.position.x, this.position.y, this.z, 8, 8, "#0206ee").isDangerous(false));
    this.elements.push(new ColoredShape(this.position.x + 9, this.position.y, this.z, 8, 8, "#0206ee").isDangerous(false));
    this.elements.push(new ColoredShape(this.position.x + 18, this.position.y, this.z, 8, 8, "#0206ee").isDangerous(false));
    this.elements.push(new ColoredShape(this.position.x + 27, this.position.y, this.z, 8, 8, "#0206ee").isDangerous(false));

    this.elements.push(new ColoredShape(this.position.x, this.position.y + 9, this.z, 8, 8, "#0206ee").isDangerous(false));

    this.elements.push(new ColoredShape(this.position.x, this.position.y + 18, this.z, 8, 8, "#0206ee").isDangerous(false));
    this.elements.push(new ColoredShape(this.position.x + 9, this.position.y + 18, this.z, 8, 8, "#0206ee").isDangerous(false));
    this.elements.push(new ColoredShape(this.position.x + 18, this.position.y + 18, this.z, 8, 8, "#0206ee").isDangerous(false));
    this.elements.push(new ColoredShape(this.position.x + 27, this.position.y + 18, this.z, 8, 8, "#0206ee").isDangerous(false));
    if(!this.isAttached()) {
      this.label = new StrokedText(this.position.x + 40, this.position.y + 18, this.z, "green", "14pt Calibri", 1, "black");
      this.label.text = "Doppel-Wumme " + this.value + " §";
    }
    return this;
  }

  attach(target: Element, slot: Vector) {
    this.elements = [];
    this.label = undefined;
    this.target = target;
    this.elements.push(new ColoredShape(target.position.x + slot.x, target.position.y + slot.y + 6, target.z, 8, 8, "#0206ee").isDangerous(false));
    this.elements.push(new ColoredShape(target.position.x + slot.x + 9, target.position.y + slot.y + 6, target.z, 8, 8, "#0206ee").isDangerous(false));
    this.elements.push(new ColoredShape(target.position.x + slot.x + 18, target.position.y + slot.y + 6, target.z, 8, 8, "#0206ee").isDangerous(false));
    this.elements.push(new ColoredShape(target.position.x + slot.x + 27, target.position.y + slot.y + 6, target.z, 8, 8, "#0206ee").isDangerous(false));

    this.elements.push(new ColoredShape(target.position.x + slot.x, target.position.y + slot.y - 3, target.z, 8, 8, "#0206ee").isDangerous(false));

    this.elements.push(new ColoredShape(target.position.x + slot.x, target.position.y + slot.y - 12, target.z, 8, 8, "#0206ee").isDangerous(false));
    this.elements.push(new ColoredShape(target.position.x + slot.x + 9, target.position.y + slot.y - 12, target.z, 8, 8, "#0206ee").isDangerous(false));
    this.elements.push(new ColoredShape(target.position.x + slot.x + 18, target.position.y + slot.y - 12, target.z, 8, 8, "#0206ee").isDangerous(false));
    this.elements.push(new ColoredShape(target.position.x + slot.x + 27, target.position.y + slot.y - 12, target.z, 8, 8, "#0206ee").isDangerous(false));
    this.bulletHole = new Vector(target.position.x + slot.x + 35, target.position.y + slot.y + 6);
    this.bulletHole2 = new Vector(target.position.x + slot.x + 35, target.position.y + slot.y - 12);
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
