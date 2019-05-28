import {Recipe} from './Recipe'

/* Error types with respective messages */
export enum ErrorTypes {
  waterEmpty = "Water is empty. Refill",
  milkEmpty = "Milk is empty. Refill"
}

/*
Error interface with type, and two methods
*/
export interface ErrorInterface {
  type: string
  throwError(message: string): void
  checkError(initial: Recipe, final: Recipe): boolean
}

/**
 * Checks for error in two containers, if error exists throws the error, stops brewing
 */

export class ErrorHandler implements ErrorInterface {
  type: string

  throwError<T>(arg: T): void {
    console.log(arg)
  }

  checkError(initial: Recipe, final: Recipe): boolean {
    if(initial.Water - final.Water < 0) {
      this.throwError(ErrorTypes.waterEmpty)
      return false
    }
    if(initial.Milk - final.Milk < 0) {
      this.throwError(ErrorTypes.milkEmpty)
      return false
    }

    return true
  }
}