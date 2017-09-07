import {Element} from "./Element";
import {GameArea} from "../../service/GameArea";
import {Camera} from "./Camera";

export class ExtendedCamera extends Camera {
  element: Element;
  gameArea: GameArea;

  xOffset: number = 370;
  yOffset: number = 210;

  constructor(element: Element, gameArea: GameArea) {
    super(gameArea);
    this.element = element;
  }

  update() {
    this.setPosition(this.element.position.x, this.element.position.y);
  }
}
