export interface Boiler {
  hasWater(): boolean
}

export class BoilerHeater {
  private waterState: boolean

  constructor() {
    this.waterState = true
  }

  public hasWater(): boolean {
    return this.waterState
  }
}