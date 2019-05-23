export interface Button{
  isPushed(): any
}

export class BrewButton implements Button {
  private isButtonPushed: boolean

  constructor() {
    this.isButtonPushed = true
  }

  public isPushed(): any {
    this.isButtonPushed = !this.isButtonPushed
  }
}