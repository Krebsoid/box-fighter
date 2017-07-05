import { Element } from "../model/Element";
import { Injectable } from "@angular/core";
import {Camera} from "../model/Camera";

@Injectable()
export class GameArea {

  elements: Element[] = [];
  graveyard: Element[] = [];
  camera: Camera;

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

  repaint() {
    this.context().fillStyle = "#FFF";
    this.context().fillRect(0, 0, 1024, 500);
  }

  context() {
    let canvas: any = document.getElementById('game');
    return canvas.getContext("2d");
  }

  clear() {
    this.elements = [];
  }

}
