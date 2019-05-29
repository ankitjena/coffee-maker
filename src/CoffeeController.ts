import { promisify } from 'util'
import { Status, DisplayController } from './DisplayController'
import { Container, ContainerDetail, ContainerTypes } from './Container'
import { SwitchController, Controller } from './SwitchController'
import { Recipe } from './Recipe'
import { InputQuantity } from './UserInput'

/**
 * Promisify setTimeOut for async/await
 */
const sleep = promisify(setTimeout)

/**
 * Types with error messages
 */
enum ErrorCodes {
  milkEmpty = "Milk container is empty. Refill",
  waterEmpty = "Water container is empty. Refill",
  powderEmpty = "Out of Coffee Powder. Restock"
}

export class CoffeeController {
  private switch: Controller
  private milkContainer: ContainerDetail
  private coffeePowderContainer: ContainerDetail
  private waterContainer: ContainerDetail
  private display: DisplayController

  /**
   * Intitialize the coffee machine with provided values for ingredients
   * @param values ingredients in form of InputQuantity
   */
  public init(values: InputQuantity): void {
    this.switch = new SwitchController()
    this.switch.On()
    this.display = new DisplayController()
    this.milkContainer = new Container(ContainerTypes.MILK, values.milk , 1000)
    this.waterContainer = new Container(ContainerTypes.WATER, values.water , 1500)
    this.coffeePowderContainer = new Container(ContainerTypes.COFFEE_POWDER, values.coffeePowder , 500)
  }

  /**
   * Check if brewing is possible with given values and current values of containers.
   * @param recipe User input recipe
   */
  public checkBrew(recipe: Recipe): boolean {
    if(this.milkContainer.isEmpty() || !this.milkContainer.checkFeasibility(recipe.Milk)) {
      this.display.show(Status.DANGER, ErrorCodes.milkEmpty) 
      return false
    }

    if(this.waterContainer.isEmpty() || !this.waterContainer.checkFeasibility(recipe.Water)) {
      this.display.show(Status.DANGER, ErrorCodes.waterEmpty)
      return false
    }

    if(this.coffeePowderContainer.isEmpty() || !this.coffeePowderContainer.checkFeasibility(recipe.Coffee)) {
      this.display.show(Status.DANGER, ErrorCodes.powderEmpty)
      return false
    }

    return true
  }

  /**
   * Brew the coffee
   * @param recipe User input recipe
   */
  public async brew(recipe: Recipe): Promise<void> {
    if(!this.switch.isOn()) {
      return
    }
    if(!this.checkBrew(recipe)) {
      return
    }
    await this.display.show(Status.CORRECT, "Brewing Coffee for you ...")
    await sleep(10000) //time taken to brew coffee(assumption)
    this.milkContainer.useContent(recipe.Milk)
    this.waterContainer.useContent(recipe.Water)
    this.coffeePowderContainer.useContent(recipe.Coffee)
    await this.display.show(Status.CORRECT, "Finished Brewing")
    await sleep(2000)
  }
}