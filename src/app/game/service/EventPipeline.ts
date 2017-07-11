import {Injectable} from "@angular/core";
import { GameArea } from "./GameArea";
import {Game} from "./Game";

@Injectable()
export class EventPipeline {

  listener : Map<Event, (game: Game) => void> = new Map<Event, (game: Game) => void>();

  constructor(public  gameArea: GameArea) {

  }

}
