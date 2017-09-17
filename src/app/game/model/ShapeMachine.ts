import {Element} from "./base/Element";
import {Game} from "../service/Game";
import {Random} from "../service/util/Random";
import {ColoredShape} from "./base/shapes/ColoredShape";
import {ElementCatalogue} from "./catalogues/ElementCatalogue";

export class ShapeMachine extends Element {

  constructor() {
    super(0, 0, 0);
  }

  update(game: Game) {
    if(game.gameTime % 50 == 0) {
      let size = Random.nextNumber(20, 70);
      let player = game.gameArea.getPlayer();
      if(player) {
        let shape = new ColoredShape(1500, Random.nextNumber(0, 300), Random.nextNumber(1, 1000), size, size, Random.nextColor());
        shape.setDestination(player.position);
        shape.isDestructible(true);
        let speed = Random.nextNumber(1, 7);
        shape.addBehaviour<ColoredShape>("left", (game, shape) => {
          shape.moveTo(speed);
          if(shape.position.x < 0) {
            game.gameArea.removeElement(shape);
          }
        });
        game.gameArea.addElement(shape);
      }
    }
  }

  type: ElementCatalogue = ElementCatalogue.SHAPE_MACHINE;
}
