import {Element} from './Element';
import {Camera} from "./Camera";
import {Game} from "../../service/Game";
import {Position} from "./Position";
import {Damage} from "./Damage";
import {ElementType} from "./ElementType";

export class Shape extends Element {
  h: number;
  w: number;
  colliding: boolean;

  constructor(x: number, y: number, z: number, h: number, w: number) {
    super(x, y, z);
    this.h = h;
    this.w = w;
  }

  isOnScreen(camera: Camera): boolean {
    let cameraShape: Shape = camera.shape();
    return cameraShape.containsPosition(new Position(this.position.x + camera.xOffset, this.position.y + camera.yOffset)) ||
      cameraShape.containsPosition(new Position(this.position.x + camera.xOffset, this.position.y + camera.yOffset + this.h)) ||
      cameraShape.containsPosition(new Position(this.position.x + camera.xOffset + this.w, this.position.y + camera.yOffset)) ||
      cameraShape.containsPosition(new Position(this.position.x + camera.xOffset + this.w, this.position.y + camera.yOffset + this.h));
  }

  render(camera: Camera, canvas: string = "game") {
    super.render(camera, canvas);
  }

  update(game: Game) {
    this.colliding = false;
    super.update(game);
  }

  containsPosition?(position: Position): boolean {
    return position.x >= this.position.x && position.x <= this.position.x + this.w && position.y >= this.position.y && position.y <= this.position.y + this.h;
  }

  collision?(shape: Shape) : boolean {
    let hitBox = shape.getHitBox();
    return shape != this && shape.collidable && this.position.x < hitBox.position.x + hitBox.w &&
      this.position.x + this.w > hitBox.position.x &&
      this.position.y < hitBox.position.y + hitBox.h &&
      this.h + this.position.y > hitBox.position.y;
  }

  getHitBox(): Shape {
    return this;
  }

  onDamage(damage: Damage) {
    this.life -= damage.damage;
  }

  onHit(game: Game) {
    this.life <= 0 && this.destructible ? this.onKill(game) : undefined;
  }

  onKill(game: Game) {
    game.gameArea.removeElement(this);
  }

  type: ElementType = ElementType.SHAPE;
}
