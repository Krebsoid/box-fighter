import {Element} from "./Element";
import {GameArea} from "../../service/GameArea";
import {Camera} from "./Camera";

export class BasicCamera extends Camera {
  element: Element;
  gameArea: GameArea;

  constructor(element: Element, gameArea: GameArea) {
    super(gameArea);
    this.element = element;
  }

  update() {
    this.setPosition(this.element.x, 0);
  }
}
