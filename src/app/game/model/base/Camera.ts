import {Element} from "./Element";
import {GameArea} from "../../service/GameArea";

export class Camera extends Element {

  element: Element;
  gameArea: GameArea;

  constructor(element: Element, gameArea: GameArea) {
    super(0,0,0);
    this.element = element;
    this.gameArea = gameArea;
  }

  update() {
    this.setPosition(this.element.x, 0);
  }
}
