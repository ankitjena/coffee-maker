export interface Indicator {
  isOn(): boolean
  turnOnOff(): boolean
}

export class IndicatorLight implements Indicator {
  private state: boolean

  constructor() {
    this.state = true
  }
  
  public isOn(): boolean {
    return this.state
  }

  public turnOnOff(): boolean {
    this.state = !this.state
    return this.state
  }
}