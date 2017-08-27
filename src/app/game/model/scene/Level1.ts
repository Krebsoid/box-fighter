import {Scene} from "../base/Scene";
import {Game} from "../../service/Game";
import {Engine} from "../parts/Engine";
import {Weapon} from "../parts/Weapon";
import {Player} from "../base/Player";
import {GenericShape} from "../base/GenericShape";
import {Triangle} from "../shapes/Triangle";
import {CurrencyMeter} from "../ui/CurrencyMeter";
import {FuelMeter} from "../ui/FuelMeter";
import {HitBoxes} from "../mission/Mission";
import {Fuel} from "../Fuel";
import {ShrinkingColoredShape} from "../base/ShrinkingColoredShape";
import {BasicCamera} from "../base/BasicCamera";
import {Shape} from "../base/Shape";
import {SceneType} from "./SceneType";
import {WeaponMeter} from "../ui/WeaponMeter";
import {Text} from "../base/Text";

export class Level1 extends Scene {
  name: string = "Level1";
  type: SceneType = SceneType.LEVEL1;
  levelBorders: Shape = new Shape(0, 0, 0, 500, 3000);

  init(game: Game) {
    let player = new Player();
    player.currency = 0;
    player.setWeapon(new Weapon(0,0,0));
    player.setEngine(new Engine(0,0,0));
    game.gameArea.addElement(player);

    game.gameArea.addElement(new HitBoxes());

    let camera = new BasicCamera(player, game.gameArea);
    game.gameArea.setCamera(camera);

    game.gameArea.addElement(new ShrinkingColoredShape(300, 100, 1, 50, 50, "#ff000f").setKey("target").isDestructible(true));
    game.gameArea.addElement(new ShrinkingColoredShape(500, 400, 1, 50, 50, "#ff000f").setKey("target").isDestructible(true));
    game.gameArea.addElement(new ShrinkingColoredShape(700, 200, 1, 50, 50, "#ff000f").setKey("target").isDestructible(true));
    game.gameArea.addElement(new ShrinkingColoredShape(500, 300, 1, 50, 50, "#ff000f").setKey("target").isDestructible(true));
    game.gameArea.addElement(new ShrinkingColoredShape(100, 100, 1, 50, 50, "#ff000f").setKey("target").isDestructible(true));
    game.gameArea.addElement(new ShrinkingColoredShape(300, 200, 1, 50, 50, "#ff000f").setKey("target").isDestructible(true));
    game.gameArea.addElement(new ShrinkingColoredShape(700, 300, 1, 50, 50, "#ff000f").setKey("target").isDestructible(true));

    let noTarget = new ShrinkingColoredShape(350, 100, 1, 50, 50, "green").setKey("no-target").isDestructible(true);
    noTarget.setValue(0);
    game.gameArea.addElement(noTarget);

    game.gameArea.addElement(new Fuel(380, 380, 300));
    game.gameArea.addElement(new Fuel(1000, 300, 300));

    game.gameArea.addElement(new GenericShape(600, 320, 10, "green", new Triangle()));

    let textDown = new Text(-50, 340, 2, "black", "30pt Calibri");
    textDown.text = "Leertaste zum Schießen";
    game.gameArea.addElement(textDown);

    game.gameArea.addElement(new WeaponMeter(player));
    game.gameArea.addElement(new FuelMeter(player));
    game.gameArea.addElement(new CurrencyMeter(player));
  }

}
