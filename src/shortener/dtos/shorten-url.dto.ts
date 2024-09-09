import { IsUrl, IsNotEmpty } from 'class-validator';

/**
 * DTO for shortening a URL.
 * @class ShortenUrlDto
 * @extends {ShortenUrlDto}
 * @example
 * const shortenUrlDto = new ShortenUrlDto();
 * shortenUrlDto.url = 'https://example.com';
 */
export class ShortenUrlDto {
  /**
   * URL to shorten.
   * @example
   * shortenUrlDto.url = 'https://example.com';
   */
  @IsUrl()
  @IsNotEmpty()
  url: string;
}
