import {Game} from "../service/Game";
import {Text} from "./base/text/Text";
import {Camera} from "./base/camera/Camera";
import {ColoredShape} from "./base/shapes/ColoredShape";
import {ElementCatalogue} from "./catalogues/ElementCatalogue";

export class HitBox extends ColoredShape {

  hits: number = 0;

  label: Text;

  constructor(x: number, y: number, z: number, h: number, w: number, color: string) {
    super(x, y, z, h, w, color);
    this.label = new Text(x + w/2 - 28, y + h/2 + 17, z + 1, "#000", "40pt Calibri");
    this.label.text = "0";
  }

  render(camera: Camera, canvas: string = "game") {
    super.render(camera, canvas);
    this.label.render(camera, canvas);
  }

  update(game: Game) {
    super.update(game);
  }

  onHit(game: Game) {
    this.hits += 1;
    this.label.text = this.hits.toString();
  }

  type: ElementCatalogue = ElementCatalogue.HITBOX;
}
