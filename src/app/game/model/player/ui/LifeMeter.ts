import {Element} from "../../base/Element";
import {Camera} from "../../base/camera/Camera";
import {Game} from "../../../service/Game";
import {Player} from "../Player";
import {GenericShape} from "../../base/shapes/GenericShape";
import {SmallHeart} from "../../shapes/SmallHeart";

export class LifeMeter extends Element {
  player: Player;
  elements: Element[] = [];
  fixed: boolean = true;

  constructor(player: Player) {
    super(300, 430, 10000);
    this.player = player;
    this.addHearts(this.player.lifes);
  }

  render(camera: Camera, canvas: string = "game") {
    this.elements.forEach(value => value.render(camera, canvas));
  }

  update(game: Game) {
    if(this.player) {
      if(this.player.lifes > this.elements.length) {
        this.addHearts(this.player.lifes - this.elements.length);
      }
      if(this.player.lifes < this.elements.length) {
        this.removeHearts(this.elements.length - this.player.lifes);
      }
    }
  }

  private addHearts(amount: number) {
    times(amount) (i => this.elements.push(
      new GenericShape(this.position.x + (i + this.elements.length * 50), this.position.y, this.z, "red", new SmallHeart()).isFixed(true))
    );
  }

  private removeHearts(amount: number) {
    times(amount) (i => this.elements.pop());
  }
}

export const times = n => f => {
  let iter = i => {
    if (i === n) return;
    f (i);
    iter (i + 1)
  };
  return iter (0)
};
