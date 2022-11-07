import {
    Controller,
    Get,
    Param,
    Req,
    NotFoundException,
    Post,
    Body,
    BadRequestException,
} from '@nestjs/common'
import { ApiBadRequestResponse, ApiCreatedResponse, ApiOkResponse, ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger'
import { GlobalData } from './dto/global-data.dto'
import { PlantData } from './dto/plant-data.dto'
import { UpdatePlantName } from './dto/update-plant-name.dto'
import { UpdateReactorCoolant } from './dto/update-reactor-coolant.dto'
import { UpdateReactorNameDto } from './dto/update-reactor-name.dto'
import { UpdateReactorTemperatureUnitDto } from './dto/update-reactor-temperature-unit.dto'
import { ReactorsService } from './reactors.service'

@ApiTags('Reactors')
@Controller('reactors')
export class ReactorsController {
    constructor(private readonly reactorsService: ReactorsService) {}

    @ApiQuery({
        required: true,
        name: 'apiKey',
        type: 'string',
        description: 'The API key provided to you to access your power plant.',
    })
    @ApiOkResponse({
        type: PlantData,
        description: "Returns some generic data about the power plant."
    })
    @Get()
    findAll(@Req() request: any): PlantData {
        return this.reactorsService.findAll(request.user.key)
    }

    @ApiQuery({
        required: true,
        name: 'apiKey',
        type: 'string',
        description: 'The API key provided to you to access your power plant.',
    })
    @ApiParam({
        required: true,
        name: 'id',
        type: 'string',
        description: 'The ID of the reactor you wish to access.',
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

    @ApiQuery({
        required: true,
        name: 'apiKey',
        type: 'string',
        description: 'The API key provided to you to access your power plant.',
    })
    @ApiParam({
        required: true,
        name: 'id',
        type: 'string',
        description: 'The ID of the reactor you wish to access.',
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

    @ApiQuery({
        required: true,
        name: 'apiKey',
        type: 'string',
        description: 'The API key provided to you to access your power plant.',
    })
    @ApiParam({
        required: true,
        name: 'id',
        type: 'string',
        description: 'The ID of the reactor you wish to access.',
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

    @ApiQuery({
        required: true,
        name: 'apiKey',
        type: 'string',
        description: 'The API key provided to you to access your power plant.',
    })
    @Post('temperature')
    setTemperatureUnit(
        @Req() request: any,
        @Body() body: UpdateReactorTemperatureUnitDto,
    ) {
        this.reactorsService.changeTemperatureUnit(request.user.key, body.unit)
    }

    @ApiQuery({
        required: true,
        name: 'apiKey',
        type: 'string',
        description: 'The API key provided to you to access your power plant.',
    })
    @Get('logs')
    getLogs(@Req() request: any) {
        return this.reactorsService.getLogs(request.user.key)
    }

    @ApiQuery({
        required: true,
        name: 'apiKey',
        type: 'string',
        description: 'The API key provided to you to access your power plant.',
    })
    @ApiParam({
        required: true,
        name: 'id',
        type: 'string',
        description: 'The ID of the reactor you wish to access.',
    })
    @Get('fuel-level/:id')
    getReactorFuelLevels(@Req() request: any, @Param('id') id: string) {
        return this.reactorsService.getReactorFuelLevels(request.user.key, id)
    }

    @ApiQuery({
        required: true,
        name: 'apiKey',
        type: 'string',
        description: 'The API key provided to you to access your power plant.',
    })
    @ApiParam({
        required: true,
        name: 'id',
        type: 'string',
        description: 'The ID of the reactor you wish to access.',
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

    @ApiQuery({
        required: true,
        name: 'apiKey',
        type: 'string',
        description: 'The API key provided to you to access your power plant.',
    })
    @ApiParam({
        required: true,
        name: 'id',
        type: 'string',
        description: 'The ID of the reactor you wish to access.',
    })
    @Get('rod-state/:id')
    getRodState(@Req() request: any, @Param('id') id: string) {
        return this.reactorsService.getRodState(request.user.key, id)
    }

    @ApiQuery({
        required: true,
        name: 'apiKey',
        type: 'string',
        description: 'The API key provided to you to access your power plant.',
    })
    @ApiParam({
        required: true,
        name: 'id',
        type: 'string',
        description: 'The ID of the reactor you wish to access.',
    })
    @Post('set-reactor-name/:id')
    setName(
        @Req() request: any,
        @Param('id') id: string,
        @Body() body: UpdateReactorNameDto,
    ) {
        this.reactorsService.setReactorName(request.user.key, id, body.name)
    }

    @ApiQuery({
        required: true,
        name: 'apiKey',
        type: 'string',
        description: 'The API key provided to you to access your power plant.',
    })
    @ApiParam({
        required: true,
        name: 'id',
        type: 'string',
        description: 'The ID of the reactor you wish to access.',
    })
    @Post('drop-rod/:id')
    dropControlRod(@Req() request: any, @Param('id') id: string) {
        this.reactorsService.dropControlRod(request.user.key, id)
    }

    @ApiQuery({
        required: true,
        name: 'apiKey',
        type: 'string',
        description: 'The API key provided to you to access your power plant.',
    })
    @ApiParam({
        required: true,
        name: 'id',
        type: 'string',
        description: 'The ID of the reactor you wish to access.',
    })
    @Post('emergency-shutdown/:id')
    emergencyShutdown(@Req() request: any, @Param('id') id: string) {
        this.reactorsService.emergencyShutdown(request.user.key, id)
    }

    @ApiQuery({
        required: true,
        name: 'apiKey',
        type: 'string',
        description: 'The API key provided to you to access your power plant.',
    })
    @ApiParam({
        required: true,
        name: 'id',
        type: 'string',
        description: 'The ID of the reactor you wish to access.',
    })
    @Post('controlled-shutdown/:id')
    controlledShutdown(@Req() request: any, @Param('id') id: string) {
        this.reactorsService.controlledShutdown(request.user.key, id)
    }

    @ApiQuery({
        required: true,
        name: 'apiKey',
        type: 'string',
        description: 'The API key provided to you to access your power plant.',
    })
    @ApiParam({
        required: true,
        name: 'id',
        type: 'string',
        description: 'The ID of the reactor you wish to access.',
    })
    @Post('maintenance/:id')
    enableMainteanceMode(@Req() request: any, @Param('id') id: string) {
        this.reactorsService.enableMaintenanceMode(request.user.key, id)
    }

    @ApiQuery({
        required: true,
        name: 'apiKey',
        type: 'string',
        description: 'The API key provided to you to access your power plant.',
    })
    @ApiParam({
        required: true,
        name: 'id',
        type: 'string',
        description: 'The ID of the reactor you wish to access.',
    })
    @Post('refuel/:id')
    refuel(@Req() request: any, @Param('id') id: string) {
        if (!this.reactorsService.refuel(request.user.key, id)) {
            throw new BadRequestException(
                "A reactor cannot be refuelled unless it's in maintenance mode.",
            )
        }
    }

    @ApiQuery({
        required: true,
        name: 'apiKey',
        type: 'string',
        description: 'The API key provided to you to access your power plant.',
    })
    @Post('reset')
    reset(@Req() request: any) {
        this.reactorsService.reset(request.user.key)
    }

    @ApiQuery({
        required: true,
        name: 'apiKey',
        type: 'string',
        description: 'The API key provided to you to access your power plant.',
    })
    @ApiParam({
        required: true,
        name: 'id',
        type: 'string',
        description: 'The ID of the reactor you wish to access.',
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

    @ApiQuery({
        required: true,
        name: 'apiKey',
        type: 'string',
        description: 'The API key provided to you to access your power plant.',
    })
    @ApiParam({
        required: true,
        name: 'id',
        type: 'string',
        description: 'The ID of the reactor you wish to access.',
    })
    @ApiBadRequestResponse({
        description: "This is returned when the request doesn't contain the necessary information to update the Reactor's coolant state."
    })
    @Post('coolant/:id')
    setCoolantState(
        @Req() request: any,
        @Param('id') id: string,
        @Body() body: UpdateReactorCoolant,
    ) {
        this.reactorsService.setCoolantState(request.user.key, id, body.coolant)
    }

    @ApiQuery({
        required: true,
        name: 'apiKey',
        type: 'string',
        description: 'The API key provided to you to access your power plant.',
    })
    @ApiBadRequestResponse({
        description: "This is returned when the request doesn't contain the necessary information to update the simulator's Nuclear Plant name."
    })
    @ApiCreatedResponse({
        description: "This is returned when the request was handled successfully."
    })
    @Post('plant-name')
    setPlantName(@Req() request: any, @Body() body: UpdatePlantName) {
        this.reactorsService.setPlantName(request.user.key, body.name)
    }
}
