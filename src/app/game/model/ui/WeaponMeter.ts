import {Element} from "../base/Element";
import {Camera} from "../base/Camera";
import {Game} from "../../service/Game";
import {ColoredShape} from "../base/ColoredShape";
import {Player} from "../base/Player";

export class WeaponMeter extends Element {

  elements: Element[] = [];
  player: Player;
  filling: ColoredShape;
  fixed: boolean = true;

  constructor(player: Player) {
    super(300, 483, 10000);
    this.player = player;
    this.elements.push(new ColoredShape(this.x, this.y, this.z, 8, (player.weapon.reloadSpeed * 4) + 6, "#000").isFixed(true));
    this.elements.push(new ColoredShape(this.x + 3, this.y + 2, this.z + 1, 4, (player.weapon.reloadSpeed * 4), "#FFF").isFixed(true));
    this.filling = new ColoredShape(this.x + 3, this.y + 2, this.x + 2, 4, (player.weapon.timeTillReloaded * 4), "#FF0000").isFixed(true);
    this.elements.push(this.filling);
  }

  render(camera: Camera) {
    if(this.player.weapon) {
      this.elements.forEach(element => element.render(camera));
    }
  }

  update(game: Game) {
    if(this.player.weapon) {
      this.filling.w = this.player.weapon.timeTillReloaded * 4;
    }
  }
}
