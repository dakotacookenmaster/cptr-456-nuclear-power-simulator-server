import { ApiProperty } from "@nestjs/swagger"
import { IsArray, IsNotEmpty, IsString } from "class-validator"
import { GlobalData } from "./global-data.dto"

export class PlantData {
    @IsArray()
    @IsNotEmpty()
    @ApiProperty({
        name: "reactors",
        type: [GlobalData],
        description: "A list of the reactors in your power plant."
    })
    readonly reactors: GlobalData[] | undefined

    @IsString()
    @IsNotEmpty()
    @ApiProperty({
        name: "plant_name",
        type: "string",
        description: "The name of your power plant."
    })
    readonly plant_name: string | undefined
}