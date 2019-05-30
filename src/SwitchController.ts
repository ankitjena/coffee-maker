/**
 * On or Off switch for the coffee machine
 */
export interface OnOffControl {
  On(): void
  Off(): void
  isOn(): boolean
}

export class SwitchController implements OnOffControl{
  
  private state: boolean
  
  public On(): void {
    this.state = true
  }

  public Off(): void {
    this.state = false
  }

  public isOn(): boolean {
    return this.state
  }
}