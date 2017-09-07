import {Element} from '../base/Element';
import {Game} from "../../service/Game";
import {Bullet} from "./Bullet";
import {Position} from "../base/Position";
import {Equipment} from "./Equipment";
import {ColoredShape} from "../base/ColoredShape";
import {Buyable} from "../base/Buyable";
import {Camera} from "../base/Camera";
import {Player} from "../base/Player";
import {StrokedText} from "../base/StrokedText";
import {ElementType} from "../base/ElementType";
import {Vector} from "../base/Vector";

export class Weapon extends Equipment implements Buyable {
  value: number = 600;
  reloadSpeed: number = 40;
  label: StrokedText;

  bulletHole: Vector;

  constructor(x: number, y: number, z: number) {
    super(x, y, z);
    this.elements.push(new ColoredShape(x, y, z, 8, 8, "#0206ee").isDangerous(false));
    this.elements.push(new ColoredShape(x + 9, y, z, 8, 8, "#0206ee").isDangerous(false));
    this.elements.push(new ColoredShape(x + 18, y, z, 8, 8, "#0206ee").isDangerous(false));
    this.elements.push(new ColoredShape(x + 27, y, z, 8, 8, "#0206ee").isDangerous(false));
    if(!this.isAttached()) {
      this.label = new StrokedText(x + 40, y + 8, z, "green", "14pt Calibri", 1, "black");
      this.label.text = "Mini-Wumme " + this.value + " §";
    }
  }

  attach(target: Element) {
    this.elements = [];
    this.label = undefined;
    this.target = target;
    this.elements.push(new ColoredShape(target.position.x+50, target.position.y+20+1, target.z, 8, 8, "#0206ee").isDangerous(false));
    this.elements.push(new ColoredShape(target.position.x+59, target.position.y+20+1, target.z, 8, 8, "#0206ee").isDangerous(false));
    this.elements.push(new ColoredShape(target.position.x+68, target.position.y+20+1, target.z, 8, 8, "#0206ee").isDangerous(false));
    this.elements.push(new ColoredShape(target.position.x+77, target.position.y+20+1, target.z, 8, 8, "#0206ee").isDangerous(false));
    this.bulletHole = new Vector(target.position.x+80+2, target.position.y+28-6);
  }

  detach() {
    this.target = undefined;
  }

  isOnScreen(camera: Camera): boolean {
    return super.isOnScreen(camera) || this.label.isOnScreen(camera);
  }

  private reloading: boolean = false;
  private lastShoot: number;
  timeTillReloaded: number;
  update(game: Game) {
    super.update(game);
    if(this.isAttached() && !this.reloading && game.controls.shoot) {
      this.reloading = true;
      this.lastShoot = game.gameTime;
      this.shoot(game);
    }
    if(!this.isAttached()) {
      this.checkForHit(game);
    }
    let timeSinceLastShot = game.gameTime - this.lastShoot;
    let reloaded = timeSinceLastShot > this.reloadSpeed;
    if(reloaded) {
      this.reloading = false;
      this.timeTillReloaded = 0;
    } else {
      this.timeTillReloaded = this.reloadSpeed - timeSinceLastShot;
    }
  }

  shoot(game: Game) {
    game.gameArea.addElement(new Bullet(this, this.bulletHole).isDangerous(false));
  }

  move(vector: Vector) {
    super.move(vector);
    if(!this.isAttached()) {
      this.label.move(vector);
    }
    if(this.isAttached()) {
      this.bulletHole.addTo(vector);
    }
  }


  render(camera: Camera): any {
    super.render(camera);
    if(!this.isAttached()) {
      this.label.render(camera);
    }
  }

  checkForHit(game: Game) {
    let colliding = false;
    game.gameArea.elementsOnCamera().forEach((value) => {
      if(value instanceof Player) {
        this.elements.forEach(element => {
          value.hitboxes.forEach(hitboxPlayer => {
            if(!colliding && element.collision(hitboxPlayer)) {
              if(value.currency >= this.value) {
                colliding = true;
                game.gameArea.removeElement(this);
                value.buy(this);
                this.elements.forEach((colored) => {
                  if(colored instanceof ColoredShape) {
                    colored.explode(game);
                  }
                });
                value.setWeapon(this);
              }
            }
          });
        })
      }
    });
  }

  type: ElementType = ElementType.WEAPON;
}
