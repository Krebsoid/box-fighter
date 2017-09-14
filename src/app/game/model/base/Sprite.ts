import {Camera} from "./Camera";
import {Game} from "../../service/Game";
import {Shape} from "./Shape";
import {ElementType} from "./ElementType";

export class Sprite extends Shape {

  looping: boolean;
  image: HTMLImageElement = new Image();
  activeFrame: number = 1;
  numberOfFrames: number;
  speed: number;

  constructor(x: number, y: number, z: number, h: number, w: number,
              looping: boolean, speed: number, src: string) {
    super(x, y, z, h, w);
    this.looping = looping;
    this.image.src = src;
    this.image.onload = () => this.setNumberOfFrames(this.image.width / this.w);
    this.speed = speed;
  }

  render(camera: Camera, canvas: string = "game") {
    super.render(camera, canvas);
    camera.gameArea.getContext(canvas).drawImage(this.image, this.activeFrame * this.w, 0, this.w, this.h, this.xOffset, this.yOffset, this.w, this.h);
  }

  setNumberOfFrames(numberOfFrames: number) {
      this.numberOfFrames = numberOfFrames;
  }

  update(game: Game) {
    if(game.gameTime % this.speed == 0) {
      if(this.activeFrame < this.numberOfFrames) {
        this.activeFrame += 1;
      } else {
        if(this.looping) {
          this.activeFrame = 1;
        }
      }
    }
    super.update(game);
  }

  type: ElementType = ElementType.SPRITE;
}
