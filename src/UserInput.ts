import { RecipeDetails, Recipe, Recipes } from './Recipe'

export interface InputQuantity {
  milk: number
  water: number
  coffeePowder: number
}

export class UserInput {
  public enterRecipe(recipe: Recipes): Recipe {
    return RecipeDetails[recipe]
  }
  public enterQuantity(quantity: InputQuantity) {
    return quantity
  }
}