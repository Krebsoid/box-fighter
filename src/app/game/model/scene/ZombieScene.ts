import {Scene} from "../base/Scene";
import {Game} from "../../service/Game";
import {Shape} from "../base/Shape";
import {ColoredShape} from "../base/ColoredShape";
import {BasicCamera} from "../base/BasicCamera";
import {Engine} from "../parts/Engine";
import {Weapon} from "../parts/Weapon";
import {Player} from "../base/Player";
import {SceneType} from "./SceneType";

export class ZombieScene extends Scene {
  name: string = "Level 3";
  type: SceneType = SceneType.ZOMBIE;
  levelBorders: Shape = new Shape(0, 0, 0, 500, 1024);

  init(game: Game) {
    let player = new Player();
    player.setWeapon(new Weapon(0,0,0));
    player.setEngine(new Engine(0,0,0));
    game.gameArea.addElement(player);

    game.gameArea.setCamera(new BasicCamera(player, game.gameArea));
    game.gameArea.addElement(new ColoredShape(500, 250, 1, 200, 200, "black").isDestructible(true));
    game.gameArea.addElement(new ColoredShape(600, 300, 1, 20, 20, "white").isDestructible(true));
    game.gameArea.addElement(new ColoredShape(550, 300, 1, 20, 20, "white").isDestructible(true));
    game.gameArea.addElement(new ColoredShape(520, 400, 1, 20, 100, "white").isDestructible(true));
  }
}
