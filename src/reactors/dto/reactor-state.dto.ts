import { ApiProperty } from "@nestjs/swagger"
import { State } from "../interfaces/state.interface"

export class ReactorStateDto {
    @ApiProperty()
    state: State
}