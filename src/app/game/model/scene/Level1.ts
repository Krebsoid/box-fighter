import {Scene} from "../base/Scene";
import {Game} from "../../service/Game";
import {Engine} from "../parts/Engine";
import {Weapon} from "../parts/Weapon";
import {Player} from "../base/Player";
import {Camera} from "../base/Camera";
import {ColoredShape} from "../base/ColoredShape";
import {GenericShape} from "../base/GenericShape";
import {Triangle} from "../shapes/Triangle";
import {CurrencyMeter} from "../ui/CurrencyMeter";
import {FuelMeter} from "../ui/FuelMeter";
import {HitBoxes} from "../mission/Mission";
import {Fuel} from "../Fuel";

export class Level1 extends Scene {
  name: string = "Level1";
  gameState: string = 'LEVEL1';

  init(game: Game) {
    let player = new Player();
    player.currency = 0;
    player.setWeapon(new Weapon(0,0,0));
    player.setEngine(new Engine(0,0,0));
    game.gameArea.addElement(player);

    game.gameArea.addElement(new HitBoxes());

    let camera = new Camera(player, game.gameArea);
    game.gameArea.setCamera(camera);

    game.gameArea.addElement(new ColoredShape(300, 100, 1, 50, 50, "#ff000f").setKey("target").isDestructible(true));
    game.gameArea.addElement(new ColoredShape(500, 400, 1, 50, 50, "#ff000f").setKey("target").isDestructible(true));
    game.gameArea.addElement(new ColoredShape(700, 200, 1, 50, 50, "#ff000f").setKey("target").isDestructible(true));
    game.gameArea.addElement(new ColoredShape(500, 300, 1, 50, 50, "#ff000f").setKey("target").isDestructible(true));
    game.gameArea.addElement(new ColoredShape(100, 100, 1, 50, 50, "#ff000f").setKey("target").isDestructible(true));
    game.gameArea.addElement(new ColoredShape(300, 200, 1, 50, 50, "#ff000f").setKey("target").isDestructible(true));
    game.gameArea.addElement(new ColoredShape(700, 300, 1, 50, 50, "#ff000f").setKey("target").isDestructible(true));

    let noTarget = new ColoredShape(350, 100, 1, 50, 50, "green").setKey("no-target").isDestructible(true);
    noTarget.setValue(0);
    game.gameArea.addElement(noTarget);

    game.gameArea.addElement(new Fuel(300, 300, 300));
    game.gameArea.addElement(new Fuel(1000, 300, 300));

    game.gameArea.addElement(new GenericShape(600, 320, 10, "green", new Triangle()));

    game.gameArea.addElement(new FuelMeter(player));
    game.gameArea.addElement(new CurrencyMeter(player));
  }

}
