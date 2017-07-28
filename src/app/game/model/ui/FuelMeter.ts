import {Element} from "../base/Element";
import {Camera} from "../base/Camera";
import {Game} from "../../service/Game";
import {ColoredShape} from "../base/ColoredShape";
import {Player} from "../base/Player";

export class FuelMeter extends Element {

  elements: Element[] = [];
  player: Player;
  filling: ColoredShape;

  constructor(player: Player) {
    super(300, 450, 10000);
    this.isFixed(true);
    this.player = player;
    this.elements.push(new ColoredShape(this.x, this.y, this.z, 30, player.engine.capacity + 6, "#000"));
    this.elements.push(new ColoredShape(this.x + 3, this.y + 3, this.z + 1, 24, player.engine.capacity, "#FFF"));
    this.filling = new ColoredShape(this.x + 3, this.y + 3, this.x + 2, 24, player.engine.level, "#FF0000");
    this.elements.push(this.filling);
  }

  render(camera: Camera) {
    if(this.player.engine) {
      let gradient = camera.gameArea.getContext().createLinearGradient(this.x + 50, this.y, this.x + this.player.engine.capacity + 50, this.y);
      gradient.addColorStop(0,"#FF0000");
      gradient.addColorStop(0.5,"#fffc00");
      gradient.addColorStop(1,"#00ff24");
      this.filling.gradient = gradient;
      this.elements.forEach(element => element.render(camera.staticCamera));
    }
  }

  update(game: Game) {
    if(this.player.engine) {
      if(this.player.engine.level > this.filling.w) {
        this.filling.w += 2;
      }
      if(this.player.engine.level < this.filling.w) {
        this.filling.w -= 2;
      }
    }
  }
}
