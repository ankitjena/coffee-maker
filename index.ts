import { ErrorHandler, ErrorInterface } from './src/Error'
import { RecipeDetails, Recipe} from './src/Recipe'

class PrepareCoffeeMaker implements Recipe{
  Water: number
  Milk: number

  constructor(water: number, milk: number) {
    this.Water = water
    this.Milk = milk
  }
}

class BrewCoffee {
  initialAmount: Recipe
  error: ErrorInterface
  constructor(initial: Recipe) {
    this.initialAmount = initial
    this.error = new ErrorHandler()
  }
  public brew(recipe: Recipe): void {

    if(this.error.checkError(this.initialAmount, recipe)){
      console.log("Start brewing")
      this.initialAmount.Water -= recipe.Water
      this.initialAmount.Milk -= recipe.Milk
      console.log("Finish brewing")
      console.log(this.initialAmount)
    }
  }
}

const initial = new PrepareCoffeeMaker(1000, 1000)
const coffee = new BrewCoffee(initial)
coffee.brew(RecipeDetails.Latte)
coffee.brew(RecipeDetails.Espresso)
coffee.brew(RecipeDetails.Capucchino)