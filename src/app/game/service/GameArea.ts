import { Element } from "../model/base/Element";
import { Injectable } from "@angular/core";
import {Camera} from "../model/base/Camera";

@Injectable()
export class GameArea {

  elements: Element[] = [];
  graveyard: Element[] = [];
  camera: Camera;
  context: any;

  elementsOnCamera(): Element[] {
    return this.elements.filter((value, index, array) =>
      value.fixed || value.x + 200 >= this.camera.x && value.x - 100 <= this.camera.x + 1024);
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

  repaint() {
    this.getContext().clearRect(0, 0, 1024, 500);
  }

  getContext() {
    if(this.context) {
      return this.context;
    } else {
      let canvas: any = document.getElementById('game');
      this.context = canvas.getContext("2d");
      return this.context;
    }
  }

  clear() {
    this.elements = [];
  }

}
