import { Test, TestingModule } from '@nestjs/testing'
import { ReactorsService } from './reactors.service'

describe('ReactorsService', () => {
  let service: ReactorsService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ReactorsService],
    }).compile()

    service = module.get<ReactorsService>(ReactorsService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
