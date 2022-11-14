import { ApiProperty } from "@nestjs/swagger"

export class LogsDto {
    @ApiProperty()
    dynamic_id: string[]
}