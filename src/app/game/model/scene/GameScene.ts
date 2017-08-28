import {Scene} from "../base/Scene";
import {Game} from "../../service/Game";
import {Engine} from "../parts/Engine";
import {Weapon} from "../parts/Weapon";
import {Player} from "../base/Player";
import {ColoredShape} from "../base/ColoredShape";
import {HitBox} from "../HitBox";
import {Sprite} from "../base/Sprite";
import {FuelMeter} from "../ui/FuelMeter";
import {Fuel} from "../Fuel";
import {Shape} from "../base/Shape";
import {GenericShape} from "../base/GenericShape";
import {Triangle} from "../shapes/Triangle";
import {Heart} from "../shapes/Heart";
import {ShapeMachine} from "../ShapeMachine";
import {CircleBehaviour} from "../behaviour/CircleBehaviour";
import {SinusBehaviour} from "../behaviour/SinusBehaviour";
import {CurrencyMeter} from "../ui/CurrencyMeter";
import {DoubleWeapon} from "../parts/DoubleWeapon";
import {BasicCamera} from "../base/BasicCamera";
import {SceneType} from "./SceneType";
import {WeaponMeter} from "../ui/WeaponMeter";
import {StrokedText} from "../base/StrokedText";
import {Task} from "../mission/Mission";
import {Camera} from "../base/Camera";
import {KillEvent} from "../base/Event";
import {ElementType} from "../base/ElementType";
import {EventListener} from "../base/EventListener";

export class GameScene extends Scene {
  name: string = "Game";
  type: SceneType = SceneType.LEVEL2;
  levelBorders: Shape = new Shape(0, 0, 0, 500, 3000);

  init(game: Game) {
    let player = new Player();
    player.setWeapon(new Weapon(0,0,0));
    player.setEngine(new Engine(0,0,0));
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
        shape.move(3,0);
      }
    });
    shape.addBehaviour<Shape>("fast-backward", (game, shape) => {
      if(game.gameTime > 1000) {
        shape.removeBehaviour("little-forward");
        shape.move(-10,0);
      }
    });
    game.gameArea.addElement(shape);

    let shape2 = new ColoredShape(300, 100, 1, 50, 50, "#0002ff").isDestructible(true);
    shape2.addBehaviour<Shape>("sinus-freak", (game, shape) => {
      if(game.gameTime > 100) {
        shape.move(2, 6 * Math.sin(shape.x/10));
      }
    });
    game.gameArea.addElement(shape2);
    game.gameArea.addElement(new ColoredShape(800, 100, 1, 50, 50, "#ff000f").isDestructible(true));
    let coloredShape = new ColoredShape(2000, 100, 1, 50, 50, "#fff300").isDestructible(true);
    game.gameArea.addElement(coloredShape);
    game.gameArea.addElement(new ColoredShape(3000, 0, 3, 2, 500, "#000000").isDestructible(true));

    game.gameArea.addElement(new HitBox(100, 100, 3, 100, 100, "#98ffb7").isDestructible(true));

    game.gameArea.addElement(new Sprite(500, 200, 1, 30, 30, true, 200, "assets/sprite.png").isDestructible(true));
    let sprite = new Sprite(500, 300, 1, 30, 30, true, 6, "assets/sprite.png");
    sprite.addGenericBehaviour<Shape>("sinus-freak", new SinusBehaviour());
    sprite.addBehaviour<Shape>("sinus-freak-backwards", (game, shape) => {
      if(shape.x > 700) {
        shape.removeBehaviour("sinus-freak");
      }
      if(shape.x > 500 && !shape.behaviours.has("sinus-freak")) {
        shape.move(-2, 2 * Math.sin(shape.x/5));
      } else {
        shape.addBehaviour<Shape>("sinus-freak", (game, shape) => {
          if(shape.x < 700) {
            shape.move(.4, 2 * Math.sin(shape.x/5));
          }
        });
      }
    });
    game.gameArea.addElement(sprite);

    let sprite2 = new Sprite(500, 250, 1, 30, 30, true, 200, "assets/sprite.png").isDestructible(true);

    sprite2.addGenericBehaviour<Sprite>("circle", new CircleBehaviour(200));

    game.gameArea.addElement(sprite2);
    game.gameArea.addElement(new ColoredShape(500, 250, 2, 2, 2, "#000000").isDestructible(true));
    game.gameArea.addElement(new ShapeMachine());

    game.gameArea.addElement(new Fuel(300, 300, 300));
    game.gameArea.addElement(new Fuel(1000, 300, 300));

    game.gameArea.addElement(new WeaponMeter(player));
    game.gameArea.addElement(new FuelMeter(player));
    game.gameArea.addElement(new CurrencyMeter(player));

    game.gameArea.addElement(new GenericShape(500, 320, 10, "green", new Triangle()));

    let heart = new GenericShape(700, 320, 10, "red", new Heart());
    heart.addGenericBehaviour<Shape>("circle", new CircleBehaviour(100));
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
    game.changeGameState(SceneType.WIN);
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
    this.killedBoxes = event.object.type !== ElementType.BULLET ? this.killedBoxes + 1 : this.killedBoxes;
  }
}

