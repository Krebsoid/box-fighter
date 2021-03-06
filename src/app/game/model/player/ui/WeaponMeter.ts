import {Element} from "../../base/Element";
import {Camera} from "../../base/camera/Camera";
import {Game} from "../../../service/Game";
import {ColoredShape} from "../../base/shapes/ColoredShape";
import {Player} from "../Player";
import {Shape} from "../../base/shapes/Shape";

export class WeaponMeter extends Element {

  elements: Element[] = [];
  player: Player;
  filling: ColoredShape;
  fixed: boolean = true;

  constructor(player: Player) {
    super(300, 483, 10000);
    this.player = player;
    this.elements.push(new ColoredShape(this.position.x, this.position.y, this.z, 8, (player.weapon.reloadSpeed * 4) + 6, "#000").setKey("frame").isFixed(true));
    this.elements.push(new ColoredShape(this.position.x + 3, this.position.y + 2, this.z + 1, 4, (player.weapon.reloadSpeed * 4), "#FFF").setKey("inner-frame").isFixed(true));
    this.filling = new ColoredShape(this.position.x + 3, this.position.y + 2, this.position.x + 2, 4, (player.weapon.timeTillReloaded * 4), "#FF0000").isFixed(true);
    this.elements.push(this.filling);
  }

  render(camera: Camera, canvas: string = "game") {
    if(this.player.weapon) {
      this.elements.forEach(element => element.render(camera, canvas));
    }
  }

  update(game: Game) {
    if(this.player.weapon) {
      this.filling.w = this.player.weapon.timeTillReloaded * 4;
      this.elements.filter(value => value.key == "frame").forEach(value => (<Shape>value).w = (this.player.weapon.reloadSpeed * 4) + 6);
      this.elements.filter(value => value.key == "inner-frame").forEach(value => (<Shape>value).w = (this.player.weapon.reloadSpeed * 4))
    }
  }
}
