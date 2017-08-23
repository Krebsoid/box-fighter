import {Scene} from "../base/Scene";
import {Game} from "../../service/Game";
import {Engine} from "../parts/Engine";
import {Weapon} from "../parts/Weapon";
import {Player} from "../base/Player";
import {ColoredShape} from "../base/ColoredShape";
import {CurrencyMeter} from "../ui/CurrencyMeter";
import {FuelMeter} from "../ui/FuelMeter";
import {HomingColoredShape} from "../base/HomingColoredShape";
import {PathBehaviour} from "../behaviour/PathBehaviour";
import {Position} from "../base/Position";
import {ExtendedCamera} from "../base/ExtendedCamera";
import {Shape} from "../base/Shape";

export class Maze extends Scene {
  name: string = "Maze";
  gameState: string = 'MAZE';
  levelBorders: Shape = new Shape(0, 0, 0, 3000, 3000);

  init(game: Game) {
    let player = new Player();
    player.currency = 0;
    player.setWeapon(new Weapon(0,0,0));
    player.setEngine(new Engine(0,0,0));
    game.gameArea.addElement(player);

    let camera = new ExtendedCamera(player, game.gameArea);
    game.gameArea.setCamera(camera);

    this.createEnvironment(game, 500, 0);
    this.createEnvironment(game, 500, 50);
    this.createEnvironment(game, 500, 100);
    this.createEnvironment(game, 500, 150);
    this.createEnvironment(game, 500, 200);
    this.createEnvironment(game, 500, 350);
    this.createEnvironment(game, 500, 400);
    this.createEnvironment(game, 500, 450);

    this.createEnvironment(game, 700, 100);
    this.createEnvironment(game, 700, 150);
    this.createEnvironment(game, 700, 200);
    this.createEnvironment(game, 700, 250);
    this.createEnvironment(game, 700, 300);
    this.createEnvironment(game, 700, 350);

    this.createEnvironment(game, 1200, 100);
    this.createEnvironment(game, 1200, 150);
    this.createEnvironment(game, 1200, 200);
    this.createEnvironment(game, 1200, 250);
    this.createEnvironment(game, 1200, 300);
    this.createEnvironment(game, 1200, 350);

    this.createEnvironment(game, 750, 350);
    this.createEnvironment(game, 800, 350);
    this.createEnvironment(game, 850, 350);
    this.createEnvironment(game, 900, 350);
    this.createEnvironment(game, 950, 350);
    this.createEnvironment(game, 1000, 350);
    this.createEnvironment(game, 1050, 350);
    this.createEnvironment(game, 1100, 350);
    this.createEnvironment(game, 1150, 350);

    this.createEnvironment(game, 750, 100);
    this.createEnvironment(game, 800, 100);
    this.createEnvironment(game, 850, 100);
    this.createEnvironment(game, 900, 100);
    this.createEnvironment(game, 950, 100);
    this.createEnvironment(game, 1000, 100);
    this.createEnvironment(game, 1050, 100);
    this.createEnvironment(game, 1100, 100);
    this.createEnvironment(game, 1150, 100);

    let dangerousShape1 = new HomingColoredShape(1250, 350, 5, 100, 100, "red");
    let dangerousShape2 = new HomingColoredShape(600, 0, 5, 100, 100, "red");
    let pathBehaviour = new PathBehaviour(5, [
      (game: Game) => new Position(1250, 0),
      (game: Game) => new Position(600, 0),
      (game: Game) => new Position(600, 400),
      (game: Game) => new Position(1250, 400)
    ]);
    let pathBehaviour2 = new PathBehaviour(5, [
      (game: Game) => new Position(600, 400),
      (game: Game) => new Position(1250, 400),
      (game: Game) => new Position(1250, 0),
      (game: Game) => new Position(600, 0)
    ]);
    dangerousShape1.addGenericBehaviour<HomingColoredShape>("path", pathBehaviour);
    dangerousShape2.addGenericBehaviour<HomingColoredShape>("path", pathBehaviour2);

    game.gameArea.addElement(dangerousShape1);
    game.gameArea.addElement(dangerousShape2);

    game.gameArea.addElement(new FuelMeter(player));
    game.gameArea.addElement(new CurrencyMeter(player));
  }

  private createEnvironment(game: Game, x: number, y: number) {
    game.gameArea.addElement(new ColoredShape(x, y, 1, 50, 50, "black"));
  }

}
