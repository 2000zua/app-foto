import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TesteModule } from './teste/teste.module';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [TesteModule, PrismaModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
