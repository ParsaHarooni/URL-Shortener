import { Controller, Get, NotFoundException, ParseIntPipe, Query } from '@nestjs/common';
import { VisitsService } from './providers/visits.service';
import { ApiOperation, ApiParam, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Vists Data')
@Controller('visits')
export class VisitsController {
    constructor(
        private readonly visitsService: VisitsService,
    ) {}

    @ApiOperation({ summary: 'Get the number of visits and unique IP addresses and user agents for a given link' })
    @ApiQuery({ name: 'linkId', description: 'ID of the link' })
    @ApiResponse({ status: 200, description: 'Number of visits and unique IP addresses and user agents for a given link' })
    @ApiResponse({ status: 404, description: 'Link not found' })
    @Get('data')

    /**
     * Gets the number of visits and the unique IP addresses and user agents for a given link.
     * @param {number} linkId - ID of the link.
     * @returns {Promise<object>} Number of visits and unique IP addresses and user agents for a given link.
     * @throws {NotFoundException} If the link is not found.
     */
    async getVisits(@Query('linkId', ParseIntPipe) linkId: number) {
        const visits = await this.visitsService.getVisits(linkId);
        if (!visits) {
            throw new NotFoundException('Link not found');
        }
        return visits;
    }
}
