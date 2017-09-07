import {Element} from "../base/Element";
import {Camera} from "../base/Camera";
import {Game} from "../../service/Game";
import {ColoredShape} from "../base/ColoredShape";
import {Player} from "../base/Player";

export class FuelMeter extends Element {

  elements: Element[] = [];
  player: Player;
  filling: ColoredShape;
  fixed: boolean = true;

  constructor(player: Player) {
    super(300, 450, 10000);
    this.player = player;
    this.elements.push(new ColoredShape(this.position.x, this.position.y, this.z, 30, player.engine.capacity + 6, "#000").isFixed(true));
    this.elements.push(new ColoredShape(this.position.x + 3, this.position.y + 3, this.z + 1, 24, player.engine.capacity, "#FFF").isFixed(true));
    this.filling = new ColoredShape(this.position.x + 3, this.position.y + 3, this.position.x + 2, 24, player.engine.level, "#FF0000").isFixed(true);
    this.elements.push(this.filling);
  }

  render(camera: Camera) {
    if(this.player.engine) {
      let gradient = camera.gameArea.getContext().createLinearGradient(this.position.x, this.position.y, this.position.x + this.player.engine.capacity, this.position.y);
      gradient.addColorStop(0,"#FF0000");
      gradient.addColorStop(0.5,"#fffc00");
      gradient.addColorStop(1,"#00ff24");
      this.filling.gradient = gradient;
      this.elements.forEach(element => element.render(camera));
    }
  }

  update(game: Game) {
    if(this.player.engine) {
      if(this.player.engine.level > this.filling.w) {
        this.filling.w += this.updateMapping(Math.abs(this.player.engine.level - this.filling.w));
      }
      if(this.player.engine.level < this.filling.w) {
        this.filling.w -= this.updateMapping(Math.abs(this.player.engine.level - this.filling.w));
      }
    }
  }

  updateMapping(delta: number) : number {
    if(delta >= 50) {
      return 5;
    } else if(delta < 50 && delta >= 20) {
      return 2;
    } else if(delta < 20 && delta >= 5) {
      return 1;
    } else if(delta < 5 && delta >= 0) {
      return .5;
    }
  }
}
