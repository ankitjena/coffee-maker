export interface Plate {
  isPotEmptied(): any
  isPotPartial(): any
  isPotRemoved(): any
}

export class PlateWarmer implements PlateWarmer {
  private warmerOn: boolean

  constructor() {
    this.warmerOn = true
  }

  public turnOnOff(): any {
    this.warmerOn = !this.warmerOn
  }

  public isPotEmptied(): any {
    this.warmerOn = false
  }

  public isPotPartial(): any {
    this.warmerOn = true
  }

  public isPotRemoved(): any {
    this.warmerOn = false
  }
}