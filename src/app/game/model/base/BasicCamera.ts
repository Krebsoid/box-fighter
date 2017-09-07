import {Element} from "./Element";
import {GameArea} from "../../service/GameArea";
import {Camera} from "./Camera";

export class BasicCamera extends Camera {
  element: Element;
  gameArea: GameArea;

  xOffset: number = 300;
  yOffset: number = 0;

  constructor(element: Element, gameArea: GameArea) {
    super(gameArea);
    this.element = element;
  }

  update() {
    this.setPosition(this.element.position.x, 0);
  }
}
