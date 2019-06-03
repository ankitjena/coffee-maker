import { promisify } from 'util'
import { writeFile, access, constants } from 'fs'
import os = require('os')

const containerPath = `${os.homedir}/.Container.json`

const writeFileAsync = promisify(writeFile)
const accessAsync = promisify(access)

/**
 * Basic interface for each container
 */
export interface ContainerDetail {
  init(initialValue: number, maxValue: number): Promise<void>
  isEmpty(): Promise<boolean>
  checkFeasibility(value: number): Promise<boolean>
  useContent(value: number): Promise<void>
}

/**
 * Types of containers
 */
export enum ContainerTypes {
  MILK = "Milk",
  WATER = "Water",
  COFFEE_POWDER = "Coffee"
}

export class Container implements ContainerDetail {
  
  private type: ContainerTypes
  private container: object

  constructor(type: ContainerTypes) {
    this.type = type
  }

  public async read(): Promise<object> {
    let container = require(containerPath)
    return container
  }

  public async init(initialValue: number, maxValue: number): Promise<void> {
    this.container = await this.read()
    this.container[this.type] = initialValue
    await writeFileAsync(containerPath, JSON.stringify(this.container, undefined, 2))
  }

  /**
   * check if container is empty or not
   */
  public async isEmpty(): Promise<boolean> {
    this.container = await this.read()
    if(this.container[this.type] > 0) {
      return false
    }
    return true
  }

  /**
   * Check if amount needed by recipe is available or nor
   * @param value the amount needed by the recipe
   */
  public async checkFeasibility(value: number): Promise<boolean> {
    this.container = await this.read()
    if(this.container[this.type] - value > 0) {
      return true
    }
    return false
  }

  /**
   * Use the amount specified from the container
   * @param value amount needed by recipe
   */
  public async useContent(value: number): Promise<void> {
    this.container = await this.read()
    this.container[this.type] -= value
    await writeFileAsync(containerPath, JSON.stringify(this.container, undefined, 2))
  }
}