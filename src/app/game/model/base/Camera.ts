import { Element } from "./Element";
import {GameArea} from "../../service/GameArea";
import {Shape} from "./Shape";

export class Camera extends Element {

  element: Element;
  gameArea: GameArea;

  staticCamera: Camera;

  constructor(element: Element, gameArea: GameArea) {
    super(0,0,0);
    this.element = element;
    this.gameArea = gameArea;
  }

  initializeStaticCamera() {
    this.staticCamera = new Camera(new Shape(0, 0, 0, 500, 1024), this.gameArea);
  }

  update() {
    this.setPosition(this.element.x, 0);
  }
}
