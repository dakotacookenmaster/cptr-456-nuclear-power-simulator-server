import { State } from '../interfaces/state.interface'
import { v4 as uuid } from "uuid"

export class Reactor {
  id: string
  name: string
  coolant: 'on' | 'off'
  fuel_rods: {
    in: Number
    out: Number
  }
  temperature: {
    amount: Number
    unit: 'celsius' | 'fahrenheit'
  }
  output: {
    amount: Number
    unit: 'Megawatt (MW)' | 'Gigawatt (GW)'
  }
  state: State
  logs: String[]

  constructor(
    name: string,
    coolant: 'on' | 'off',
    fuel_rods: { in: Number; out: Number },
    temperature: { amount: Number; unit: 'celsius' | 'fahrenheit' },
    output: { amount: Number; unit: 'Megawatt (MW)' | 'Gigawatt (GW)' },
    state: State,
    logs: String[],
  ) {
    this.name = name
    this.coolant = coolant
    this.fuel_rods = fuel_rods
    this.temperature = temperature
    this.output = output
    this.state = state
    this.logs = logs
    this.id = uuid()
  }

  tick() {}

  getGlobalData() {
    return {
      id: this.id,
      name: this.name
    }
  }

  getTemperatureData() {
    return {
      temperature: this.temperature,
    }
  }

  getCoolantData() {
    return {
      coolant: this.coolant
    }
  }
}
