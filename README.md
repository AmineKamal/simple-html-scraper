# Simple Html Scraper

Simple Html Scraper is a small scraper using puppeteer that can be used to fetch the html content and images of a web page.

## Installation

Use the package manager [npm](https://www.npmjs.com) to install Simple Html Scraper.

```bash
npm i simple-html-scraper
```

## Usage

```typescript
import { Scraper } from 'simple-html-scraper';

const scraper = new Scraper(/* { options } */);

(async () => {
  const result = await scraper.get('url');
  console.log(result.content); // Html
  console.log(result.images); // Array of image urls
})();

/* options
{
  scroll?: boolean; //enable scrolling
  maxScroll?: number | 'MAX'; // scroll iterations
  scrollWait?: number; // time to wait after each scroll
  resources?: string[]; // rescources to accept during the page load
  puppeteer?: LaunchOptions; // options sent to puppeteer
}
*/
```

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License

[MIT](https://choosealicense.com/licenses/mit/)
