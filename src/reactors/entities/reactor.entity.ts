import { State } from '../interfaces/state.interface'
import { v4 as uuid } from 'uuid'
import { TempLevel } from '../interfaces/temp-level.interface'
import { GlobalData } from '../dto/global-data.dto'
import { Logger } from '@nestjs/common/services'

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
        } else {
            // Handle Fuel Changes
            const randomFuelDrop = Math.random()
            if (this.fuel.percentage - randomFuelDrop >= 0) {
                this.fuel.percentage -= randomFuelDrop
            } else {
                this.fuel.percentage = 0
                this.state = State.OFFLINE
                this.addLog('Reactor shut down due to lack of fuel.')
            }
            // Handle Temperature Changes
            if (this.coolant === 'on') {
                if (this.temperature.unit === 'celsius') {
                    this.temperature.amount =
                        22.22222 + this.control_rods.out * 2.45168 +
                        Math.random() * 10
                } else {
                    this.temperature.amount =
                        72 + this.control_rods.out * 2.45168 * 1.8 +
                        Math.random() * 10 * 1.8
                }
            } else {
                this.temperature.amount += Math.random() * 20
            }

            // Handle Temperature Level Changes
            if (this.temperature.amount <= this.MAX_SAFE_TEMP) {
                this.temperature.status = TempLevel.SAFE
            } else if (this.temperature.amount <= this.CAUTION_TEMP) {
                this.temperature.status = TempLevel.CAUTION
            } else if (this.temperature.amount <= this.DANGER_TEMP) {
                this.temperature.status = TempLevel.DANGER
            } else if (this.temperature.amount <= this.MELTDOWN_TEMP + 50) {
                this.temperature.status = TempLevel.MELTDOWN
            } else {
                this.temperature.status = TempLevel.MELTDOWN
                if (this.state !== State.EMERGENCY_SHUTDOWN) {
                    this.state = State.EMERGENCY_SHUTDOWN
                    this.addLog(
                        'Emergency shutdown mode automatically activated!',
                    )
                }
            }

            // Handle Output Changes
            this.output.amount = this.control_rods.out * 3.98

            if (this.state === State.EMERGENCY_SHUTDOWN) {
                if (this.control_rods.in !== 300) {
                    this.dropControlRods(35)
                }

                if (this.coolant !== 'on') {
                    this.coolant = 'on'
                    this.addLog(
                        'Coolant was enabled due to Emergency shutdown mode.',
                    )
                }
            }
        }
    }

    raiseControlRods(amount: number) {
        if (this.control_rods.in - amount >= 0) {
            this.control_rods.in -= amount
            this.control_rods.out += amount

            this.addLog(
                `${amount} control rods were raised. ${
                    (this.control_rods.in / 300) * 100
                }% of the control rods are now lowered.`,
            )
        }
    }

    dropControlRods(amount: number) {
        if (this.control_rods.in + amount <= 300) {
            this.control_rods.in += amount
            this.control_rods.out -= amount
            this.addLog(
                `${amount} control rods were lowered. ${
                    (this.control_rods.in / 300) * 100
                }% of the control rods are now lowered.`,
            )
        } else {
            if (this.control_rods.in !== 300) {
                this.addLog(
                    `${
                        300 - this.control_rods.in
                    } control rods were lowered. 100% of the control rods are now lowered.`,
                )
            }
            this.control_rods.in = 300
            this.control_rods.out = 0
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
            `${new Date().toISOString()}: The following event occurred on ${
                this.name
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
                console.log("AFTER:", this.temperature.amount)
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
        this.state = State.OFFLINE
    }

    enableMaintenanceMode() {
        this.state = State.MAINTENANCE
    }

    emergencyShutdown() {
        this.state = State.EMERGENCY_SHUTDOWN
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
            return false
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
        if (this.coolant !== state) {
            this.addLog(`Coolant state changed to ${state}.`)
            this.coolant = state
        }
    }
}
