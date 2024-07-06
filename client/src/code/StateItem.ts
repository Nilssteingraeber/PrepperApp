import type { Item } from "./item/Item";

export class StateItem {
    state: string
    item: Item

  constructor(
    state: string,
    item: Item
  ) {
    this.state = state;
    this.item = item;
  }
}