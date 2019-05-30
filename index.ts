import { CoffeeController } from './src/CoffeeController'
import { UserInput } from './src/UserInput'
import { CoffeRecipe } from './src/Recipe'

/**
 * Main function which starts up the coffee machine, provides inputs and brews coffee
 */
const main = async() => {
  const coffeeInstance = new CoffeeController()
  const recipe = new CoffeRecipe()
  coffeeInstance.init({milk: 200, water: 300, coffeePowder: 100})
  await coffeeInstance.brew(recipe.Black)
  await coffeeInstance.brew(recipe.Capucchino)
  await coffeeInstance.brew(recipe.Espresso)
}

main()