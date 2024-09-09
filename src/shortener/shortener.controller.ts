import { Controller, Get, HttpException, HttpStatus, Param, Query, Req, Res } from '@nestjs/common';
import { ShortenerService } from './providers/shortener.service';
import { Request } from 'express';
import { ApiOperation, ApiParam, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';

/**
 * Controller for shortening URLs.
 * @class ShortenerController
 * @extends {ShortenerService}
 * @example
 * const shortenerController = new ShortenerController();
 * shortenerController.shorten('https://example.com', { headers: { host: 'localhost:3000' } });
 */

@ApiTags('Shortener')
@Controller('shortener')
export class ShortenerController {
    constructor(
        private readonly shortenerService: ShortenerService,
    ) {}

    /**
     * Shortens a given URL.
     * @summary Shorten a URL
     * @param {string} url - The URL to shorten.
     * @param {Request} request - The request object.
     * @returns {Promise<string>} The shortened URL.
     * @throws {HttpException} If the URL is invalid.
     */
        @ApiOperation({ summary: 'Shorten a URL' })
        @ApiQuery({ name: 'url', description: 'URL to shorten' })
        @ApiResponse({ status: 200, description: 'Shortened URL' })
        @ApiResponse({ status: 400, description: 'Invalid URL' })
        @Get('shorten')
        public async shorten(@Query('url') url: string, @Req() request: Request): Promise<object> {  
            try {
                return await this.shortenerService.shorten(url, request);
            } catch (error) {
                console.log(error);
                throw new HttpException('Invalid URL', HttpStatus.BAD_REQUEST, {
                    description: error
                });
            }
        }

}
