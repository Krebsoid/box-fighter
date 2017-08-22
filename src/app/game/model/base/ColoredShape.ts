import {Camera} from "./Camera";
import {Game} from "../../service/Game";
import {Shape} from "./Shape";
import {Valuable} from "./Valuable";

export class ColoredShape extends Shape implements Valuable {

  color: string;
  gradient: any;

  constructor(x: number, y: number, z: number, h: number, w: number, color: string) {
    super(x, y, z, h, w);
    this.color = color;
  }

  render(camera: Camera) {
    super.render(camera);
    camera.gameArea.getContext().fillStyle = this.color;
    if(this.gradient) {
      camera.gameArea.getContext().fillStyle = this.gradient;
    }
    camera.gameArea.getContext().fillRect(this.xOffset, this.yOffset, this.w, this.h);
  }

  update(game: Game) {
    super.update(game);
  }

  onKill(game: Game): any {
    this.explode(game);
    super.onKill(game);
  }

  explode(game: Game) {
    game.gameArea.addElement(this.generateFragment(-1, -1));
    game.gameArea.addElement(this.generateFragment(1, -1));
    game.gameArea.addElement(this.generateFragment(1, 1));
    game.gameArea.addElement(this.generateFragment(-1, 1));
  }

  private generateFragment(directionX: number, directionY: number) : ColoredShape {
    let fragment = new ColoredShape(this.x + this.h / 4, this.y + this.w / 4, this.z, this.h / 2, this.w / 2, this.color);
    fragment.isDestructible(false);
    fragment.isDangerous(false);
    fragment.isCollidable(false);
    fragment.addBehaviour<Shape>("drift-off", (game, shape) => {
      shape.move(directionX, directionY);
      if((game.gameTime - shape.birth) > 35) {
        game.gameArea.removeElement(shape);
      }
    });
    return fragment;
  }

  value: number = 20;

  setValue(value: number) {
    this.value = value;
  }

  type: string = "Colored Shape";
}
