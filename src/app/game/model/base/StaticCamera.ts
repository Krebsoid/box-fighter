import {GameArea} from "../../service/GameArea";
import {Camera} from "./Camera";

export class StaticCamera extends Camera {

  gameArea: GameArea;

  constructor(gameArea: GameArea) {
    super(gameArea);
    this.gameArea = gameArea;
  }

  update() {
    this.setPosition(0, 0);
  }
}
