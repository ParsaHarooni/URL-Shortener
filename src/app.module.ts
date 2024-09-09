import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { ShortenerModule } from './shortener/shortener.module';
import { VisitsModule } from './visits/visits.module';

@Module({
  imports: [PrismaModule, ShortenerModule, VisitsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
