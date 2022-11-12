import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsString } from 'class-validator'

export class GlobalData {
    @IsString()
    @IsNotEmpty()
    @ApiProperty({
        name: 'id',
        type: 'string',
        description: "The nuclear reactor's ID.",
    })
    id: string

    @IsString()
    @IsNotEmpty()
    @ApiProperty({
        name: 'name',
        type: 'string',
        description: "The nuclear reactor's name.",
    })
    name: string
}
