import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import { Request } from 'express';

/**
 * Service for resolving shortened URLs.
 * @class AppService
 * @extends {PrismaService}
 * @example
 * const appService = new AppService();
 * appService.resolve('https://localhost:3000/shortener/abc123');
 */
@Injectable()
export class AppService {
    /**
     * Creates an instance of AppService.
     * @param {PrismaService} prismaService - The PrismaService instance.
     * @memberof AppService
     */
  constructor(
    private readonly prismaService: PrismaService,
  ) {}

  /**
     * Resolves a shortened URL and returns the original URL
     * @param shortUrl The shortened URL
     * @returns The original URL
     * @throws Error if the URL cannot be resolved
     * @example
     * resolve('https://localhost:3000/shortener/abc123')
     */
  async resolve(shortUrl: string, request: Request) {
    const link = await this.prismaService.link.findFirst({
        where: {
            shortUrl: shortUrl,
        },
    });
    if (!link) {
        throw new Error('Link not found');
    }
    
    // Create a visit record
    await this.prismaService.visit.create({
        data: {
            linkId: link.id,
            ipAddress: request.ip,
            userAgent: request.headers['user-agent'] || '',
        },
    });

    return link.url;
}
}
