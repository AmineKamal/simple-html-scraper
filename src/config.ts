import { LaunchOptions } from 'puppeteer';

export class Config {
  public static readonly ACCEPTED_RESOURCES: string[] = ['document', 'script', 'xhr', 'image'];
  public static readonly SCROLL: boolean = true;
  public static readonly PUPPETEER: LaunchOptions = {};
  public static readonly MAX_SCROLL: number | 'MAX' = 'MAX';
  public static readonly SCROLL_WAIT: number = 200;
}
