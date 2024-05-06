import { Inject, Injectable } from '@nestjs/common';
import puppeteer from 'puppeteer';
import { Job } from './entities/Job';
import { EntityManager } from 'typeorm';
import { Subscriber } from 'rxjs';

@Injectable()
export class AppService {
  @Inject(EntityManager)
  private readonly entityManager: EntityManager;

  getHello(): string {
    return 'Hello World!';
  }

  async startSpider(observer?: Subscriber<any>) {
    const browser = await puppeteer.launch({
      headless: false,
      defaultViewport: {
        width: 0,
        height: 0,
      },
    });

    const page = await browser.newPage();

    // 查询深圳前端职位
    await page.goto(
      'https://www.zhipin.com/web/geek/job?query=前端&city=101280600',
    );

    // 等待job-list-box元素加载完成
    await page.waitForSelector('.job-list-box');

    // 获取当前页数
    const totalPage = await page.$eval(
      '.options-pages a:nth-last-child(2)',
      (el) => {
        return parseInt(el.textContent);
      },
    );

    // 存储所有职位信息
    const allJobs = [];
    for (let i = 1; i <= totalPage; i++) {
      await page.goto(
        'https://www.zhipin.com/web/geek/job?query=前端&city=101280600&page=' +
          i,
      );

      await page.waitForSelector('.job-list-box');

      const jobs = await page.$eval('.job-list-box', (el) => {
        return [...el.querySelectorAll('.job-card-wrapper')].map((item) => {
          return {
            job: {
              name: item.querySelector('.job-name').textContent,
              area: item.querySelector('.job-area').textContent,
              salary: item.querySelector('.salary').textContent,
            },
            link: item.querySelector('a').href,
            company: {
              name: item.querySelector('.company-name').textContent,
            },
          };
        });
      });
      allJobs.push(...jobs);
    }

    // 获取职位描述
    for (let i = 0; i < allJobs.length; i++) {
      await page.goto(allJobs[i].link);

      try {
        await page.waitForSelector('.job-sec-text');

        const jd = await page.$eval('.job-sec-text', (el) => {
          return el.textContent;
        });
        allJobs[i].desc = jd;

        // console.log(allJobs[i]);

        const job = new Job();
        job.name = allJobs[i].job.name;
        job.area = allJobs[i].job.area;
        job.salary = allJobs[i].job.salary;
        job.link = allJobs[i].link;
        job.company = allJobs[i].company.name;
        job.desc = allJobs[i].desc;

        observer?.next({ data: job });
        await this.entityManager.save(Job, job);
      } catch (e) {}
    }
  }
}
