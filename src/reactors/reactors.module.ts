import { Module } from '@nestjs/common'
import { ReactorsService } from './reactors.service'
import { ReactorsController } from './reactors.controller'

@Module({
    controllers: [ReactorsController],
    providers: [ReactorsService],
})
export class ReactorsModule {}
