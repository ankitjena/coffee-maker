export const RecipeDetails = {
  Latte: {Water: 40, Milk: 20},
  Filter_Coffee: {Water: 60, Milk: 0},
  Espresso: {Water: 30, Milk: 30},
  Capucchino: {Water: 30, Milk: 40}
}

export interface Recipe {
  Water: number
  Milk: number
}