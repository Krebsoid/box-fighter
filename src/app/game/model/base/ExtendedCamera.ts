import {Element} from "./Element";
import {GameArea} from "../../service/GameArea";
import {Camera} from "./Camera";

export class ExtendedCamera extends Camera {
  element: Element;
  gameArea: GameArea;

  constructor(element: Element, gameArea: GameArea) {
    super(gameArea);
    this.element = element;
  }

  update() {
    this.setPosition(this.element.x - 320, this.element.y - 210);
  }
}
