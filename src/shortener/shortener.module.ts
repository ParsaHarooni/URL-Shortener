import { Module } from '@nestjs/common';
import { ShortenerService } from './providers/shortener.service';
import { ShortenerController } from './shortener.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  providers: [ShortenerService],
  controllers: [ShortenerController],
  imports: [PrismaModule],
})
export class ShortenerModule {}
