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
  public async initContainer(values?: InputQuantity): Promise<void> {
    if(values){
      this.milkContainer = new Container(ContainerTypes.MILK)
      await this.milkContainer.init(values.milk, 1000)
      this.waterContainer = new Container(ContainerTypes.WATER)
      await this.waterContainer.init(values.water , 1500)
      this.coffeePowderContainer = new Container(ContainerTypes.COFFEE_POWDER)
      await this.coffeePowderContainer.init(values.coffee , 500)
    }
    else {
      this.milkContainer = new Container(ContainerTypes.MILK)
      this.waterContainer = new Container(ContainerTypes.WATER)
      this.coffeePowderContainer = new Container(ContainerTypes.COFFEE_POWDER)
    }
  }

  public prep(): void {
    this.switch = new SwitchController()
    this.switch.On()
    this.display = new DisplayController()
    this.initContainer()
  }

  /**
   * Check if brewing is possible with given values and current values of containers.
   * @param recipe User input recipe
   */
  public async checkBrew(recipe: Recipe): Promise<boolean> {
    if(await this.milkContainer.isEmpty() || await !this.milkContainer.checkFeasibility(recipe.Milk)) {
      this.display.show(Status.DANGER, ErrorCodes.milkEmpty) 
      return false
    }

    if(await this.waterContainer.isEmpty() || await !this.waterContainer.checkFeasibility(recipe.Water)) {
      this.display.show(Status.DANGER, ErrorCodes.waterEmpty)
      return false
    }

    if(await this.coffeePowderContainer.isEmpty() || await !this.coffeePowderContainer.checkFeasibility(recipe.Coffee)) {
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
    this.prep()
    if(!this.switch.isOn()) {
      return
    }

    if(await !this.checkBrew(recipe)) {
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