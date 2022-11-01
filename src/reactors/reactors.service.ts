import { Injectable } from '@nestjs/common'
import { UpdateReactorDto } from './dto/update-reactor.dto'
import { Reactor } from './entities/reactor.entity'
import { State } from './interfaces/state.interface'

@Injectable()
export class ReactorsService {
    userNuclearPlants = new Map<
        string,
        {
            reactors: Reactor[]
        }
    >()

    addIfVoid(key: string) {
        if (!(this.userNuclearPlants.has(key))) {
            this.userNuclearPlants.set(key, {
                reactors: [
                    new Reactor(
                        'Reactor 1',
                        'on',
                        { in: 182, out: 118 },
                        { amount: 289.29824, unit: 'celsius' },
                        { amount: 469.64, unit: 'Megawatt (MW)' },
                        State.ACTIVE,
                        [],
                    ),
                    new Reactor(
                        'Reactor 2',
                        'on',
                        { in: 4, out: 296 },
                        { amount: 725.69728, unit: 'celsius' },
                        { amount: 1178.08, unit: 'Megawatt (MW)' },
                        State.ACTIVE,
                        [],
                    ),
                    new Reactor(
                        'Reactor 3',
                        'off',
                        { in: 300, out: 0 },
                        { amount: 0, unit: 'celsius' },
                        { amount: 0, unit: 'Megawatt (MW)' },
                        State.OFFLINE,
                        [],
                    ),
                    new Reactor(
                        'Reactor 4',
                        'on',
                        { in: 287, out: 13 },
                        { amount: 31.87184, unit: 'celsius' },
                        { amount: 51.74, unit: 'Megawatt (MW)' },
                        State.ACTIVE,
                        [],
                    ),
                ],
            })
        }
    }

    findAll(key: string) {
        this.addIfVoid(key)
        return this.userNuclearPlants.get(key)?.reactors.map(reactor => reactor.getGlobalData())
    }

    findTemperatureOfOne(key: string, id: string) {
        this.addIfVoid(key)
        return this.userNuclearPlants.get(key)?.reactors.find(item => item.id === id)?.getTemperatureData()
    }

    findCoolantOfOne(key: string, id: string) {
        this.addIfVoid(key)
        return this.userNuclearPlants.get(key)?.reactors.find(item => item.id === id)?.getCoolantData()
    }
}
