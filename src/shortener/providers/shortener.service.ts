import { Injectable } from '@nestjs/common';
import { Request } from 'express';
import { PrismaService } from 'src/prisma/prisma.service';

/**
 * Service for shortening URLs.
 * @class ShortenerService
 * @extends {PrismaService}
 * @example
 * const shortenerService = new ShortenerService();
 * shortenerService.shorten('https://example.com', { headers: { host: 'localhost:3000' } });
 */
@Injectable()
export class ShortenerService {
    /**
     * Creates an instance of ShortenerService.
     * @param {PrismaService} prismaService - The PrismaService instance.
     * @memberof ShortenerService
     */
    constructor(private readonly prismaService: PrismaService) { }


    /**
     * Shortens a URL and returns the shortened URL
     * @param url The URL to shorten
     * @param request The request object
     * @returns The shortened URL
     * @throws Error if the URL cannot be shortened
     * @example
     * shorten('https://example.com', { headers: { host: 'localhost:3000' } })
     * 
     */

    async shorten(url: string, request: Request) {
        let randomString;
        let existingLink;
        do {
            randomString = Math.random().toString(36).substring(2, 15);
            existingLink = await this.prismaService.link.findFirst({
                where: { shortUrl: randomString },
            });
        } while (existingLink);

        const link = await this.prismaService.link.create({
            data: {
                url: url,
                shortUrl: randomString,
            },
        });
        const host = request.headers.host;
        return {
            url: `https://${host}/${link.shortUrl}`,
            linkId: link.id,
        };
    }

    /**
     * Gets the short URL for a given link.
     * @param linkId The ID of the link.
     * @returns The short URL for a given link.
     * @example
     * getShortUrl(1)
     */
    async getShortUrl(linkId: number, request: Request) {
        const link = await this.prismaService.link.findUnique({
            where: { id: linkId },
        });

        if (!link) {
            return null;
        }

        const url = `https://${request.headers.host}/${link.shortUrl}`;
        return { url, linkId };
    }
}
