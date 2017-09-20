import {Game} from "../../../service/Game";
import {Bullet} from "./Bullet";
import {Equipment} from "./Equipment";
import {ColoredShape} from "../../base/shapes/ColoredShape";
import {Buyable} from "../currency/Buyable";
import {Camera} from "../../base/camera/Camera";
import {Player} from "../Player";
import {StrokedText} from "../../base/text/StrokedText";
import {Vector} from "../../base/Vector";
import {ElementCatalogue} from "../../catalogues/ElementCatalogue";

export class Weapon extends Equipment implements Buyable {
  value: number = 600;
  reloadSpeed: number = 40;
  label: StrokedText;

  bulletHole: Vector;

  constructor(x: number, y: number, z: number) {
    super(x, y, z);
  }

  putOnPlayground() {
    this.elements.push(new ColoredShape(this.position.x, this.position.y, this.z, 8, 8, "#0206ee").setKey("player-weapon").isDangerous(false));
    this.elements.push(new ColoredShape(this.position.x + 9, this.position.y, this.z, 8, 8, "#0206ee").setKey("player-weapon").isDangerous(false));
    this.elements.push(new ColoredShape(this.position.x + 18, this.position.y, this.z, 8, 8, "#0206ee").setKey("player-weapon").isDangerous(false));
    this.elements.push(new ColoredShape(this.position.x + 27, this.position.y, this.z, 8, 8, "#0206ee").setKey("player-weapon").isDangerous(false));
    if(!this.isAttached()) {
      this.label = new StrokedText(this.position.x + 40, this.position.y + 8, this.z, "green", "14pt Calibri", 1, "black");
      this.label.text = "Mini-Wumme " + this.value + " §";
    }
    return this;
  }

  attach(target: Player, slot: Vector) {
    this.elements = [];
    this.label = undefined;
    this.target = target;
    this.elements.push(new ColoredShape(target.position.x + slot.x, target.position.y + slot.y - 4, target.z, 8, 8, "#0206ee").setKey("player-weapon").isDangerous(false));
    this.elements.push(new ColoredShape(target.position.x + slot.x + 9, target.position.y + slot.y - 4, target.z, 8, 8, "#0206ee").setKey("player-weapon").isDangerous(false));
    this.elements.push(new ColoredShape(target.position.x + slot.x + 18, target.position.y + slot.y - 4, target.z, 8, 8, "#0206ee").setKey("player-weapon").isDangerous(false));
    this.elements.push(new ColoredShape(target.position.x + slot.x + 27, target.position.y + slot.y - 4, target.z, 8, 8, "#0206ee").setKey("player-weapon").isDangerous(false));
    this.bulletHole = new Vector(target.position.x + slot.x + 32, target.position.y + slot.y - 2);
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

  reset() {
    this.reloading = false;
    this.lastShoot = 0;
    this.timeTillReloaded = 0;
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


  render(camera: Camera, canvas: string = "game"): any {
    super.render(camera, canvas);
    if(!this.isAttached()) {
      this.label.render(camera, canvas);
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

  type: ElementCatalogue = ElementCatalogue.WEAPON;
}
