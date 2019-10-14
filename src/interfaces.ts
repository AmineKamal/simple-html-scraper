import { LaunchOptions } from 'puppeteer';

export interface IScraperOptions {
  scroll?: boolean;
  maxScroll?: number | 'MAX';
  scrollWait?: number;
  resources?: string[];
  puppeteer?: LaunchOptions;
}

export interface IScraperResult {
  content: string;
  images: string[];
}
