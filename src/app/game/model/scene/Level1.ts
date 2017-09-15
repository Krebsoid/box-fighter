import {Scene} from "../base/Scene";
import {Game} from "../../service/Game";
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
import {BlinkBehaviour} from "../behaviour/BlinkBehaviour";
import {StaticCamera} from "../base/StaticCamera";
import {LifeMeter} from "../ui/LifeMeter";

export class Level1 extends Scene {
  hasBackground: boolean = true;
  name: string = "Level1";
  type: SceneType = SceneType.LEVEL1;
  levelBorders: Shape = new Shape(0, 0, 0, 500, 3000);

  playground(game: Game) {
    let player = game.player;
    player.resetPosition(100, 500/2 - 25, 5);
    game.gameArea.addElement(player);

    game.gameArea.addElement(new HitBoxes());

    let camera = new BasicCamera(player, game.gameArea);
    game.gameArea.setCamera(camera);

    game.gameArea.addElement(new ShrinkingColoredShape(300, 100, 1, 50, 50, "#ff000f").setLife(2).setKey("target").isDestructible(true).setValue(300));
    game.gameArea.addElement(new ShrinkingColoredShape(500, 400, 1, 50, 50, "#ff000f").setLife(2).setKey("target").isDestructible(true).setValue(300));
    game.gameArea.addElement(new ShrinkingColoredShape(700, 300, 1, 50, 50, "#ff000f").setLife(2).setKey("target").isDestructible(true).setValue(300));
    game.gameArea.addElement(new ShrinkingColoredShape(500, 300, 1, 50, 50, "#ff000f").setLife(2).setKey("target").isDestructible(true).setValue(300));
    game.gameArea.addElement(new ShrinkingColoredShape(100, 100, 1, 50, 50, "#ff000f").setLife(2).setKey("target").isDestructible(true).setValue(300));
    game.gameArea.addElement(new ShrinkingColoredShape(300, 300, 1, 50, 50, "#ff000f").setLife(2).setKey("target").isDestructible(true).setValue(300));
    game.gameArea.addElement(new ShrinkingColoredShape(700, 300, 1, 50, 50, "#ff000f").setLife(2).setKey("target").isDestructible(true).setValue(300));

    let noTarget = new ShrinkingColoredShape(350, 100, 1, 50, 50, "green").setKey("no-target").isDestructible(true);
    noTarget.setValue(0);
    game.gameArea.addElement(noTarget);

    game.gameArea.addElement(new Fuel(380, 380, 300));
    game.gameArea.addElement(new Fuel(1000, 300, 300));

    game.gameArea.addElement(new GenericShape(600, 320, 10, "green", new Triangle()));

    let textDown = new Text(-50, 340, 2, "black", "30pt Calibri");
    textDown.text = "Leertaste zum Schießen";
    game.gameArea.addElement(textDown);

    game.gameArea.addElement(new LifeMeter(player));
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
    game.pause();
    game.changeGameState(SceneType.LEVEL2_INTRO);
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


export class Level1Intro extends Scene {
  hasBackground: boolean = false;
  name: string = "Level1 Intro";
  type: SceneType = SceneType.LEVEL1_INTRO;
  levelBorders: Shape = new Shape(0, 0, 0, 500, 3000);

  playground(game: Game) {
    game.gameArea.setCamera(new StaticCamera(game.gameArea));
    let text = new Text(300, 160, 1, "blue", "80pt Calibri").isFixed(true);
    text.text = "Level 2";
    game.gameArea.addElement(text);
    let text2 = new Text(310, 260, 1, "blue", "40pt Calibri").isFixed(true);
    text2.text = "Lerne schießen!";
    game.gameArea.addElement(text2);
    let text3 = new Text(310, 360, 1, "black", "20pt Calibri").isFixed(true);
    text3.text = "Drücke LEERTASTE zum Starten";
    text3.addGenericBehaviour("blink", new BlinkBehaviour(text3, game.gameTime, 50, 10));
    game.gameArea.addElement(text3);

    let spaceTask = new SpaceTask();
    game.gameArea.addElement(spaceTask);
  }
}

export class SpaceTask extends Task {
  onSuccess: (game: Game) => void = game => {
    game.pause();
    game.changeGameState(SceneType.LEVEL1, 500);
  };

  update(game: Game) {
    if(game.controls.shoot) {
      this.onSuccess(game);
    }
  }
}
