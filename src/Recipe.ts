/**
 * Three keys ingredients,
 * Water, Milk and Coffee
 */

export interface Recipe {
  Water: number
  Milk: number
  Coffee: number
}

/**
 * Class with various instances of coffee recipes
 */
export class CoffeRecipe {
  Latte: Recipe
  Black: Recipe
  Capucchino: Recipe
  Espresso: Recipe
  /**
   * instantiate different coffee recipes
   */
  constructor() {
    this.Latte = {Water: 40, Milk: 20, Coffee: 20}
    this.Black = {Water: 60, Milk: 0, Coffee: 20}
    this.Capucchino = {Water: 30, Milk: 40, Coffee: 20}
    this.Espresso = {Water: 30, Milk: 30, Coffee: 20}
  }
}