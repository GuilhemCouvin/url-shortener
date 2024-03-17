import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  HttpCode,
  HttpStatus,
  Redirect,
} from '@nestjs/common';
import { UrlService } from './url.service';
import { CreateUrlDto } from './dto/create-url.dto';

@Controller()
export class UrlController {
  constructor(private readonly urlService: UrlService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async createShortenedUrl(@Body() createUrlDto: CreateUrlDto) {
    return await this.urlService.createShortenedUrl(createUrlDto);
  }

  @Redirect()
  @Get(':urlCode')
  async redirectToUrl(@Param('urlCode') urlCode: string) {
    return await this.urlService.redirectToUrl(urlCode);
  }
}
