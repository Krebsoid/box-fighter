import {Valuable} from "./Valuable";
import {Buyable} from "./Buyable";

export interface ValuableConsumer {

  consume(valuable: Valuable);
  buy(buyable: Buyable);

}
