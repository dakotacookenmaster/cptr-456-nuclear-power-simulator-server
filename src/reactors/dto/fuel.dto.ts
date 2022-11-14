import { ApiProperty } from "@nestjs/swagger"

class FuelInternal {
    @ApiProperty()
    percentage: number
}

export class FuelDto {
    @ApiProperty()
    fuel: FuelInternal
}