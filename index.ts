import { Indicator, IndicatorLight } from "./src/Indicator";
import { Boiler, BoilerHeater } from "./src/Boiler";
import { Button, BrewButton } from "./src/Button";
import { Plate, PlateWarmer } from "./src/Plate";
import { Valve, ReliefValve } from "./src/Valve";

class Brew {
  private indicator: Indicator
  private boiler: Boiler
  private button: Button
  private plate: Plate
  private valve: Valve
  
  public start(): any {
    this.indicator = new IndicatorLight()
    this.boiler = new BoilerHeater()
    this.button = new BrewButton()
    this.plate = new PlateWarmer()
    this.valve = new ReliefValve()
  }
}

const brew = new Brew()
brew.start()