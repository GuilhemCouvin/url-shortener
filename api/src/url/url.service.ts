import { HttpStatus, Injectable } from '@nestjs/common';
import { CreateUrlDto } from './dto/create-url.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Url, UrlDocument } from './entities/url.entity';
import { nanoid } from 'nanoid';
import { generateUrlFromParts, parseURL } from 'src/utils/url.utils';

// ? redirect to the app error page
const linkNotFound = `http://${process.env.APP_DOMAIN || 'localhost:3000'}/link-not-found`;

@Injectable()
export class UrlService {
  constructor(@InjectModel(Url.name) private urlSchema: Model<UrlDocument>) {}

  /**
   * Find all the shortened urls
   * TODO: Add filtering on user and pagination (?)
   * @returns {Promise<UrlDocument[]>} - The list of shortened urls
   */
  async findAll(): Promise<UrlDocument[]> {
    return await this.urlSchema.find().exec();
  }

  /**
   * Find a shortened url by its url
   * @param url - The url to search for
   * @returns {Promise<UrlDocument | undefined>} - The shortened url
   */
  async findOneByUrlHost(urlHost: string): Promise<UrlDocument | undefined> {
    return await this.urlSchema.findOne({
      host: urlHost,
    });
  }

  /**
   * Find a shortened url by its alias
   * @param alias - The alias to search for
   * @returns {Promise<UrlDocument | undefined>} - The shortened url object
   */
  async findOneByAlias(alias: string): Promise<UrlDocument | undefined> {
    return await this.urlSchema.findOne({
      alias: alias,
    });
  }

  /**
   * Create a shortened url from a url or return the existing one if it already exists
   * @param createUrlDto - The url to shorten
   * @returns {Promise<UrlDocument>} - The shortened url
   */
  async createShortenedUrl(createUrlDto: CreateUrlDto): Promise<UrlDocument> {
    // Generate a random alias and set custom to false
    let alias = nanoid();
    let custom = false;

    // Check if the alias is provided
    if (createUrlDto.alias) {
      // Check if the alias already exists
      const urlObjByAlias = await this.findOneByAlias(createUrlDto.alias);

      if (urlObjByAlias) {
        throw new Error('Alias already exists');
      } else {
        custom = true;
        alias = createUrlDto.alias;
      }
    }

    // Split the url into parts and check if it's valid
    const urlParts = parseURL(createUrlDto.url);
    if (!urlParts) throw new Error('Invalid URL');

    // Check if the url already exists
    const urlObj = await this.findOneByUrlHost(urlParts.host);

    if (urlObj) {
      // If expireAt is provided, update the expireAt
      if (createUrlDto.expireAt) {
        urlObj.expireAt = createUrlDto.expireAt;
        await urlObj.save();
      }

      // Return the existing url
      return urlObj;
    } else {
      // Generate the clean url from the parts
      const url = generateUrlFromParts(urlParts);

      // Create the shortened url object
      const createdCat = new this.urlSchema({
        url,
        alias,
        custom,
        expireAt: createUrlDto.expireAt || null,
        shortUrl: `http://${process.env.API_DOMAIN || 'localhost:4000'}/${alias}`,
        ...urlParts,
      });

      // Save the shortened url object
      return createdCat.save();
    }
  }

  /**
   * Redirect to the original url
   * @param urlCode - The urlCode to search for
   * @returns {Promise<{ statusCode: number; url: string }>} - The status code and the url to redirect to
   */
  async redirectToUrl(
    urlCode: string,
  ): Promise<{ statusCode: number; url: string }> {
    // Search in DB for the urlCode
    const urlObject = await this.findOneByAlias(urlCode);

    // Check if the urlCode exists and is not expired
    if (
      urlObject &&
      (urlObject.expireAt ? urlObject.expireAt >= new Date() : true)
    ) {
      // Increment the number of visits
      urlObject.clicks += 1;

      // Save the changes
      await urlObject.save();

      // Redirect to the original url
      return { statusCode: HttpStatus.MOVED_PERMANENTLY, url: urlObject.url };
    } else {
      // Redirect to the app error page
      return { statusCode: HttpStatus.FOUND, url: linkNotFound };
    }
  }
}
