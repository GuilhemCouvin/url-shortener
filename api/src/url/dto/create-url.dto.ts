export class CreateUrlDto {
  url: string;
  alias?: string;
  expireAt?: Date;
}

export type URLParts = {
  source: string;
  scheme: string;
  host: string;
};
