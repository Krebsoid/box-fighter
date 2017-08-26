import {Scene} from "../base/Scene";
import {Game} from "../../service/Game";
import {Engine} from "../parts/Engine";
import {Player} from "../base/Player";
import {ColoredShape} from "../base/ColoredShape";
import {CurrencyMeter} from "../ui/CurrencyMeter";
import {FuelMeter} from "../ui/FuelMeter";
import {PathBehaviour} from "../behaviour/PathBehaviour";
import {Position} from "../base/Position";
import {Shape} from "../base/Shape";
import {BasicCamera} from "../base/BasicCamera";
import {EscapeMaze} from "../mission/Mission";
import {SceneType} from "./SceneType";
import {Weapon} from "../parts/Weapon";
import {ShrinkingColoredShape} from "../base/ShrinkingColoredShape";
import {WeaponMeter} from "../ui/WeaponMeter";

export class Maze extends Scene {
  name: string = "Maze";
  type: SceneType = SceneType.MAZE;
  levelBorders: Shape = new Shape(0, 0, 0, 500, 3000);

  init(game: Game) {
    let player = new Player();
    player.currency = 0;
    player.setWeapon(new Weapon(0,0,0));
    player.setEngine(new Engine(0,0,0));
    game.gameArea.addElement(player);

    let camera = new BasicCamera(player, game.gameArea);
    game.gameArea.setCamera(camera);

    game.gameArea.addElement(new ColoredShape(500, 0, 1, 200, 50, "black"));
    game.gameArea.addElement(new ColoredShape(500, 300, 1, 250, 50, "black"));

    game.gameArea.addElement(new ColoredShape(700, 100, 1, 300, 550, "black"));
    game.gameArea.addElement(new ColoredShape(750, 150, 2, 200, 450, "cyan"));

    game.gameArea.addElement(new ColoredShape(1400, 0, 1, 200, 50, "black"));
    game.gameArea.addElement(new ColoredShape(1400, 300, 1, 250, 50, "black"));
    let target = new ColoredShape(1485, 200, 1, 100, 5, "white").isDangerous(false);
    game.gameArea.addElement(target);
    game.gameArea.addElement(new EscapeMaze(target));

    let dangerousShape1 = new ShrinkingColoredShape(1250, 350, 5, 100, 100, "red").isDestructible(true).setLife(30);
    let dangerousShape2 = new ShrinkingColoredShape(600, 0, 5, 100, 100, "red").isDestructible(true).setLife(30);
    let pathBehaviour = new PathBehaviour(2, [
      (game: Game) => new Position(1250, 0),
      (game: Game) => new Position(600, 0),
      (game: Game) => new Position(600, 400),
      (game: Game) => new Position(1250, 400)
    ]);
    let pathBehaviour2 = new PathBehaviour(2, [
      (game: Game) => new Position(600, 400),
      (game: Game) => new Position(1250, 400),
      (game: Game) => new Position(1250, 0),
      (game: Game) => new Position(600, 0)
    ]);
    dangerousShape1.addGenericBehaviour<ColoredShape>("path", pathBehaviour);
    dangerousShape2.addGenericBehaviour<ColoredShape>("path", pathBehaviour2);

    game.gameArea.addElement(dangerousShape1);
    game.gameArea.addElement(dangerousShape2);

    game.gameArea.addElement(new WeaponMeter(player));
    game.gameArea.addElement(new FuelMeter(player));
    game.gameArea.addElement(new CurrencyMeter(player));
  }
}
