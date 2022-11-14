import { ApiProperty } from "@nestjs/swagger";

export class CoolantDataDto {
    @ApiProperty({
        name: "coolant",
        enum: ["on", "off"],
        description: "A description of the reactor's coolant state. One of 'on' or 'off'."
    })
    coolant: "on" | "off"
}