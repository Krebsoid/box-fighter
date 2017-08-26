import {Event} from "./Event";

export interface EventListener {
  onEvent<E extends Event>(event: E);
}
