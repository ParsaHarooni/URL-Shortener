import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

/**
 * Service for interacting with the Prisma database.
 * @class PrismaService
 * @extends {PrismaClient}
 * @example
 * const prismaService = new PrismaService();
 * prismaService.link.findFirst();
 */
@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
    /**
     * Connects to the Prisma database.
     * @returns {Promise<void>} A promise that resolves when the connection is established.
     * @memberof PrismaService
     */
    async onModuleInit() {
        await this.$connect();
    }
}
