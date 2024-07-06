import type { Item } from "./Item"

export class Stats {
  energy = '0'
  fat = '0'
  salt = '0'
  protein = '0'

  constructor(item?: Item, energyKcal?: string, fat?: string, salt?: string, protein?: string) {
    this.energy = energyKcal ?? "0"
    this.fat = fat ?? "0"
    this.salt = salt ?? "0"
    this.protein = protein ?? "0"


    this.energy = item?.nutriments?.energy ?? "0";
    this.fat = item?.nutriments?.fat ?? "0";
    this.salt = item?.nutriments?.salt ?? "0";
    this.protein = item?.nutriments?.protein ?? "0";
  }
}
