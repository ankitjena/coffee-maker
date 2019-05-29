import { CoffeeController } from './src/CoffeeController'
import { UserInput } from './src/UserInput'
import { Recipes} from './src/Recipe'

const main = async() => {
  const coffeeInstance = new CoffeeController()
  const userInput = new UserInput()
  coffeeInstance.init(userInput.enterQuantity({milk: 200, water: 300, coffeePowder: 100}))
  await coffeeInstance.brew(userInput.enterRecipe(Recipes.Black))
  await coffeeInstance.brew(userInput.enterRecipe(Recipes.Black))
  await coffeeInstance.brew(userInput.enterRecipe(Recipes.Black))
}

main()