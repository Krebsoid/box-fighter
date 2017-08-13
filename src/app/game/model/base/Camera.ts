import {Element} from "./Element";
import {GameArea} from "../../service/GameArea";
import {Shape} from "./Shape";

export class Camera extends Element {

  element: Element;
  gameArea: GameArea;

  constructor(element: Element, gameArea: GameArea) {
    super(0,0,0);
    this.element = element;
    this.gameArea = gameArea;
  }

  shape(): Shape {
    return new Shape(this.x, this.y, 0, 500, 1024);
  }

  update() {
    this.setPosition(this.element.x, 0);
  }
}
