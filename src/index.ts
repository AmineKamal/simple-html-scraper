import * as puppeteer from 'puppeteer';
import { Config } from './config';
import { IScraperOptions, IScraperResult } from './interfaces';

export class Scraper {
  private readonly scroll: boolean;
  private readonly scrollWait: number;
  private readonly maxScroll: number | 'MAX';
  private readonly acceptedResources: string[];
  private readonly puppeteerOptions: puppeteer.LaunchOptions;

  public constructor(options?: IScraperOptions) {
    options = options ? options : {};
    this.scroll = options.scroll ? options.scroll : Config.SCROLL;
    this.acceptedResources = options.resources ? options.resources : Config.ACCEPTED_RESOURCES;
    this.puppeteerOptions = options.puppeteer ? options.puppeteer : Config.PUPPETEER;
    this.maxScroll = options.maxScroll ? options.maxScroll : Config.MAX_SCROLL;
    this.scrollWait = options.scrollWait ? options.scrollWait : Config.SCROLL_WAIT;
  }

  public async get(url: string): Promise<IScraperResult> {
    const browser = await puppeteer.launch(this.puppeteerOptions);
    const page = await browser.newPage();
    await page.setRequestInterception(true);

    const images: string[] = [];

    page.on('request', request => {
      if (this.acceptedResources.indexOf(request.resourceType()) === -1) {
        request.abort();
      } else {
        if (request.resourceType() === 'image') {
          images.push(request.url());
        }
        request.continue();
      }
    });

    await page.goto(url, {
      timeout: 25000,
      waitUntil: 'networkidle2',
    });

    if (this.scroll) {
      let current: number;
      let scrollTimes: number = 0;
      do {
        current = await page.evaluate(() => window.scrollY);

        await page.evaluate(() => {
          window.scrollBy(0, window.innerHeight);
        });

        await page.waitFor(this.scrollWait);

        if (this.maxScroll !== 'MAX' && ++scrollTimes >= this.maxScroll) {
          break;
        }
      } while (current !== (await page.evaluate(() => window.scrollY)));
    }

    const content = await page.content();

    await page.close();
    await browser.close();

    return { content, images };
  }
}
