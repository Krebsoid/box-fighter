import {Camera} from "./Camera";
import {Game} from "../service/Game";
import {Shape} from "./Shape";

export class ColoredShape extends Shape {

  color: string;

  constructor(x: number, y: number, z: number, h: number, w: number, color: string, destructible: boolean = true) {
    super(x, y, z, h, w);
    this.color = color;
    this.destructible = destructible;
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

  onHit(game: Game): any {
    if(this.destructible) {
      let fragment = new ColoredShape(this.x + this.h / 4, this.y + this.w / 4, this.z, this.h / 2, this.w / 2, this.color, false);
      fragment.addBehaviour("drift-off", (game, shape) => {
        shape.move(-1, -1);
        if((game.gameTime - shape.birth) > 35) {
          game.gameArea.removeElement(shape);
        }
      });
      let fragment2 = new ColoredShape(this.x + this.h / 4, this.y + this.w / 4, this.z, this.h / 2, this.w / 2, this.color, false);
      fragment2.addBehaviour("drift-off", (game, shape) => {
        shape.move(1, -1);
        if((game.gameTime - shape.birth) > 35) {
          game.gameArea.removeElement(shape);
        }
      });
      let fragment3 = new ColoredShape(this.x + this.h / 4, this.y + this.w / 4, this.z, this.h / 2, this.w / 2, this.color, false);
      fragment3.addBehaviour("drift-off", (game, shape) => {
        shape.move(1, 1);
        if((game.gameTime - shape.birth) > 35) {
          game.gameArea.removeElement(shape);
        }
      });
      let fragment4 = new ColoredShape(this.x + this.h / 4, this.y + this.w / 4, this.z, this.h / 2, this.w / 2, this.color, false);
      fragment4.addBehaviour("drift-off", (game, shape) => {
        shape.move(-1, 1);
        if((game.gameTime - shape.birth) > 35) {
          game.gameArea.removeElement(shape);
        }
      });
      game.gameArea.addElement(fragment);
      game.gameArea.addElement(fragment2);
      game.gameArea.addElement(fragment3);
      game.gameArea.addElement(fragment4);
      super.onHit(game);
    }
  }
}
