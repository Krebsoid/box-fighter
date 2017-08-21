import {Scene} from "../base/Scene";
import {Game} from "../../service/Game";
import {Engine} from "../parts/Engine";
import {Weapon} from "../parts/Weapon";
import {Player} from "../base/Player";
import {Camera} from "../base/Camera";
import {ColoredShape} from "../base/ColoredShape";
import {CurrencyMeter} from "../ui/CurrencyMeter";
import {FuelMeter} from "../ui/FuelMeter";

export class Maze extends Scene {
  name: string = "Maze";
  gameState: string = 'MAZE';

  init(game: Game) {
    let player = new Player();
    player.currency = 0;
    player.setWeapon(new Weapon(0,0,0));
    player.setEngine(new Engine(0,0,0));
    game.gameArea.addElement(player);

    let camera = new Camera(player, game.gameArea);
    game.gameArea.setCamera(camera);

    this.createEnvironment(game, 500, 0);
    this.createEnvironment(game, 500, 50);
    this.createEnvironment(game, 500, 100);
    this.createEnvironment(game, 500, 150);
    this.createEnvironment(game, 500, 200);
    this.createEnvironment(game, 500, 350);
    this.createEnvironment(game, 500, 400);
    this.createEnvironment(game, 500, 450);

    game.gameArea.addElement(new FuelMeter(player));
    game.gameArea.addElement(new CurrencyMeter(player));
  }

  private createEnvironment(game: Game, x: number, y: number) {
    game.gameArea.addElement(new ColoredShape(x, y, 1, 50, 50, "black"));
  }

}
