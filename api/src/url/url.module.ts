import { Module } from '@nestjs/common';
import { UrlService } from './url.service';
import { UrlController } from './url.controller';
import { MongooseModule } from '@nestjs/mongoose';
import forFeatureDb from 'src/db/for-feature.db';

@Module({
  imports: [MongooseModule.forFeature(forFeatureDb)],
  controllers: [UrlController],
  providers: [UrlService],
})
export class UrlModule {}
