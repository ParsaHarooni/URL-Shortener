import { Injectable } from '@nestjs/common';
import { Request } from 'express';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ShortenerService {
    constructor(private readonly prismaService: PrismaService) {}

    
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
}
