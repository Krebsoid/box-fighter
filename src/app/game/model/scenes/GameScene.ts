import {Scene} from "../base/Scene";
import {Game} from "../../service/Game";
import {ColoredShape} from "../base/shapes/ColoredShape";
import {HitBox} from "../HitBox";
import {Sprite} from "../base/shapes/Sprite";
import {FuelMeter} from "../player/ui/FuelMeter";
import {Fuel} from "../Fuel";
import {Shape} from "../base/shapes/Shape";
import {GenericShape} from "../base/shapes/GenericShape";
import {Triangle} from "../shapes/Triangle";
import {Heart} from "../shapes/Heart";
import {ShapeMachine} from "../ShapeMachine";
import {CircleBehaviour} from "../behaviour/CircleBehaviour";
import {SinusBehaviour} from "../behaviour/SinusBehaviour";
import {CurrencyMeter} from "../player/ui/CurrencyMeter";
import {DoubleWeapon} from "../player/parts/DoubleWeapon";
import {BasicCamera} from "../base/camera/BasicCamera";
import {WeaponMeter} from "../player/ui/WeaponMeter";
import {StrokedText} from "../base/text/StrokedText";
import {Task} from "../base/Task";
import {Camera} from "../base/camera/Camera";
import {KillEvent} from "../base/event/Event";
import {EventListener} from "../base/event/EventListener";
import {BlinkBehaviour} from "../behaviour/BlinkBehaviour";
import {StaticCamera} from "../base/camera/StaticCamera";
import {Text} from "../base/text/Text";
import {Vector} from "../base/Vector";
import {AnimatedSprite} from "../base/shapes/AnimatedSprite";
import {LifeMeter} from "../player/ui/LifeMeter";
import {ElementCatalogue} from "../catalogues/ElementCatalogue";
import {SceneCatalogue} from "../catalogues/SceneCatalogue";

export class GameScene extends Scene {
  hasBackground: boolean = true;
  name: string = "Game";
  type: SceneCatalogue = SceneCatalogue.LEVEL2;
  levelBorders: Shape = new Shape(0, 0, 0, 500, 3000);

  playground(game: Game) {
    let player = game.player;
    player.reset(100, 500/2 - 25, 5);
    game.gameArea.addElement(player);

    let newWeapon = new DoubleWeapon(200,400,10);
    game.gameArea.addElement(newWeapon);

    let hitManyBoxes = new HitManyBoxes();
    game.registerEventListener(hitManyBoxes);
    game.gameArea.addElement(hitManyBoxes);

    let camera = new BasicCamera(player, game.gameArea);
    game.gameArea.setCamera(camera);

    let shape = new ColoredShape(50, 50, 1, 50, 50, "#00ff16").isDestructible(true);
    shape.addBehaviour<Shape>("little-forward", (game, shape) => {
      if(game.gameTime > 300) {
        shape.move(new Vector(3, 0));
      }
    });
    shape.addBehaviour<Shape>("fast-backward", (game, shape) => {
      if(game.gameTime > 1000) {
        shape.removeBehaviour("little-forward");
        shape.move(new Vector(-10, 0));
      }
    });
    game.gameArea.addElement(shape);

    let shape2 = new ColoredShape(300, 100, 1, 50, 50, "#0002ff").isDestructible(true);
    shape2.addBehaviour<Shape>("sinus-freak", (game, shape) => {
      if(game.gameTime > 100) {
        shape.move(new Vector(2, 6 * Math.sin(shape.position.x/10)));
      }
    });
    game.gameArea.addElement(shape2);
    game.gameArea.addElement(new ColoredShape(800, 100, 1, 50, 50, "#ff000f").isDestructible(true));
    let coloredShape = new ColoredShape(2000, 100, 1, 50, 50, "#fff300").isDestructible(true);
    game.gameArea.addElement(coloredShape);
    game.gameArea.addElement(new ColoredShape(3000, 0, 3, 2, 500, "#000000").isDestructible(true));

    game.gameArea.addElement(new HitBox(100, 100, 3, 100, 100, "#98ffb7").isDestructible(true));

    game.gameArea.addElement(new AnimatedSprite(500, 200, 1, 30, 30, "assets/sprite.png", 200, true).isDestructible(true));
    let sprite = new AnimatedSprite(500, 300, 1, 30, 30, "assets/sprite.png", 5, true);
    sprite.addGenericBehaviour<Shape>("sinus-freak", new SinusBehaviour());
    sprite.addBehaviour<Shape>("sinus-freak-backwards", (game, shape) => {
      if(shape.position.x > 700) {
        shape.removeBehaviour("sinus-freak");
      }
      if(shape.position.x > 500 && !shape.behaviours.has("sinus-freak")) {
        shape.move(new Vector(-2, 2 * Math.sin(shape.position.x/5)));
      } else {
        shape.addBehaviour<Shape>("sinus-freak", (game, shape) => {
          if(shape.position.x < 700) {
            shape.move(new Vector(.4, 2 * Math.sin(shape.position.x/5)));
          }
        });
      }
    });
    game.gameArea.addElement(sprite);

    let sprite2 = new AnimatedSprite(500, 250, 1, 30, 30, "assets/sprite.png", 200, true).isDestructible(true);

    sprite2.addGenericBehaviour<Sprite>("circle", new CircleBehaviour(200, 1, sprite2));

    game.gameArea.addElement(sprite2);
    game.gameArea.addElement(new ColoredShape(500, 250, 2, 2, 2, "#000000").isDestructible(true));
    game.gameArea.addElement(new ShapeMachine());

    game.gameArea.addElement(new Fuel(300, 300, 300));
    game.gameArea.addElement(new Fuel(1000, 300, 300));

    game.gameArea.addElement(new LifeMeter(player));
    game.gameArea.addElement(new WeaponMeter(player));
    game.gameArea.addElement(new FuelMeter(player));
    game.gameArea.addElement(new CurrencyMeter(player));

    game.gameArea.addElement(new GenericShape(500, 320, 10, "green", new Triangle()));

    let heart = new GenericShape(700, 320, 10, "red", new Heart());
    heart.addGenericBehaviour<Shape>("circle", new CircleBehaviour(100, 1, heart));
    game.gameArea.addElement(heart);
  }
}

export class HitManyBoxes extends Task implements EventListener {
  label: StrokedText;
  killedBoxes: number = 0;

  constructor() {
    super();
    this.label = new StrokedText(100, 50, 100, "red", "30pt Calibri", 0, "black").isFixed(true);
    this.label.text = this.description;
  }

  description: string = "Zerstöre noch weitere 50 Kisten";
  onSuccess: (game: Game) => void = (game: Game) => {
    game.changeGameState(SceneCatalogue.WIN);
    this.done = true;
  };

  render(camera: Camera): any {
    this.label.render(camera);
    super.render(camera);
  }

  update(game: Game) {
    this.label.text = this.description + " (" + this.killedBoxes + " schon getroffen)";
    if(!this.done) {
      if(this.killedBoxes >= 50) {
        this.onSuccess(game);
      }
    }
  }

  onEvent(event: KillEvent) {
    this.killedBoxes = event.object.type !== ElementCatalogue.BULLET ? this.killedBoxes + 1 : this.killedBoxes;
  }
}


export class Level2Intro extends Scene {
  hasBackground: boolean = false;
  name: string = "Level2 Intro";
  type: SceneCatalogue = SceneCatalogue.LEVEL2_INTRO;
  levelBorders: Shape = new Shape(0, 0, 0, 500, 3000);

  playground(game: Game) {
    game.gameArea.setCamera(new StaticCamera(game.gameArea));
    let text = new Text(300, 160, 1, "blue", "80pt Calibri").isFixed(true);
    text.text = "Level 3";
    game.gameArea.addElement(text);
    let text2 = new Text(310, 260, 1, "blue", "40pt Calibri").isFixed(true);
    text2.text = "Lerne zu überleben!";
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
    game.changeGameState(SceneCatalogue.LEVEL2, 500);
  };

  update(game: Game) {
    if(game.controls.shoot) {
      this.onSuccess(game);
    }
  }
}

