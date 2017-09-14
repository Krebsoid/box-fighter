import {Camera} from "./Camera";
import {Game} from "../../service/Game";
import {Shape} from "./Shape";
import {ElementType} from "./ElementType";
import {Sprite} from "./Sprite";

export class AnimatedSprite extends Sprite {

  looping: boolean;
  activeFrame: number = 1;
  numberOfFrames: number;
  speed: number;

  constructor(x: number, y: number, z: number, h: number, w: number, src: string, speed: number, looping: boolean) {
    super(x, y, z, h, w, src, () => this.setNumberOfFrames(this.image.width / this.w));
    this.looping = looping;
    this.speed = speed;
  }

  render(camera: Camera, canvas: string = "game") {
    this.xOffset = this.fixed ? this.position.x : this.position.x - camera.position.x + camera.xOffset;
    this.yOffset = this.fixed ? this.position.y : this.position.y - camera.position.y + camera.yOffset;
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

  type: ElementType = ElementType.ANIMATED_SPRITE;
}
