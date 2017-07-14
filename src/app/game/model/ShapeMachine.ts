import {Element} from "./Element";
import {Game} from "../service/Game";
import {ColoredShape} from "./ColoredShape";

export class ShapeMachine extends Element {

  constructor() {
    super(0, 0, 0);
  }

  update(game: Game) {
    if(game.gameTime % 200 == 0) {
      let shape = new ColoredShape(1500, 200, 5, 100, 100, "#31ffb1");
      shape.addBehaviour("left", (game, shape) => {
        shape.move(-7, 0);
        if(shape.x < 0) {
          game.gameArea.removeElement(shape);
        }
      });
      game.gameArea.addElement(shape);
    }
  }
}
