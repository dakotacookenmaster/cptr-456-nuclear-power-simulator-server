import {
    MiddlewareConsumer,
    Module,
    NestModule,
    RequestMethod,
} from '@nestjs/common'
import { METHODS } from 'http'
import { apiCheck } from './api-check.middleware'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { ReactorsModule } from './reactors/reactors.module'

@Module({
    imports: [ReactorsModule],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        consumer
            .apply(apiCheck)
            .exclude({ path: 'api', method: RequestMethod.GET })
            .forRoutes({ path: '*', method: RequestMethod.ALL })
    }
}
