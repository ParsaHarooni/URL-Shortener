import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class VisitsService {
    constructor(
        private readonly prismaService: PrismaService,
    ) { }

    /**
     * Gets the number of visits and the unique IP addresses and user agents for a given link.
     * @param linkId The ID of the link.
     * @returns An object containing the number of visits and the unique IP addresses and user agents.
     * @example
     * getVisits(1)
     */
    async getVisits(linkId: number) {
        const link = await this.prismaService.link.findUnique({
            where: { id: linkId },
        });

        if (!link) {
            return null; // or throw an error, depending on your preference
        }

        const [visitCount, uniqueData] = await Promise.all([
            this.prismaService.visit.count({
                where: { linkId },
            }),
            this.prismaService.visit.findMany({
                where: { linkId },
                select: {
                    ipAddress: true,
                    userAgent: true,
                },
                distinct: ['ipAddress', 'userAgent'],
            }),
        ]);

        const ipAddresses = uniqueData.map(visit => visit.ipAddress);
        const userAgents = uniqueData.map(visit => visit.userAgent);

        return { count: visitCount, ipAddresses, userAgents };
    }
}
