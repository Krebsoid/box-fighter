import {Element} from "./Element";
import {Game} from "../../service/Game";
import {ElementType} from "./ElementType";

export class Position extends Element {

  constructor(public x: number, public y: number) {
    super(x, y, 0);
  }

  update(game: Game) {

  }

  type: ElementType = ElementType.POSITION;
}
