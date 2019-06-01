/**
 * Basic interface for each container
 */
export interface ContainerDetail {
  isEmpty(): boolean
  checkFeasibility(value: number): boolean
  useContent(value: number): void
}

/**
 * Types of containers
 */
export enum ContainerTypes {
  MILK = "Milk",
  WATER = "Water",
  COFFEE_POWDER = "Coffee powder"
}

export class Container implements ContainerDetail {
  
  private type: ContainerTypes
  private quantity: number
  private maxQuantity: number

  /**
   * 
   * @param type One of the type of containers
   * @param initialValue the value to initilalize the container with
   * @param maxValue max capacity of the container
   */
  constructor(type: ContainerTypes, initialValue: number, maxValue: number) {
    this.type = type
    this.quantity = initialValue
    this.maxQuantity = maxValue
  }

  /**
   * check if container is empty or not
   */
  public isEmpty(): boolean {
    if(this.quantity > 0) {
      return false
    }
    return true
  }

  /**
   * Check if amount needed by recipe is available or nor
   * @param value the amount needed by the recipe
   */
  public checkFeasibility(value: number): boolean {
    if(this.quantity - value > 0) {
      return true
    }
    return false
  }

  /**
   * Use the amount specified from the container
   * @param value amount needed by recipe
   */
  public useContent(value: number): void {
    this.quantity -= value
  }

  /**
   * returns the current quantity in container
   */
  public returnQuantity(): number {
    return this.quantity
  }
}