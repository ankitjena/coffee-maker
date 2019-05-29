export interface Controller {
  On(): void
  Off(): void
  isOn(): boolean
}

export class SwitchController implements Controller{
  
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