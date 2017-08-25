import {Element} from "./base/Element";
import {Shape} from "./base/Shape";
import {ColoredShape} from "./base/ColoredShape";
import {Camera} from "./base/Camera";
import {Game} from "../service/Game";
import {Player} from "./base/Player";
import {ElementType} from "./base/ElementType";

export class Fuel extends Element {

  elements: Element[] = [];
  hitboxes: Shape[] = [];
  fuel: number = 50;

  constructor(x: number, y: number, z: number) {
    super(x, y, z);
    this.elements.push(new ColoredShape(this.x-10, this.y-5, this.z, 5, 40, "#000000").isDangerous(false));
    this.elements.push(new ColoredShape(this.x, this.y, this.z, 20, 10, "#010bff").isDangerous(false));
    this.elements.push(new ColoredShape(this.x+10, this.y, this.z, 20, 10, "#ee0011").isDangerous(false));
    this.elements.push(new ColoredShape(this.x+10, this.y+20, this.z, 20, 10, "#010bff").isDangerous(false));
    this.elements.push(new ColoredShape(this.x, this.y+20, this.z, 20, 10, "#ee0011").isDangerous(false));
    this.elements.push(new ColoredShape(this.x-10, this.y+40, this.z, 5, 40, "#000000").isDangerous(false));
    let hitbox = new Shape(this.x, this.y, this.z, 20, 40);
    this.hitboxes.push(hitbox);
    let hitbox2 = new Shape(this.x-10, this.y-5, this.z, 5, 40);
    this.hitboxes.push(hitbox2);
    let hitbox3 = new Shape(this.x-10, this.y+40, this.z, 5, 40);
    this.hitboxes.push(hitbox3);
    this.elements.push(hitbox);
    this.elements.push(hitbox2);
    this.elements.push(hitbox3);
  }

  isOnScreen(camera: Camera): boolean {
    return this.hitboxes.some(hitbox => hitbox.isOnScreen(camera));
  }

  render(camera: Camera) {
    this.elements.forEach((value, index, array) => value.render(camera));
  }

  update(game: Game) {
    this.checkForHits(game);
  }

  checkForHits(game: Game) {
    game.gameArea.elementsOnCamera().forEach((value) => {
      if(value instanceof Player) {
        this.hitboxes.forEach((hitbox) => {
          value.hitboxes.forEach(hitboxPlayer => {
            if(hitbox.collision(hitboxPlayer)) {
              value.engine.refuel(this.fuel);
              game.gameArea.removeElement(this);
              this.elements.forEach((colored) => {
                if(colored instanceof ColoredShape) {
                  colored.explode(game);
                }
              });
            }
          });
        })
      }
    });
  }

  type: ElementType = ElementType.FUEL;
}
