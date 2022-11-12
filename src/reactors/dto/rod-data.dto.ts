import { ApiProperty } from '@nestjs/swagger'
import { RodDataInternal } from './rod-data-internal'

export class RodData {
    @ApiProperty({
        name: "control_rods",
        description: "Data about the control rods.",
        type: RodDataInternal,
    })
    control_rods: RodDataInternal
}
