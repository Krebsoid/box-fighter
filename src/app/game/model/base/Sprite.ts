import {Camera} from "./Camera";
import {Game} from "../../service/Game";
import {Shape} from "./Shape";
import {ElementType} from "./ElementType";

export class Sprite extends Shape {

  image: HTMLImageElement = new Image();

  constructor(x: number, y: number, z: number, h: number, w: number, src: string, onLoad: () => void) {
    super(x, y, z, h, w);
    this.image.src = src;
    this.image.onload = onLoad;
  }

  render(camera: Camera, canvas: string = "game") {
    super.render(camera, canvas);
    camera.gameArea.getContext(canvas).drawImage(this.image, 0, 0, this.w, this.h, this.xOffset, this.yOffset, this.w, this.h);
  }

  update(game: Game) {
    super.update(game);
  }

  type: ElementType = ElementType.SPRITE;
}
