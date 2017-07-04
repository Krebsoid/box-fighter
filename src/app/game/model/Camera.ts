import { Element } from "./Element";
import { Player } from "./Player";

export class Camera extends Element {

  player: Player;

  constructor(player: Player) {
    super(0,0,0);
    this.player = player;
  }

  update() {
    this.setPosition(this.player.x, 0);
  }

}
