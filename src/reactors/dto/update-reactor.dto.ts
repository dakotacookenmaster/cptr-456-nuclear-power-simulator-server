import { PartialType } from '@nestjs/swagger'
import { CreateReactorDto } from './create-reactor.dto'

export class UpdateReactorDto extends PartialType(CreateReactorDto) {}
