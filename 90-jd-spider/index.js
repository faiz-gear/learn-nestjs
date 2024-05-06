import puppeteer from 'puppeteer'

const browser = await puppeteer.launch({
  headless: false,
  defaultViewport: {
    width: 0,
    height: 0
  }
})

const page = await browser.newPage()

// await page.goto('https://www.zhipin.com/web/geek/job')

// await page.waitForSelector('.job-list-box')

// await page.click('.city-label', {
//   delay: 500
// })

// await page.click('.city-list-hot li:first-child', {
//   delay: 500
// })

// await page.focus('.search-input-box input')

// await page.keyboard.type('前端', {
//   delay: 200
// })

// await page.click('.search-btn', {
//   delay: 1000
// })

// 查询深圳前端职位
await page.goto('https://www.zhipin.com/web/geek/job?query=前端&city=101280600')

// 等待job-list-box元素加载完成
await page.waitForSelector('.job-list-box')

// 获取当前页数
const totalPage = await page.$eval('.options-pages a:nth-last-child(2)', (el) => {
  return parseInt(el.textContent)
})

// 存储所有职位信息
const allJobs = []
for (let i = 1; i <= totalPage; i++) {
  await page.goto('https://www.zhipin.com/web/geek/job?query=前端&city=101280600&page=' + i)

  await page.waitForSelector('.job-list-box')

  const jobs = await page.$eval('.job-list-box', (el) => {
    return [...el.querySelectorAll('.job-card-wrapper')].map((item) => {
      return {
        job: {
          name: item.querySelector('.job-name').textContent,
          area: item.querySelector('.job-area').textContent,
          salary: item.querySelector('.salary').textContent
        },
        link: item.querySelector('a').href,
        company: {
          name: item.querySelector('.company-name').textContent
        }
      }
    })
  })
  allJobs.push(...jobs)
}

// 获取职位描述
for (let i = 0; i < allJobs.length; i++) {
  await page.goto(allJobs[i].link)

  try {
    await page.waitForSelector('.job-sec-text')

    const jd = await page.$eval('.job-sec-text', (el) => {
      return el.textContent
    })
    allJobs[i].desc = jd

    console.log(allJobs[i])
  } catch (e) {}
}

console.log(allJobs)
