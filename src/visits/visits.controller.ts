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
    ) { }

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

    /**
     * Gets the visits timeline for a given link.
     * @param {number} linkId - ID of the link.
     * @param {object} filters - Optional time filters (minute, hour, day, month, year).
     * @returns {Promise<object>} Visits timeline for a given link.
     * @throws {NotFoundException} If the link is not found.
     * @route GET /visits/timeline
     */
    @ApiOperation({ summary: 'Get the visits timeline for a given link' })
    @ApiQuery({ name: 'linkId', description: 'ID of the link', required: true })
    @ApiQuery({ name: 'lastYears', description: 'Filter by last n years', required: false })
    @ApiQuery({ name: 'lastMonths', description: 'Filter by last n months', required: false })
    @ApiQuery({ name: 'lastDays', description: 'Filter by last n days', required: false })
    @ApiQuery({ name: 'lastHours', description: 'Filter by last n hours', required: false })
    @ApiQuery({ name: 'lastMinutes', description: 'Filter by last n minutes', required: false })
    @ApiResponse({ status: 200, description: 'Visits timeline for a given link' })
    @ApiResponse({ status: 404, description: 'Link not found' })
    @Get('timeline')
    async getVisitsTimeline(
        @Query('linkId', ParseIntPipe) linkId: number,
        @Query('lastYears', new ParseIntPipe({ optional: true })) lastYears?: number,
        @Query('lastMonths', new ParseIntPipe({ optional: true })) lastMonths?: number,
        @Query('lastDays', new ParseIntPipe({ optional: true })) lastDays?: number,
        @Query('lastHours', new ParseIntPipe({ optional: true })) lastHours?: number,
        @Query('lastMinutes', new ParseIntPipe({ optional: true })) lastMinutes?: number
    ) {
        const filters = { lastYears, lastMonths, lastDays, lastHours, lastMinutes };
        const visitsTimeline = await this.visitsService.getVisitsTimeline(linkId, filters);

        if (visitsTimeline === null) {
            throw new NotFoundException('Link not found');
        }

        if (visitsTimeline.length === 0) {
            return { message: 'No visits found for this link', data: [] };
        }

        return visitsTimeline;
    }
}
