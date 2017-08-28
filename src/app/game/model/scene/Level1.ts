import {Scene} from "../base/Scene";
import {Game} from "../../service/Game";
import {Engine} from "../parts/Engine";
import {Weapon} from "../parts/Weapon";
import {Player} from "../base/Player";
import {GenericShape} from "../base/GenericShape";
import {Triangle} from "../shapes/Triangle";
import {CurrencyMeter} from "../ui/CurrencyMeter";
import {FuelMeter} from "../ui/FuelMeter";
import {Fuel} from "../Fuel";
import {ShrinkingColoredShape} from "../base/ShrinkingColoredShape";
import {BasicCamera} from "../base/BasicCamera";
import {Shape} from "../base/Shape";
import {SceneType} from "./SceneType";
import {WeaponMeter} from "../ui/WeaponMeter";
import {Text} from "../base/Text";
import {StrokedText} from "../base/StrokedText";
import {Camera} from "../base/Camera";
import {Task} from "../mission/Mission";

export class Level1 extends Scene {
  name: string = "Level1";
  type: SceneType = SceneType.LEVEL1;
  levelBorders: Shape = new Shape(0, 0, 0, 500, 3000);

  init(game: Game) {
    let player = new Player();
    player.currency = 0;
    player.setWeapon(new Weapon(0, 0, 0));
    player.setEngine(new Engine(0, 0, 0));
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

export class HitBoxes extends Task {
  constructor() {
    super();
    this.label = new StrokedText(10, 50, 0, "red", "30pt Calibri",0,"black").isFixed(true)
  }

  description: string = "Zerstöre alle roten Kisten aber keine grünen";
  label: StrokedText;

  onSuccess: (game: Game) => void = (game: Game) => {
    game.changeGameState(SceneType.LEVEL2);
    this.done = true;
  };
  onFail: (game: Game) => void = (game: Game) => {
    game.changeGameState(SceneType.DEAD);
    this.done = true;
  };

  render(camera: Camera): any {
    this.label.render(camera);
    super.render(camera);
  }

  update(game: Game) {
    if(!this.done) {
      let numberOfBoxesLeft = game.gameArea.elements.filter(value => value.key == "target").length;
      let numberOfNoTargetBoxes = game.gameArea.elements.filter(value => value.key == "no-target").length;
      this.label.text = this.description + "(" + numberOfBoxesLeft.toString() + " Kiste(n) übrig)";
      numberOfNoTargetBoxes < 1 ? this.onFail(game) : undefined;
      numberOfBoxesLeft == 0 ? this.onSuccess(game) : undefined;
    }
  }
}
