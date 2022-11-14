import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsString, IsIn } from 'class-validator'

export class UpdateReactorCoolant {
    @ApiProperty({
        name: 'coolant',
        enum: ["on", "off"],
        description:
            "The state you want to change the power plant's coolant to. Must be one of 'on' or 'off'.",
        required: true,
    })
    @IsNotEmpty()
    @IsString()
    @IsIn(['on', 'off'])
    coolant: 'on' | 'off'
}
