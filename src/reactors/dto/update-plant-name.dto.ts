import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsString } from 'class-validator'

export class UpdatePlantName {
    @ApiProperty({
        name: 'name',
        type: 'string',
        description: 'The name you want to change your power plant to be.',
        example: 'My Nuclear Power Plant',
        required: true,
    })
    @IsNotEmpty()
    @IsString()
    name: string
}
