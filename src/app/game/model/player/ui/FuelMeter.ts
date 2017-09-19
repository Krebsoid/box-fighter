import {Element} from "../../base/Element";
import {Camera} from "../../base/camera/Camera";
import {Game} from "../../../service/Game";
import {ColoredShape} from "../../base/shapes/ColoredShape";
import {Player} from "../Player";

export class FuelMeter extends Element {

  elements: Element[] = [];
  player: Player;
  filling: ColoredShape;
  outerBorder: ColoredShape;
  innerBorder: ColoredShape;
  fixed: boolean = true;

  constructor(player: Player) {
    super(300, 450, 10000);
    this.player = player;
    this.outerBorder = new ColoredShape(this.position.x, this.position.y, this.z, 30, player.engine.capacity + 6, "#000").isFixed(true);
    this.innerBorder = new ColoredShape(this.position.x + 3, this.position.y + 3, this.z + 1, 24, player.engine.capacity, "#FFF").isFixed(true);
    this.elements.push(this.outerBorder);
    this.elements.push(this.innerBorder);
    this.filling = new ColoredShape(this.position.x + 3, this.position.y + 3, this.position.x + 2, 24, player.engine.level, "#FF0000").isFixed(true);
    this.elements.push(this.filling);
  }

  render(camera: Camera, canvas: string = "game") {
    if(this.player.engine) {
      let gradient = camera.gameArea.getContext(canvas).createLinearGradient(this.position.x, this.position.y, this.position.x + this.player.engine.capacity, this.position.y);
      gradient.addColorStop(0,"#FF0000");
      gradient.addColorStop(0.5,"#fffc00");
      gradient.addColorStop(1,"#00ff24");
      this.filling.gradient = gradient;
      this.elements.forEach(element => element.render(camera, canvas));
    }
  }

  update(game: Game) {
    if(this.player.engine) {
      this.innerBorder.w = this.player.engine.capacity;
      this.outerBorder.w = this.player.engine.capacity + 6;
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
