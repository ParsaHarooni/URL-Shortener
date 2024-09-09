import { Module } from '@nestjs/common';
import { VisitsController } from './visits.controller';
import { VisitsService } from './providers/visits.service';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  controllers: [VisitsController],
  providers: [VisitsService],
  imports: [PrismaModule],
})
export class VisitsModule {}
