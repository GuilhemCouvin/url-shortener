import { Module } from '@nestjs/common';
import { UrlModule } from './url/url.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.MONGO_URI),
    UrlModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
