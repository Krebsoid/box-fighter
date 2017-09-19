import {Scene} from "../base/Scene";
import {Game} from "../../service/Game";
import {Shape} from "../base/shapes/Shape";
import {ColoredShape} from "../base/shapes/ColoredShape";
import {BasicCamera} from "../base/camera/BasicCamera";
import {CurrencyMeter} from "../player/ui/CurrencyMeter";
import {FuelMeter} from "../player/ui/FuelMeter";
import {WeaponMeter} from "../player/ui/WeaponMeter";
import {DownUpBehaviour} from "../behaviour/DownUpBehaviour";
import {SceneCatalogue} from "../catalogues/SceneCatalogue";

export class ZombieScene extends Scene {
  hasBackground: boolean = true;
  name: string = "Level 3";
  type: SceneCatalogue = SceneCatalogue.ZOMBIE;
  levelBorders: Shape = new Shape(0, 0, 0, 500, 1024);

  playground(game: Game) {
    let player = game.player;
    player.reset(100, 500/2 - 25, 5);
    game.gameArea.addElement(player);
    game.gameArea.setCamera(new BasicCamera(player, game.gameArea));

    let numberOfBoxes = 10;
    let index = 0;
    while(numberOfBoxes >= index) {
      let shape = new ColoredShape(200 + index * 100, 220, 1, 50, 50, "#0002ff").isDangerous(false);
      shape.addGenericBehaviour("circle", new DownUpBehaviour(shape, .05, 200, index * 20));
      game.gameArea.addElement(shape);
      index++;
    }

    let center = new ColoredShape(100, 100, 1, 5, 5, "black");
    game.gameArea.addElement(center);
    /*game.gameArea.addElement(new ColoredShape(500, 250, 1, 200, 200, "black").isDestructible(true));
    game.gameArea.addElement(new ColoredShape(600, 300, 1, 20, 20, "white").isDestructible(true));
    game.gameArea.addElement(new ColoredShape(550, 300, 1, 20, 20, "white").isDestructible(true));
    game.gameArea.addElement(new ColoredShape(520, 400, 1, 20, 100, "white").isDestructible(true));*/

    game.gameArea.addElement(new WeaponMeter(player));
    game.gameArea.addElement(new FuelMeter(player));
    game.gameArea.addElement(new CurrencyMeter(player));
  }
}
