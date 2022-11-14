import { ApiProperty } from "@nestjs/swagger"
import { TempLevel } from "../interfaces/temp-level.interface"

class TemperatureInternal {
    @ApiProperty()
    amount: number

    @ApiProperty({
        enum: ["fahrenheit", "celsius"]
    })
    unit: "fahrenheit" | "celsius"

    @ApiProperty()
    status: TempLevel
}

export class TemperatureDto {
    @ApiProperty()
    temperature: TemperatureInternal
}