import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger'
import * as dotenv from 'dotenv'

dotenv.config()

async function bootstrap() {
    const app = await NestFactory.create(AppModule)
    app.enableCors()

    const config = new DocumentBuilder()
        .setTitle('Nuclear Power Plant Simulator API')
        .setDescription(
            'A RESTful API designed to support virtual nuclear power plants.',
        )
        .setVersion('0.0.1')
        .build()

    const document = SwaggerModule.createDocument(app, config)
    SwaggerModule.setup('api', app, document)

    const SERVER_PORT = process.env.SERVER_PORT ?? 3000

    await app.listen(SERVER_PORT)

    console.log('Server started on port:', SERVER_PORT)
}

bootstrap()
