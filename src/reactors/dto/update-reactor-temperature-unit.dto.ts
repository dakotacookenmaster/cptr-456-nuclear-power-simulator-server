import { ApiProperty } from '@nestjs/swagger'
import { IsIn, IsNotEmpty, IsString } from 'class-validator'

export class UpdateReactorTemperatureUnitDto {
    @IsIn(['celsius', 'fahrenheit'])
    @IsString()
    @IsNotEmpty()
    @ApiProperty({
        name: 'unit',
        type: 'string',
        description:
            "The temperature unit you want to display your reactors in. Must be one of 'fahrenheit' or 'celsius'.",
        examples: ['celsius', 'fahrenheit'],
    })
    unit: 'celsius' | 'fahrenheit'
}
