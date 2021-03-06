import {Element} from "./base/Element";
import {Shape} from "./base/shapes/Shape";
import {Camera} from "./base/camera/Camera";
import {Game} from "../service/Game";
import {Player} from "./player/Player";
import {GenericShape} from "./base/shapes/GenericShape";
import {SmallHeart} from "./shapes/SmallHeart";
import {ElementCatalogue} from "./catalogues/ElementCatalogue";

export class Life extends Element {

  elements: Element[] = [];
  hitboxes: Shape[] = [];

  constructor(x: number, y: number, z: number) {
    super(x, y, z);
    this.elements.push(new GenericShape(x, y, z, "red", new SmallHeart()));
    let hitbox = new Shape(x, y-7, z, 20, 24);
    this.hitboxes.push(hitbox);
  }

  isOnScreen(camera: Camera): boolean {
    return this.elements.some(hitbox => hitbox.isOnScreen(camera));
  }

  render(camera: Camera, canvas: string = "game") {
    this.elements.forEach((value, index, array) => value.render(camera, canvas));
  }

  moveTo(speed: number): any {
    super.moveTo(speed);
    this.elements.forEach(value => value.move(this.velocity));
    this.hitboxes.forEach(value => value.move(this.velocity));
  }

  update(game: Game) {
    super.update(game);
    this.checkForHits(game);
  }

  consumed: boolean = false;
  checkForHits(game: Game) {
    game.gameArea.elementsOnCamera().forEach((value) => {
      if(value instanceof Player) {
        this.hitboxes.forEach((hitbox) => {
          value.hitboxes.forEach(hitboxPlayer => {
            if(!this.consumed && hitbox.collision(hitboxPlayer)) {
              value.lifes += 1;
              this.consumed = true;
              game.gameArea.removeElement(this);
            }
          });
        })
      }
    });
  }

  type: ElementCatalogue = ElementCatalogue.LIFE;
}
