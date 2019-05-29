export interface ContainerDetail {
  isEmpty(): boolean
  checkFeasibility(value: number): boolean
  useContent(value: number): void
}

export enum ContainerTypes {
  MILK = "Milk",
  WATER = "Water",
  COFFEE_POWDER = "Coffee powder"
}

export class Container implements ContainerDetail {
  
  private type: ContainerTypes
  private quantity: number
  private maxQuantity: number

  constructor(type: ContainerTypes, initialValue: number, maxValue: number) {
    this.type = type
    this.quantity = initialValue
    this.maxQuantity = maxValue
  }

  public isEmpty(): boolean {
    if(this.quantity > 0) {
      return false
    }
    return true
  }

  public checkFeasibility(value: number): boolean {
    if(this.quantity - value > 0) {
      return true
    }
    return false
  }

  public useContent(value: number): void {
    this.quantity -= value
  }

  public returnQuantity(): number {
    return this.quantity
  }
}