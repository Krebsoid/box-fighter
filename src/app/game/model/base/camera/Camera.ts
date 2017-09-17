import {Element} from "../Element";
import {GameArea} from "../../../service/GameArea";
import {Shape} from "../shapes/Shape";
import {ElementCatalogue} from "../../catalogues/ElementCatalogue";

export abstract class Camera extends Element {
  gameArea: GameArea;

  constructor(gameArea: GameArea) {
    super(0,0,0);
    this.gameArea = gameArea;
  }

  shape(): Shape {
    return new Shape(this.position.x, this.position.y, 0, 500, 1024);
  }

  type: ElementCatalogue = ElementCatalogue.CAMERA;
}
