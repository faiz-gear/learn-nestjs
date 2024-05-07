import { Injectable } from '@nestjs/common';
import puppeteer from 'puppeteer';
import { Observable, Subscriber } from 'rxjs';
import * as PptxGenJS from 'pptxgenjs';

let cache = null;

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  async getUniversityData() {
    if (cache) {
      return cache;
    }

    async function getData(observer: Subscriber<Record<string, any>>) {
      const browser = await puppeteer.launch({
        headless: true,
        defaultViewport: {
          width: 0,
          height: 0,
        },
      });

      const page = await browser.newPage();

      await page.goto('https://www.icourse163.org/university/view/all.htm');

      await page.waitForSelector('.u-usitys');

      const universityList: Array<Record<string, any>> = await page.$eval(
        '.u-usitys',
        (el) => {
          return [...el.querySelectorAll('.u-usity')].map((item) => {
            return {
              name: item.querySelector('img').alt,
              img: item.querySelector('img').src,
              link: item.getAttribute('href'),
            };
          });
        },
      );

      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      const ppt = new PptxGenJS();

      for (let i = 0; i < 10; i++) {
        const item = universityList[i];
        await page.goto('https://www.icourse163.org' + item.link);

        await page.waitForSelector('.m-cnt');

        const content = await page.$eval('.m-cnt p', (el) => el.textContent);
        item.desc = content;

        item.img = await page.$eval('.g-doc img', (el) =>
          el.getAttribute('src'),
        );

        observer.next({ data: item });

        const slide = ppt.addSlide();
        slide.addText(item.name, {
          x: '10%',
          y: '10%',
          color: '#ff0000',
          fontSize: 30,
          align: ppt.AlignH.center,
        });

        slide.addImage({
          path: item.img,
          x: '42%',
          y: '25%',
        });

        slide.addText(item.desc, {
          x: '10%',
          y: '60%',
          color: '#000000',
          fontSize: 14,
        });
      }

      await browser.close();

      await ppt.writeFile({
        fileName: '中国所有大学.pptx',
      });

      cache = universityList;
    }

    return new Observable((observer) => {
      getData(observer);
    });
  }
}
