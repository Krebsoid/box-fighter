import {GameArea} from "../../../service/GameArea";
import {Camera} from "./Camera";

export class StaticCamera extends Camera {

  gameArea: GameArea;

  xOffset: number = 0;
  yOffset: number = 0;

  constructor(gameArea: GameArea) {
    super(gameArea);
    this.gameArea = gameArea;
  }

  update() {
    this.setPosition(0, 0);
  }
}
