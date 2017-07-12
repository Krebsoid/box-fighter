import {Camera} from "./Camera";
import {Game} from "../service/Game";
import {Shape} from "./Shape";

export class ColoredShape extends Shape {

  color: string;

  constructor(x: number, y: number, z: number, h: number, w: number, color: string) {
    super(x, y, z, h, w);
    this.color = color;
  }

  render(camera: Camera) {
    super.render(camera);
    if(this.colliding) {
      camera.gameArea.getContext().fillStyle = "#ff0000";
    } else {
      camera.gameArea.getContext().fillStyle = this.color;
    }

    camera.gameArea.getContext().fillRect(this.xOffset, this.yOffset, this.h, this.w);
  }

  update(game: Game) {
    super.update(game);
  }

}
