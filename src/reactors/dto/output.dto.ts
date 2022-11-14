import { ApiProperty } from "@nestjs/swagger"

class OutputInternal {
    @ApiProperty()
    amount: number

    @ApiProperty({
        enum: ["Megawatt (MW)", "Gigawatt (GW)"]
    })
    unit: "Megawatt (MW)" | "Gigawatt (GW)"
}

export class OutputDto {
    @ApiProperty()
    output: OutputInternal
}