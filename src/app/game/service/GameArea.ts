import {Element} from "../model/base/Element";
import {Injectable} from "@angular/core";
import {Camera} from "../model/base/camera/Camera";
import {Player} from "../model/player/Player";
import {ElementCatalogue} from "../model/catalogues/ElementCatalogue";

@Injectable()
export class GameArea {

  elements: Element[] = [];
  graveyard: Element[] = [];
  camera: Camera;
  context: Map<string, any> = new Map();

  elementsOnCamera(): Element[] {
    return this.elements.filter(value => value.fixed || value.visible || value.isOnScreen(this.camera));
  }

  addElement(element: Element) {
    this.elements.push(element);
  }

  removeElement(element: Element) {
    let index = this.elements.indexOf(element);
    if(index > -1) {
      this.elements.splice(index, 1);
      this.graveyard.push(element);
    }
  }

  setCamera(camera: Camera) {
    this.camera = camera;
    this.addElement(camera);
  }

  getPlayer(): Player {
    return <Player>this.elementsOnCamera().find(value => value.type === ElementCatalogue.PLAYER);
  }

  repaint(name: string) {
    this.getContext(name).clearRect(0, 0, 1024, 500);
  }

  getContext(name: string = "game") {
    if(this.context.has(name)) {
      return this.context.get(name);
    } else {
      let canvas: any = document.getElementById(name);
      this.context.set(name, canvas.getContext("2d"));
      return this.context.get(name);
    }
  }

  clear() {
    this.elements = [];
  }

}
