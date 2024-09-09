import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

/**
 * Service for getting visits data.
 * @class VisitsService
 * @extends {PrismaService}
 * @example
 * visitsService.getVisits(1);
 */
@Injectable()
export class VisitsService {
        /**
         * Creates an instance of VisitsService.
         * @param {PrismaService} prismaService - The PrismaService instance.
         * @memberof VisitsService
         */
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

        async getVisitsTimeline(linkId: number, filters?: {
                lastYears?: number;
                lastMonths?: number;
                lastDays?: number;
                lastHours?: number;
                lastMinutes?: number;
        }) {
                const link = await this.prismaService.link.findFirst({
                        where: { id: linkId },
                });

                if (!link) {
                        return null;
                }

                let whereClause: any = { linkId: link.id };

                if (filters && Object.values(filters).some(value => value !== undefined)) {
                        let startDate = new Date();
                        if (filters.lastYears) startDate.setFullYear(startDate.getFullYear() - filters.lastYears);
                        if (filters.lastMonths) startDate.setMonth(startDate.getMonth() - filters.lastMonths);
                        if (filters.lastDays) startDate.setDate(startDate.getDate() - filters.lastDays);
                        if (filters.lastHours) startDate.setHours(startDate.getHours() - filters.lastHours);
                        if (filters.lastMinutes) startDate.setMinutes(startDate.getMinutes() - filters.lastMinutes);

                        whereClause.createdAt = { gte: startDate };
                }

                const visits = await this.prismaService.visit.findMany({
                        where: whereClause,
                        orderBy: {
                                createdAt: 'asc',
                        },
                        select: {
                                createdAt: true,
                                ipAddress: true,
                                userAgent: true,
                        },
                });

                const visitsTimeline = visits.map(visit => ({
                        date: visit.createdAt,
                        ipAddress: visit.ipAddress,
                        userAgent: visit.userAgent,
                }));

                return visitsTimeline;
        }
}
