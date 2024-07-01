import { Module } from '@nestjs/common';
import { TesteService } from './teste.service';
import { TesteController } from './teste.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [TesteController],
  providers: [TesteService],
})
export class TesteModule {}
