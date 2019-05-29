export const RecipeDetails = {
  Latte: {Water: 40, Milk: 20, Coffee: 20},
  Black: {Water: 120, Milk: 0, Coffee: 20},
  Espresso: {Water: 30, Milk: 30, Coffee: 20},
  Capucchino: {Water: 30, Milk: 40, Coffee: 20}
}
/**
 * Types of recipes and their configs
 */
export enum Recipes {
  Latte = "Latte",
  Black = "Black",
  Espresso = "Espresso",
  Capucchino = "Capucchino"
}

/**
 * Three keys ingredients,
 * Water, Milk and Coffee
 */

export interface Recipe {
  Water: number
  Milk: number
  Coffee: number
}