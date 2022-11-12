import {
    Controller,
    Get,
    Param,
    Req,
    Put,
    NotFoundException,
    Post,
    Body,
    BadRequestException,
} from '@nestjs/common'
import {
    ApiBadRequestResponse,
    ApiBearerAuth,
    ApiCreatedResponse,
    ApiNotFoundResponse,
    ApiOkResponse,
    ApiOperation,
    ApiParam,
    ApiTags,
} from '@nestjs/swagger'
import { PlantData } from './dto/plant-data.dto'
import { RodData } from './dto/rod-data.dto'
import { UpdatePlantName } from './dto/update-plant-name.dto'
import { UpdateReactorCoolant } from './dto/update-reactor-coolant.dto'
import { UpdateReactorNameDto } from './dto/update-reactor-name.dto'
import { UpdateReactorTemperatureUnitDto } from './dto/update-reactor-temperature-unit.dto'
import { ReactorsService } from './reactors.service'

@ApiTags('Reactors')
@ApiBearerAuth()
@Controller('reactors')
export class ReactorsController {
    constructor(private readonly reactorsService: ReactorsService) {}

    @ApiOperation({
        summary:
            'This method will provide you with generic information about your power plant.',
    })
    @ApiOkResponse({
        type: PlantData,
        description: 'This is returned when the operation was successful.',
    })
    @Get()
    findAll(@Req() request: any): PlantData {
        return this.reactorsService.findAll(request.user.key)
    }

    @ApiOperation({
        summary:
            'This method will provide you with temperature information for a particular reactor.',
    })
    @ApiParam({
        required: true,
        name: 'id',
        type: 'string',
        description: 'The ID of the reactor you wish to access.',
    })
    @ApiOkResponse({
        description: 'This is returned when the request was successful.',
    })
    @ApiNotFoundResponse({
        description:
            'This is returned when a reactor with the requested ID could not be found.',
    })
    @Get('temperature/:id')
    findTemperatureOfOne(@Req() request: any, @Param('id') id: string) {
        const result = this.reactorsService.findTemperatureOfOne(
            request.user.key,
            id,
        )
        if (!result) {
            throw new NotFoundException(
                'A reactor with that ID could not be found.',
            )
        } else {
            return result
        }
    }

    @ApiOperation({
        summary:
            'This method will provide you with coolant information for a particular reactor.',
    })
    @ApiParam({
        required: true,
        name: 'id',
        type: 'string',
        description: 'The ID of the reactor you wish to access.',
    })
    @ApiOkResponse({
        description: 'This is returned when the request was successful.',
    })
    @Get('coolant/:id')
    findCoolantOfOne(@Req() request: any, @Param('id') id: string) {
        const result = this.reactorsService.findCoolantOfOne(
            request.user.key,
            id,
        )
        if (!result) {
            throw new NotFoundException('A reactor with that ID was not found.')
        } else {
            return result
        }
    }

    @ApiOperation({
        summary:
            'This method provides power output information for a particular reactor.',
    })
    @ApiParam({
        required: true,
        name: 'id',
        type: 'string',
        description: 'The ID of the reactor you wish to access.',
    })
    @ApiOkResponse({
        description: 'This is returned when the request was successful.',
    })
    @Get('output/:id')
    findOutputOfOne(@Req() request: any, @Param('id') id: string) {
        const result = this.reactorsService.findOutputOfOne(
            request.user.key,
            id,
        )
        if (!result) {
            throw new NotFoundException('A reactor with that ID was not found.')
        } else {
            return result
        }
    }

    @ApiOperation({
        summary:
            'This method allows you to change the temperature unit for a particular reactor.',
    })
    @ApiCreatedResponse({
        description: 'This is returned when the request was successful.',
    })
    @Post('temperature')
    setTemperatureUnit(
        @Req() request: any,
        @Body() body: UpdateReactorTemperatureUnitDto,
    ) {
        this.reactorsService.changeTemperatureUnit(request.user.key, body.unit)
    }

    @ApiOperation({
        summary:
            'This method allows you to get the logs for all of your reactors.',
    })
    @ApiOkResponse({
        description: 'This is returned when the request was successful.',
    })
    @Get('logs')
    getLogs(@Req() request: any) {
        return this.reactorsService.getLogs(request.user.key)
    }

    @ApiOperation({
        summary:
            'This method allows you to get the fuel level for a particular reactor.',
    })
    @ApiParam({
        required: true,
        name: 'id',
        type: 'string',
        description: 'The ID of the reactor you wish to access.',
    })
    @ApiOkResponse({
        description: 'This is returned when the request was successful.',
    })
    @Get('fuel-level/:id')
    getReactorFuelLevels(@Req() request: any, @Param('id') id: string) {
        return this.reactorsService.getReactorFuelLevels(request.user.key, id)
    }

    @ApiOperation({
        summary:
            'This method allows you to get the state a particular reactor.',
    })
    @ApiParam({
        required: true,
        name: 'id',
        type: 'string',
        description: 'The ID of the reactor you wish to access.',
    })
    @ApiOkResponse({
        description: 'This is returned when the request was successful.',
    })
    @Get('reactor-state/:id')
    getReactorState(@Req() request: any, @Param('id') id: string) {
        const result = this.reactorsService.getReactorState(
            request.user.key,
            id,
        )
        if (!result) {
            throw new NotFoundException('A reactor with that ID was not found.')
        } else {
            return result
        }
    }

    @ApiOperation({
        summary:
            'This method allows you to get the rod state for a particular reactor.',
    })
    @ApiParam({
        required: true,
        name: 'id',
        type: 'string',
        description: 'The ID of the reactor you wish to access.',
    })
    @ApiOkResponse({
        description: 'This is returned when the request was successful.',
        type: RodData,
    })
    @Get('rod-state/:id')
    getRodState(@Req() request: any, @Param('id') id: string) {
        return this.reactorsService.getRodState(request.user.key, id)
    }

    @ApiOperation({
        summary:
            'This method allows you to set the name for a particular reactor.',
    })
    @ApiParam({
        required: true,
        name: 'id',
        type: 'string',
        description: 'The ID of the reactor you wish to access.',
    })
    @ApiBadRequestResponse({
        description:
            "This is returned when the request doesn't contain the necessary information to update the Reactor's name.",
    })
    @ApiOkResponse({
        description: 'This is returned when the request was successful.',
    })
    @Put('set-reactor-name/:id')
    setName(
        @Req() request: any,
        @Param('id') id: string,
        @Body() body: UpdateReactorNameDto,
    ) {
        this.reactorsService.setReactorName(request.user.key, id, body.name)
    }

    @ApiOperation({
        summary:
            'This method allows you to drop a rod for a particular reactor.',
    })
    @ApiParam({
        required: true,
        name: 'id',
        type: 'string',
        description: 'The ID of the reactor you wish to access.',
    })
    @ApiBadRequestResponse({
        description:
            "This is returned when the request doesn't contain the necessary information to drop a Reactor's rod.",
    })
    @ApiCreatedResponse({
        description: 'This is returned when the request was successful.',
    })
    @Post('drop-rod/:id')
    dropControlRod(@Req() request: any, @Param('id') id: string) {
        this.reactorsService.dropControlRod(request.user.key, id)
    }

    @ApiOperation({
        summary:
            'This method allows you to raise a rod for a particular reactor.',
    })
    @ApiParam({
        required: true,
        name: 'id',
        type: 'string',
        description: 'The ID of the reactor you wish to access.',
    })
    @ApiBadRequestResponse({
        description:
            "This is returned when the request doesn't contain the necessary information to raise a Reactor's rod.",
    })
    @ApiCreatedResponse({
        description: 'This is returned when the request was successful.',
    })
    @Post('raise-rod/:id')
    raiseControlRod(@Req() request: any, @Param('id') id: string) {
        this.reactorsService.raiseControlRod(request.user.key, id)
    }

    @ApiOperation({
        summary:
            'This method allows you to force a particular reactor into an emergency shutdown.',
    })
    @ApiParam({
        required: true,
        name: 'id',
        type: 'string',
        description: 'The ID of the reactor you wish to access.',
    })
    @ApiBadRequestResponse({
        description:
            "This is returned when the request doesn't contain the necessary information to force the Reactor into an emergency shutdown.",
    })
    @ApiCreatedResponse({
        description: 'This is returned when the request was successful.',
    })
    @Post('emergency-shutdown/:id')
    emergencyShutdown(@Req() request: any, @Param('id') id: string) {
        this.reactorsService.emergencyShutdown(request.user.key, id)
    }

    @ApiOperation({
        summary:
            'This method allows you to force a particular reactor into a controlled shutdown.',
    })
    @ApiParam({
        required: true,
        name: 'id',
        type: 'string',
        description: 'The ID of the reactor you wish to access.',
    })
    @ApiBadRequestResponse({
        description:
            "This is returned when the request doesn't contain the necessary information to force a Reactor into a controlled shutdown.",
    })
    @ApiCreatedResponse({
        description: 'This is returned when the request was successful.',
    })
    @Post('controlled-shutdown/:id')
    controlledShutdown(@Req() request: any, @Param('id') id: string) {
        this.reactorsService.controlledShutdown(request.user.key, id)
    }

    @ApiOperation({
        summary:
            'This method allows you to force a particular reactor into maintenance mode.',
    })
    @ApiParam({
        required: true,
        name: 'id',
        type: 'string',
        description: 'The ID of the reactor you wish to access.',
    })
    @ApiBadRequestResponse({
        description:
            "This is returned when the request doesn't contain the necessary information to put the Reactor into Maintenance Mode.",
    })
    @ApiCreatedResponse({
        description: 'This is returned when the request was successful.',
    })
    @Post('maintenance/:id')
    enableMainteanceMode(@Req() request: any, @Param('id') id: string) {
        this.reactorsService.enableMaintenanceMode(request.user.key, id)
    }

    @ApiOperation({
        summary: 'This method allows you to refuel a particular reactor.',
    })
    @ApiParam({
        required: true,
        name: 'id',
        type: 'string',
        description: 'The ID of the reactor you wish to access.',
    })
    @ApiBadRequestResponse({
        description:
            "This is returned when the request doesn't contain the necessary information to refuel the Reactor.",
    })
    @ApiCreatedResponse({
        description: 'This is returned when the request was successful.',
    })
    @Post('refuel/:id')
    refuel(@Req() request: any, @Param('id') id: string) {
        if (!this.reactorsService.refuel(request.user.key, id)) {
            throw new BadRequestException(
                "A reactor cannot be refuelled unless it's in maintenance mode.",
            )
        }
    }

    @ApiOperation({
        summary: 'This method allows you to reset all of your reactors.',
    })
    @ApiCreatedResponse({
        description: 'This is returned when the request was successful.',
    })
    @Post('reset')
    reset(@Req() request: any) {
        this.reactorsService.reset(request.user.key)
    }

    @ApiOperation({
        summary: 'This method allows you to start a particular reactor.',
    })
    @ApiParam({
        required: true,
        name: 'id',
        type: 'string',
        description: 'The ID of the reactor you wish to access.',
    })
    @ApiBadRequestResponse({
        description:
            "This is returned when the request doesn't contain the necessary information to start the Reactor.",
    })
    @ApiCreatedResponse({
        description: 'This is returned when the request was successful.',
    })
    @Post('start-reactor/:id')
    startReactor(@Req() request: any, @Param('id') id: string) {
        const returnedError = this.reactorsService.startReactor(
            request.user.key,
            id,
        )
        if (returnedError) {
            throw new BadRequestException(returnedError)
        }
    }

    @ApiOperation({
        summary:
            'This method allows you to change the coolant state for a particular power plant.',
    })
    @ApiParam({
        required: true,
        name: 'id',
        type: 'string',
        description: 'The ID of the reactor you wish to access.',
    })
    @ApiBadRequestResponse({
        description:
            "This is returned when the request doesn't contain the necessary information to update the Reactor's coolant state.",
    })
    @ApiCreatedResponse({
        description: 'This is returned when the request was successful.',
    })
    @Post('coolant/:id')
    setCoolantState(
        @Req() request: any,
        @Param('id') id: string,
        @Body() body: UpdateReactorCoolant,
    ) {
        this.reactorsService.setCoolantState(request.user.key, id, body.coolant)
    }

    @ApiOperation({
        summary:
            'This method allows you to change the name of your power plant.',
    })
    @ApiBadRequestResponse({
        description:
            "This is returned when the request doesn't contain the necessary information to update the simulator's Nuclear Plant name.",
    })
    @ApiOkResponse({
        description:
            'This is returned when the request was handled successfully.',
    })
    @Put('plant-name')
    setPlantName(@Req() request: any, @Body() body: UpdatePlantName) {
        this.reactorsService.setPlantName(request.user.key, body.name)
    }
}
