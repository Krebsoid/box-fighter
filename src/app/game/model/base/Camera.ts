import { Element } from "./Element";
import { Player } from "./Player";
import {GameArea} from "../../service/GameArea";

export class Camera extends Element {

  player: Player;
  gameArea: GameArea;

  constructor(player: Player, gameArea: GameArea) {
    super(0,0,0);
    this.player = player;
    this.gameArea = gameArea;
  }

  update() {
    this.setPosition(this.player.x, 0);
  }

}
