import { Injectable } from '@nestjs/common'
import { Reactor } from './entities/reactor.entity'
import { State } from './interfaces/state.interface'
import { TempLevel } from './interfaces/temp-level.interface'

@Injectable()
export class ReactorsService {
    userNuclearPlants = new Map<
        string,
        {
            reactors: Reactor[]
            plant_name: string
        }
    >()

    constructor() {
        setInterval(() => {
            this.userNuclearPlants.forEach((value) => {
                console.log(JSON.stringify(value, null, 4))
                value.reactors.forEach((reactor) => reactor.tick())
            })
        }, 2500)
    }

    addIfVoid(key: string) {
        if (!this.userNuclearPlants.has(key)) {
            this.userNuclearPlants.set(key, {
                reactors: [
                    new Reactor(
                        'Reactor 1',
                        'on',
                        { in: 182, out: 118 },
                        {
                            amount: 289.29824,
                            unit: 'celsius',
                            status: TempLevel.SAFE,
                        },
                        { amount: 469.64, unit: 'Megawatt (MW)' },
                        State.ACTIVE,
                        [],
                        { percentage: 93 },
                    ),
                    new Reactor(
                        'Reactor 2',
                        'on',
                        { in: 4, out: 296 },
                        {
                            amount: 725.69728,
                            unit: 'celsius',
                            status: TempLevel.SAFE,
                        },
                        { amount: 1178.08, unit: 'Megawatt (MW)' },
                        State.ACTIVE,
                        [],
                        { percentage: 15 },
                    ),
                    new Reactor(
                        'Reactor 3',
                        'off',
                        { in: 300, out: 0 },
                        { amount: 0, unit: 'celsius', status: TempLevel.SAFE },
                        { amount: 0, unit: 'Megawatt (MW)' },
                        State.OFFLINE,
                        [],
                        { percentage: 42 },
                    ),
                    new Reactor(
                        'Reactor 4',
                        'on',
                        { in: 287, out: 13 },
                        {
                            amount: 31.87184,
                            unit: 'celsius',
                            status: TempLevel.SAFE,
                        },
                        { amount: 51.74, unit: 'Megawatt (MW)' },
                        State.ACTIVE,
                        [],
                        { percentage: 28 },
                    ),
                ],
                plant_name: `My Nuclear Power Plant`,
            })
        }
    }

    findAll(key: string) {
        this.addIfVoid(key)
        return {
            reactors: this.userNuclearPlants
                .get(key)
                ?.reactors.map((reactor) => reactor.getGlobalData()),
            plant_name: this.userNuclearPlants.get(key)?.plant_name,
        }
    }

    findTemperatureOfOne(key: string, id: string) {
        this.addIfVoid(key)
        return this.userNuclearPlants
            .get(key)
            ?.reactors.find((item) => item.id === id)
            ?.getTemperatureData()
    }

    findCoolantOfOne(key: string, id: string) {
        this.addIfVoid(key)
        return this.userNuclearPlants
            .get(key)
            ?.reactors.find((item) => item.id === id)
            ?.getCoolantData()
    }

    findOutputOfOne(key: string, id: string) {
        this.addIfVoid(key)
        return this.userNuclearPlants
            .get(key)
            ?.reactors.find((item) => item.id === id)
            ?.getOutputData()
    }

    changeTemperatureUnit(key: string, unit: 'celsius' | 'fahrenheit') {
        this.addIfVoid(key)
        return this.userNuclearPlants
            .get(key)
            ?.reactors.forEach((reactor) => reactor.setTemperatureUnit(unit))
    }

    getLogs(key: string) {
        this.addIfVoid(key)
        return this.userNuclearPlants
            .get(key)
            ?.reactors.map((reactor) => ({ [reactor.id]: reactor.getLogs() }))
    }

    setReactorName(key: string, id: string, name: string) {
        this.addIfVoid(key)
        return this.userNuclearPlants
            .get(key)
            ?.reactors.find((item) => item.id === id)
            ?.setReactorName(name)
    }

    getReactorState(key: string, id: string) {
        this.addIfVoid(key)
        return this.userNuclearPlants
            .get(key)
            ?.reactors.find((item) => item.id === id)
            ?.getReactorState()
    }

    getReactorFuelLevels(key: string, id: string) {
        this.addIfVoid(key)
        return this.userNuclearPlants
            .get(key)
            ?.reactors.find((item) => item.id === id)
            ?.getReactorFuelLevels()
    }

    getRodState(key: string, id: string) {
        this.addIfVoid(key)
        return this.userNuclearPlants
            .get(key)
            ?.reactors.find((item) => item.id === id)
            ?.getRodState()
    }

    dropControlRod(key: string, id: string) {
        this.addIfVoid(key)
        return this.userNuclearPlants
            .get(key)
            ?.reactors.find((item) => item.id === id)
            ?.dropControlRods(1)
    }

    setPlantName(key: string, name: string) {
        this.addIfVoid(key)
        const userNuclearPlant = this.userNuclearPlants.get(key)
        if (userNuclearPlant) {
            this.userNuclearPlants.set(key, {
                ...userNuclearPlant,
                plant_name: name,
            })
        }
    }

    startReactor(key: string, id: string) {
        this.addIfVoid(key)
        return this.userNuclearPlants
            .get(key)
            ?.reactors.find((item) => item.id === id)
            ?.startReactor()
    }

    emergencyShutdown(key: string, id: string) {
        this.addIfVoid(key)
        this.userNuclearPlants
            .get(key)
            ?.reactors.find((item) => item.id === id)
            ?.emergencyShutdown()
    }

    controlledShutdown(key: string, id: string) {
        this.addIfVoid(key)
        this.userNuclearPlants
            .get(key)
            ?.reactors.find((item) => item.id === id)
            ?.controlledShutdown()
    }

    refuel(key: string, id: string) {
        this.addIfVoid(key)
        return this.userNuclearPlants
            .get(key)
            ?.reactors.find((item) => item.id === id)
            ?.refuel()
    }

    reset(key: string) {
        this.userNuclearPlants.delete(key)
        this.addIfVoid(key)
    }

    enableMaintenanceMode(key: string, id: string) {
        this.addIfVoid(key)
        this.userNuclearPlants
            .get(key)
            ?.reactors.find((item) => item.id === id)
            ?.enableMaintenanceMode()
    }

    setCoolantState(key: string, id: string, state: 'on' | 'off') {
        this.addIfVoid(key)
        this.userNuclearPlants
            .get(key)
            ?.reactors.find((item) => item.id === id)
            ?.setCoolantState(state)
    }
}
