/* eslint-disable prettier/prettier */
import { State } from '../interfaces/state.interface'
import { v4 as uuid } from 'uuid'
import { TempLevel } from '../interfaces/temp-level.interface'
import { GlobalData } from '../dto/global-data.dto'

export class Reactor {
    id: string
    name: string
    coolant: 'on' | 'off'
    control_rods: {
        in: number
        out: number
    }
    fuel: {
        percentage: number
    }
    temperature: {
        amount: number
        unit: 'celsius' | 'fahrenheit'
        status: TempLevel
    }
    output: {
        amount: number
        unit: 'Megawatt (MW)' | 'Gigawatt (GW)'
    }
    state: State
    logs: string[]
    private MAX_SAFE_TEMP: number
    private CAUTION_TEMP: number
    private DANGER_TEMP: number
    private MELTDOWN_TEMP: number

    constructor(
        name: string,
        coolant: 'on' | 'off',
        control_rods: { in: number; out: number },
        temperature: {
            amount: number
            unit: 'celsius' | 'fahrenheit'
            status: TempLevel
        },
        output: { amount: number; unit: 'Megawatt (MW)' | 'Gigawatt (GW)' },
        state: State,
        logs: string[],
        fuel: {
            percentage: number
        },
    ) {
        this.name = name
        this.coolant = coolant
        this.control_rods = control_rods
        this.temperature = temperature
        this.output = output
        this.state = state
        this.logs = logs
        this.fuel = fuel
        this.id = uuid()
        this.MAX_SAFE_TEMP = 736
        this.CAUTION_TEMP = 800
        this.DANGER_TEMP = 850
        this.MELTDOWN_TEMP = 900
    }

    tick() {
        if (this.state === State.MAINTENANCE || this.state === State.OFFLINE) {
            this.control_rods = {
                in: 300,
                out: 0,
            }
            this.temperature = {
                ...this.temperature,
                amount: this.temperature.unit === 'celsius' ? 22.22222 : 72,
            }
        } else if (this.state === State.EMERGENCY_SHUTDOWN) {
            if (this.control_rods.in !== 300) {
                this.dropControlRods(35)
                this.temperature.amount = 22.22222 + this.control_rods.out * 2.45168
            }

            if (this.coolant !== 'on') {
                this.coolant = 'on'
                this.addLog(
                    'Coolant was enabled due to Emergency shutdown mode.',
                )
            }
        } else {
            // Handle Fuel Changes
            const randomFuelDrop = Math.random() / 5
            if (this.fuel.percentage - randomFuelDrop >= 0) {
                this.fuel.percentage -= randomFuelDrop
            } else {
                this.fuel.percentage = 0
                this.state = State.OFFLINE
                this.addLog('Reactor shut down due to lack of fuel.')
            }
        }

        // Handle Temperature Changes
        if (this.coolant === 'on' && this.state === State.ACTIVE) {
            if (this.temperature.unit === 'celsius') {
                this.temperature.amount =
                    22.22222 +
                    this.control_rods.out * 2.45168 +
                    Math.random() * 10
            } else {
                this.temperature.amount =
                    72 +
                    this.control_rods.out * 2.45168 * 1.8 +
                    Math.random() * 10 * 1.8
            }
        } else if (this.state === State.ACTIVE) {
            this.temperature.amount += Math.random() * 20
        }

        // Handle Temperature Level Changes
        if (this.temperature.amount <= this.MAX_SAFE_TEMP && this.temperature.status !== TempLevel.SAFE) {
            this.temperature.status = TempLevel.SAFE
            this.addLog('Reactor returned to safe temperature levels.')
        } else if (this.temperature.amount > this.MAX_SAFE_TEMP && this.temperature.amount <= this.CAUTION_TEMP && this.temperature.status !== TempLevel.CAUTION) {
            this.temperature.status = TempLevel.CAUTION
            this.addLog('Reactor exceeding safe temperature level - caution is advised.')
        } else if (this.temperature.amount > this.CAUTION_TEMP && this.temperature.amount <= this.DANGER_TEMP && this.temperature.status !== TempLevel.DANGER) {
            this.temperature.status = TempLevel.DANGER
            this.addLog('Reactor critically exceeding safe temperature level - danger.')
        } else if (this.temperature.amount > this.DANGER_TEMP && this.temperature.amount <= this.MELTDOWN_TEMP + 50 && this.temperature.status !== TempLevel.MELTDOWN) {
            this.temperature.status = TempLevel.MELTDOWN
            this.addLog('Reactor has begun meltdown process. Recommending controlled shutdown or emergency shutdown immediately.')
        } else {
            if (this.temperature.amount > this.MELTDOWN_TEMP + 50 && this.state !== State.EMERGENCY_SHUTDOWN) {
                this.temperature.status = TempLevel.MELTDOWN
                this.state = State.EMERGENCY_SHUTDOWN
                this.addLog('Emergency shutdown mode automatically activated!')
            }
        }

        // Handle Output Changes
        this.output.amount = this.control_rods.out * 3.98
    }

    raiseControlRods(amount: number) {
        if (this.control_rods.in - amount >= 0) {
            this.control_rods.in -= amount
            this.control_rods.out += amount
        } else {
            return "You cannot raise any more rods."
        }
    }

    dropControlRods(amount: number) {
        if (this.control_rods.in + amount <= 300) {
            this.control_rods.in += amount
            this.control_rods.out -= amount
        } else if (this.control_rods.in < 300) {
            this.control_rods.in = 300
            this.control_rods.out = 0
        } else {
            return "You cannot drop any more control rods."
        }
    }

    getGlobalData(): GlobalData {
        return {
            id: this.id,
            name: this.name,
        }
    }

    addLog(message: string) {
        this.logs.push(
            `${new Date().toISOString()}: The following event occurred on ${this.name
            } with ID ${this.id}: ${message}`,
        )
        this.logs = this.logs.slice(-100) // Limit each reactor to 100 logs ==> 400 logs per student
    }

    getTemperatureData() {
        return {
            temperature: this.temperature,
        }
    }

    getCoolantData() {
        return {
            coolant: this.coolant,
        }
    }

    getOutputData() {
        return {
            output: this.output,
        }
    }

    private convertToCelsius(degreesInFahrenheit: number) {
        return (degreesInFahrenheit - 32) * (5 / 9)
    }

    private convertToFahrenheit(degreesInCelsius: number) {
        return degreesInCelsius * (9 / 5) + 32
    }

    getLogs() {
        return this.logs
    }

    setTemperatureUnit(unit: 'celsius' | 'fahrenheit') {
        if (unit !== this.temperature.unit) {
            if (unit === 'fahrenheit') {
                this.addLog(`Changed temperature unit to Fahrenheit.`)
                this.temperature.unit = 'fahrenheit'
                this.temperature.amount = this.convertToFahrenheit(
                    this.temperature.amount,
                )
                this.MAX_SAFE_TEMP = this.convertToFahrenheit(
                    this.MAX_SAFE_TEMP,
                )
                this.CAUTION_TEMP = this.convertToFahrenheit(this.CAUTION_TEMP)
                this.DANGER_TEMP = this.convertToFahrenheit(this.DANGER_TEMP)
                this.MELTDOWN_TEMP = this.convertToFahrenheit(
                    this.MELTDOWN_TEMP,
                )
            } else if (unit === 'celsius') {
                this.addLog(`Changed temperature unit to Celsius.`)
                this.temperature.unit = 'celsius'
                this.temperature.amount = this.convertToCelsius(
                    this.temperature.amount,
                )
                this.MAX_SAFE_TEMP = this.convertToCelsius(this.MAX_SAFE_TEMP)
                this.CAUTION_TEMP = this.convertToCelsius(this.CAUTION_TEMP)
                this.DANGER_TEMP = this.convertToCelsius(this.DANGER_TEMP)
                this.MELTDOWN_TEMP = this.convertToCelsius(this.MELTDOWN_TEMP)
            }
        }
    }

    setReactorName(name: string) {
        this.name = name
    }

    getReactorFuelLevels() {
        return {
            fuel: this.fuel,
        }
    }

    getRodState() {
        return {
            control_rods: this.control_rods,
        }
    }

    getReactorState() {
        return {
            state: this.state,
        }
    }

    controlledShutdown() {
        if (this.state !== State.EMERGENCY_SHUTDOWN) {
            this.state = State.OFFLINE
        } else {
            return "You cannot initiate a controlled shutdown on a reactor that underwent an emergency shutdown."
        }
    }

    enableMaintenanceMode() {
        if (this.state !== State.EMERGENCY_SHUTDOWN) {
            this.state = State.MAINTENANCE
        } else {
            return "You cannot enter maintenance mode on a reactor that underwent an emergency shutdown."
        }
    }

    emergencyShutdown() {
        if (this.state !== State.EMERGENCY_SHUTDOWN) {
            this.state = State.EMERGENCY_SHUTDOWN
            this.addLog("Emergency shutdown mode manually activated!")
        } else {
            return "This reactor already underwent an emergency shutdown. Manual initiation is disallowed."
        }
    }

    startReactor() {
        if (this.state === State.ACTIVE) {
            return 'You cannot start a reactor that is already active.'
        } else if (this.state === State.EMERGENCY_SHUTDOWN) {
            return 'You cannot restart a reactor that went through an Emergency shutdown.'
        } else if (this.fuel.percentage === 0) {
            return 'You cannot restart a reactor that has no fuel.'
        } else {
            this.addLog('Reactor (re)started.')
            this.state = State.ACTIVE
        }
    }

    refuel() {
        if (this.state === State.MAINTENANCE) {
            this.addLog('Reactor refueled.')
            this.fuel = {
                percentage: 100,
            }
            return true
        } else {
            return false
        }
    }

    setCoolantState(state: 'on' | 'off') {
        if (this.coolant !== state && this.state !== State.OFFLINE && this.state !== State.EMERGENCY_SHUTDOWN && this.state !== State.MAINTENANCE) {
            this.addLog(`Coolant state changed to ${state}.`)
            this.coolant = state
        } else if (state === this.coolant) {
            return `The coolant is already ${this.coolant}.`
        } else {
            return "You cannot change the coolant on a reactor that is offline, in maintenance mode, or underwent an emergency shutdown."
        }
    }
}