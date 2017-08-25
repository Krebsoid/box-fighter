import {Element} from "./Element";
import {GameArea} from "../../service/GameArea";
import {Shape} from "./Shape";
import {ElementType} from "./ElementType";

export abstract class Camera extends Element {
  gameArea: GameArea;

  constructor(gameArea: GameArea) {
    super(0,0,0);
    this.gameArea = gameArea;
  }

  shape(): Shape {
    return new Shape(this.x, this.y, 0, 500, 1024);
  }

  type: ElementType = ElementType.CAMERA;
}
