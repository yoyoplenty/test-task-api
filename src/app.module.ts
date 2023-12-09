import { APP_FILTER } from '@nestjs/core';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { MiddlewareConsumer, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { UserSectorModule } from './app/user-sector/user-sector.module';
import { SectorModule } from './app/sector/sector.module';
import { HttpExceptionFilter } from './handlers/exceptions/http-exception.filter';
import LoggerMiddleware from './middlewares/logger.middleware';
import { appConfig } from './config';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRoot(appConfig.mongoUri),
    SectorModule,
    UserSectorModule,
  ],
  controllers: [AppController],
  providers: [
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
  ],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
