import { Body, Controller, Get, HttpException, HttpStatus, NotFoundException, Param, ParseIntPipe, Post, Query, Req, Res } from '@nestjs/common';
import { ShortenerService } from './providers/shortener.service';
import { Request } from 'express';
import { ApiBody, ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ShortenUrlDto } from './dtos/shorten-url.dto';

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
    @ApiBody({ type: ShortenUrlDto, examples: { 
        example: { 
             value: { url: 'https://example.com' } 
        } 
    }})
    @ApiResponse({ status: 200, description: 'Shortened URL' })
    @ApiResponse({ status: 400, description: 'Invalid URL' })
    @Post('shorten')
    public async shorten(@Body() shortenUrlDto: ShortenUrlDto, @Req() request: Request): Promise<object> {  
        try {
            return await this.shortenerService.shorten(shortenUrlDto.url, request);
        } catch (error) {
            console.log(error);
            throw new HttpException('Invalid URL', HttpStatus.BAD_REQUEST, {
                description: error
            });
        }
    }

    /**
     * Gets the short URL for a given link.
     * @summary Get the short URL for a given link
     * @param {number} linkId - The ID of the link.
     * @returns {Promise<string>} The short URL for a given link.
     * @throws {NotFoundException} If the link is not found.
     * @route GET /shortener/data
     */
    @ApiOperation({ summary: 'Get the short URL for a given link' })
    @ApiQuery({ name: 'linkId', description: 'ID of the link', required: true })
    @ApiResponse({ status: 200, description: 'Short URL for a given link' })
    @ApiResponse({ status: 404, description: 'Link not found' })
    @Get('data')
    async getShortUrl(@Query('linkId', ParseIntPipe) linkId: number, @Req() request: Request) {
        const shortUrl = await this.shortenerService.getShortUrl(linkId, request);

        if (shortUrl === null) {
            throw new NotFoundException('Link not found');
            
        }
        return shortUrl;
    }

}
