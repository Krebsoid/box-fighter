import {Component, HostListener, OnInit} from '@angular/core';
import {GameArea} from "./service/GameArea";
import {Game} from "./service/Game";
import {Vector} from "./model/base/Vector";
import {GameScene, Level2Intro} from "./model/scenes/GameScene";
import {EndScene} from "./model/scenes/EndScene";
import {Level1, Level1Intro} from "./model/scenes/Level1";
import {Maze, MazeIntro} from "./model/scenes/Maze";
import {WinningScene} from "./model/scenes/WinningScene";
import {ZombieScene} from "./model/scenes/ZombieScene";
import {TryAgainScene} from "./model/scenes/TryAgainScene";
import {Scene} from "./model/base/Scene";
import {SceneCatalogue} from "./model/catalogues/SceneCatalogue";

@Component({
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {

  constructor(public gameArea: GameArea, public game: Game) {

  }

  ngOnInit(): void {
    this.addScene(new Level2Intro());
    this.addScene(new GameScene());
    this.addScene(new EndScene());
    this.addScene(new Level1());
    this.addScene(new Level1Intro());
    this.addScene(new MazeIntro());
    this.addScene(new WinningScene());
    this.addScene(new Maze());
    this.addScene(new ZombieScene());
    this.addScene(new TryAgainScene());
    this.game.changeGameState(SceneCatalogue.MAZE_INTRO);
    this.game.init();
  }

  private addScene(scene: Scene) {
    this.game.scenes.set(scene.type, scene);
  }

  @HostListener('document:keydown', ['$event'])
  playerMovement(event: KeyboardEvent) {
    this.game.controls.addControl(event.key);
  }

  @HostListener('mousemove', ['$event'])
  @HostListener('touchmove', ['$event'])
  onMousemove(event) {
    this.game.controls.removeControl(" ");
  }

  @HostListener('mousedown', ['$event'])
  @HostListener('touchstart', ['$event'])
  onMousedown(event) {
    let clientY = event.touches ? event.touches[0].clientY : event.offsetY;
    let clientX = event.touches ? event.touches[0].clientX : event.offsetX;
    this.game.player.setDestination(new Vector(clientX + this.gameArea.camera.position.x - 300, clientY + this.gameArea.camera.position.y));
  }

  @HostListener('mouseup')
  @HostListener('touchend', ['$event'])
  @HostListener('touchcancel', ['$event'])
  onMouseup() {
    this.game.controls.addControl(" ");
  }

  @HostListener('document:keyup', ['$event'])
  movementStop(event: KeyboardEvent) {
    this.game.controls.removeControl(event.key);
  }
}
