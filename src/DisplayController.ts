import chalk from 'chalk'

/**
 * Types of status
 */
export enum Status {
  CORRECT,
  WARNING,
  DANGER
}

export class DisplayController {
  /**
   * 
   * @param type the type of message - correct, warning or danger
   * @param message message to be displayed
   */
  public async show(type: Status, message: string): Promise<void> {
    if(type === Status.CORRECT) {
      console.log(chalk.green(message))
    }
    if(type === Status.WARNING) {
      console.log(chalk.yellow(message))
    }
    if(type === Status.DANGER) {
      console.log(chalk.red(message))
    }
  }
}