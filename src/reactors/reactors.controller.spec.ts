import { Test, TestingModule } from '@nestjs/testing'
import { ReactorsController } from './reactors.controller'
import { ReactorsService } from './reactors.service'

describe('ReactorsController', () => {
    let controller: ReactorsController

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [ReactorsController],
            providers: [ReactorsService],
        }).compile()

        controller = module.get<ReactorsController>(ReactorsController)
    })

    it('should be defined', () => {
        expect(controller).toBeDefined()
    })
})
