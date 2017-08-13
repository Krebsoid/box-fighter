import {Element} from "../base/Element";
import {Camera} from "../base/Camera";
import {Game} from "../../service/Game";
import {Player} from "../base/Player";
import {StrokedText} from "../base/StrokedText";

export class CurrencyMeter extends Element {

  label: StrokedText;
  player: Player;
  value: number = 0;
  targetValue: number = 0;
  fixed: boolean = true;

  constructor(player: Player) {
    super(50, 400, 10000);
    this.player = player;
    this.label = new StrokedText(50, 480, 500, "green", "40pt Calibri", 4, "black").isFixed(true);
  }

  render(camera: Camera) {
    this.label.render(camera);
  }

  update(game: Game) {
    if(this.player) {
      this.targetValue = this.player.currency;
      let updateMapping = this.updateMapping(Math.abs(this.targetValue - this.value));
      if(this.targetValue > this.value) {
        this.value += updateMapping;
      }
      if(this.targetValue < this.value) {
        this.value -= updateMapping;
      }
      this.label.text = Math.floor(this.value).toString() + " §";
    }
  }

  updateMapping(delta: number) {
    if(delta >= 1000) {
      return 50;
    } else if(delta < 1000 && delta >= 500) {
      return 30;
    } else if(delta < 500 && delta >= 100) {
      return 15;
    } else if(delta < 100 && delta >= 50) {
      return 5;
    } else if(delta < 50 && delta >= 20) {
      return 2;
    } else if(delta < 20 && delta >= 0) {
      return 1;
    }
  }
}
