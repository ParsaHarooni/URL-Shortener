import { Controller, Get, NotFoundException, ParseIntPipe, Query } from '@nestjs/common';
import { VisitsService } from './providers/visits.service';
import { ApiOperation, ApiParam, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';

/**
 * Controller for getting visits data.
 * @class VisitsController
 * @extends {VisitsService}
 * @example
 * const visitsController = new VisitsController();
 * visitsController.getVisits(1);
 */
@ApiTags('Vists Data')
@Controller('visits')
export class VisitsController {
    /**
     * Creates an instance of VisitsController.
     * @param {VisitsService} visitsService - The VisitsService instance.
     * @memberof VisitsController
     * @example
     * const visitsController = new VisitsController();
     * visitsController.getVisits(1);
     */
    constructor(
        private readonly visitsService: VisitsService,
    ) {}

    /**
     * Gets the number of visits and the unique IP addresses and user agents for a given link.
     * @param {number} linkId - ID of the link.
     * @returns {Promise<object>} Number of visits and unique IP addresses and user agents for a given link.
     * @throws {NotFoundException} If the link is not found.
     * @route GET /visits/data
     */
    @ApiOperation({ summary: 'Get the number of visits and unique IP addresses and user agents for a given link' })
    @ApiQuery({ name: 'linkId', description: 'ID of the link' })
    @ApiResponse({ status: 200, description: 'Number of visits and unique IP addresses and user agents for a given link' })
    @ApiResponse({ status: 404, description: 'Link not found' })
    @Get('data')
    async getVisits(@Query('linkId', ParseIntPipe) linkId: number) {
        const visits = await this.visitsService.getVisits(linkId);
        if (!visits) {
            throw new NotFoundException('Link not found');
        }
        return visits;
    }
}
