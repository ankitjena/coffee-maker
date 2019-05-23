export interface Valve {
  openValve(): any
  closeValve(): any
}

export class ReliefValve {
  private isOpen: boolean

  constructor() {
    this.isOpen = true
  }

  public openValve(): any {
    this.isOpen = true
  }

  public closeValve(): any {
    this.isOpen = false
  }
}