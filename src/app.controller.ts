import { Controller, Get, HttpException, HttpStatus, Param, Req, Res } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';
import { Response, Request } from 'express';

/**
 * Controller for the application.
 * @class AppController
 * @extends {AppService}
 * @example
 * const appController = new AppController();
 * appController.redirect('https://example.com', { headers: { host: 'localhost:3000' } });
 */
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  /**
     * Redirects a shortened URL to its original URL.
     * @summary Redirect a shortened URL to its original URL
     * @param {string} shortUrl - The shortened URL.
     * @param {Response} res - The response object.
     * @returns {Promise<void>}
     * @throws {HttpException} If the link is not found.
     */
  @ApiOperation({ summary: 'Redirect a shortened URL to its original URL' })
  @ApiParam({ name: 'shortUrl', description: 'Shortened URL' })
  @ApiResponse({ status: 302, description: 'Redirection to the original URL' })
  @ApiResponse({ status: 404, description: 'Link not found' })
  @Get(':shortUrl')
  async redirect(@Param('shortUrl') shortUrl: string, @Res() res: Response, @Req() request: Request): Promise<void> {
      try {
          const url = await this.appService.resolve(shortUrl, request);
          return res.redirect(url);
      } catch (error) {
          throw new HttpException('Link not found', HttpStatus.NOT_FOUND);
      }
  }
}
