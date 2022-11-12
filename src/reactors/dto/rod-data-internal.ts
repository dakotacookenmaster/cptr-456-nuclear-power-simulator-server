import { ApiProperty } from '@nestjs/swagger'

export class RodDataInternal {
    @ApiProperty({
        name: 'in',
        description:
            'The number of rods that are currently dropped into reaction chamber.',
        type: 'number',
        example: 180,
    })
    in: number

    @ApiProperty({
        name: 'out',
        description:
            'The number of rods that are currently raised out of the reaction chamber.',
        type: 'number',
        example: 120,
    })
    out: number
}
