import {Game} from "../../service/Game";
import {Element} from "./Element";
import {ElementCatalogue} from "../catalogues/ElementCatalogue";

export abstract class Task extends Element {
  description: string;
  done: boolean = false;
  fixed: boolean = true;

  constructor() {
    super(0, 0, 0);
  }

  onSuccess: (game: Game) => void;
  onFail: (game: Game) => void;

  type: ElementCatalogue = ElementCatalogue.TASK;
}
