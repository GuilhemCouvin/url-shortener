import { URLParts } from 'src/url/dto/create-url.dto';

export const generateUrlFromParts = (urlParts: URLParts): string => {
  return `${urlParts.scheme}://${urlParts.host}`;
};

export const parseURL = (url: string): URLParts | null => {
  const schemes = ['http', 'https'];
  const urlRegex =
    /^(([^:/?#]+):)?(\/\/([^/?#]*))?([^?#]*)(\?([^#]*))?(#(.*))?/;

  const matches = url.match(urlRegex);
  if (!matches) return null;

  const [, , scheme, , host, path, , query] = matches;

  return {
    source: url,
    scheme:
      scheme && schemes.includes(scheme.toLocaleLowerCase())
        ? scheme.toLocaleLowerCase()
        : 'http',
    host: (host || '') + (path || '') + (query ? `?${query}` : ''),
  };
};
