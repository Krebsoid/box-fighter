import {Game} from "../../service/Game";

export interface Behaviour<SHAPE> {
  behaviour: (game: Game, shape: SHAPE) => void;
}
