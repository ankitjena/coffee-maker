import { RecipeDetails, Recipe, Recipes } from './Recipe'

/**
 * Three main ingredients
 */
export interface InputQuantity {
  milk: number
  water: number
  coffeePowder: number
}

export class UserInput {
  /**
   * 
   * @param recipe Recipe Details
   */
  public enterRecipe(recipe: Recipes): Recipe {
    return RecipeDetails[recipe]
  }
  /**
   * 
   * @param quantity initial quantity of the ingredients provided when starting up the machine
   */
  public enterQuantity(quantity: InputQuantity) {
    return quantity
  }
}