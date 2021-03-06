import {Camera} from "../camera/Camera";
import {Game} from "../../../service/Game";
import {Shape} from "./Shape";
import {Valuable} from "../../player/currency/Valuable";
import {KillEvent} from "../event/Event";
import {Vector} from "../Vector";
import {ElementCatalogue} from "../../catalogues/ElementCatalogue";

export class ColoredShape extends Shape implements Valuable {

  color: string;
  gradient: any;

  constructor(x: number, y: number, z: number, h: number, w: number, color: string) {
    super(x, y, z, h, w);
    this.color = color;
  }

  render(camera: Camera, canvas: string = "game") {
    super.render(camera, canvas);
    camera.gameArea.getContext(canvas).fillStyle = this.color;
    if(this.gradient) {
      camera.gameArea.getContext(canvas).fillStyle = this.gradient;
    }
    camera.gameArea.getContext(canvas).fillRect(this.xOffset, this.yOffset, this.w, this.h);
  }

  update(game: Game) {
    super.update(game);
  }

  onKill(game: Game): any {
    this.explode(game);
    game.addEvent(new KillEvent(this));
    super.onKill(game);
  }

  explode(game: Game) {
    game.gameArea.addElement(this.generateFragment(-1, -1));
    game.gameArea.addElement(this.generateFragment(1, -1));
    game.gameArea.addElement(this.generateFragment(1, 1));
    game.gameArea.addElement(this.generateFragment(-1, 1));
  }

  private generateFragment(directionX: number, directionY: number) : ColoredShape {
    let fragment = new ColoredShape(this.position.x + this.h / 4, this.position.y + this.w / 4, this.z, this.h / 2, this.w / 2, this.color);
    fragment.isDestructible(false);
    fragment.isDangerous(false);
    fragment.isCollidable(false);
    fragment.addBehaviour<Shape>("drift-off", (game, shape) => {
      shape.move(new Vector(directionX, directionY));
      if((game.gameTime - shape.birth) > 35) {
        game.gameArea.removeElement(shape);
      }
    });
    return fragment;
  }

  value: number;

  setValue(value: number) : ColoredShape {
    this.value = value;
    return this;
  }

  type: ElementCatalogue = ElementCatalogue.COLORED_SHAPE;
}
