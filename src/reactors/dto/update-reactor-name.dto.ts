import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsString } from 'class-validator'

export class UpdateReactorNameDto {
    @IsString()
    @IsNotEmpty()
    @ApiProperty({
        name: 'name',
        type: 'string',
        description: 'The name you want to update your reactor to be.',
        example: 'My Reactor',
    })
    name: string
}
