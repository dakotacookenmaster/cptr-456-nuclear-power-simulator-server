import {
    Controller,
    Get,
    Param,
    Req,
    NotFoundException
} from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { ReactorsService } from './reactors.service'

@ApiTags("Reactors")
@Controller('reactors')
export class ReactorsController {
    constructor(private readonly reactorsService: ReactorsService) { }

    @Get()
    findAll(@Req() request: any) {
        return this.reactorsService.findAll(request.user.key)
    }

    @Get('/temperature/:id')
    findTemperatureOfOne(@Req() request: any, @Param('id') id: string) {
        const result = this.reactorsService.findTemperatureOfOne(request.user.key, id)
        if (!result) {
            throw new NotFoundException("A reactor with that ID could not be found.")
        } else {
            return result
        }
    }

    @Get('/coolant/:id')
    findCoolantOfOne(@Req() request: any, @Param('id') id: string) {
        const result = this.reactorsService.findCoolantOfOne(request.user.key, id)
        if (!result) {
            throw new NotFoundException("A reactor with that ID was not found.")
        } else {
            return result
        }
    }
}
