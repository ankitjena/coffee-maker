import { promisify } from 'util'
import { Status, DisplayController } from './DisplayController'
import { Container, ContainerDetail, ContainerTypes } from './Container'
import { SwitchController, OnOffControl } from './SwitchController'
import { Recipe } from './Recipe'

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
/**
 * Input ingredients structure
 */
interface InputQuantity {
  milk: number
  water: number
  coffee: number
}

export class CoffeeController {
  private switch: OnOffControl
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
    this.coffeePowderContainer = new Container(ContainerTypes.COFFEE_POWDER, values.coffee , 500)
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
    await this.milkContainer.useContent(recipe.Milk)
    await this.waterContainer.useContent(recipe.Water)
    await this.coffeePowderContainer.useContent(recipe.Coffee)
    await sleep(10000) //time taken to brew coffee(assumption)
    await this.display.show(Status.CORRECT, "Finished Brewing")
    await this.display.show(Status.CORRECT, "Thanks for using the machine")
    await sleep(2000)
  }
}