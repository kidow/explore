import { NextApiRequest, NextApiResponse } from 'next'
import urlMetadata from 'url-metadata'
import puppeteer from 'puppeteer-core'
import * as cheerio from 'cheerio'
import { twoDigitsNumber } from 'services'
import chrome from 'chrome-aws-lambda'

const IS_DEV = process.env.NODE_ENV === 'development'
const executablePath =
  process.platform === 'win32'
    ? 'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe'
    : process.platform === 'linux'
      ? '/usr/bin/google-chrome'
      : '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'
const getOptions = async () => ({ args: IS_DEV ? [] : chrome.args, executablePath: IS_DEV ? executablePath : await chrome.executablePath, headless: IS_DEV ? true : chrome.headless, ignoreHTTPSErrors: true })


export default async (req: NextApiRequest, res: NextApiResponse) => {
  const LINKS = [
    'https://dev.to',
    'https://www.ttimes.co.kr',
    'https://now.rememberapp.co.kr',
    'https://medium.com',
    'https://www.surfit.io/explore/develop'
  ]
  try {
    let metadatas = await Promise.all(LINKS.map(link => urlMetadata(link)))
    let result: Array<urlMetadata.Result & { links: ILink[] }> = metadatas.map(item => ({ ...item, links: [] }))
    for (let index in result) {
      let links: ILink[] = []
      let item = result[index]
      switch (item.url) {
        case 'https://now.rememberapp.co.kr/':
          links = await getRememberNow()
          break;
        case 'https://www.ttimes.co.kr/':
          links = await getTTimes()
          break;
        default:
      }
      item.links = links.slice(0, 3)
    }
    return res.status(200).json(result)
  } catch (err) {
    res.status(400).json(err)
  }
}

const getRememberNow = async (): Promise<ILink[]> => {
  return new Promise(async (resolve, reject) => {
    try {
      const browser = await puppeteer.launch({
        executablePath, headless: IS_DEV, ignoreHTTPSErrors: true
      })
      const page = await browser.newPage()
      await page.goto('https://now.rememberapp.co.kr')
      const content = await page.content()
      const $ = cheerio.load(content)
      const list = $('#main > article')
      let result: ILink[] = []
      list.each((index, item) => {
        if (index > 2) return
        const date = new Date()
        const createdAt = $(item).find('.now_post_header_mobile > .entry-date').text()
        if (createdAt === `${date.getFullYear()}년 ${twoDigitsNumber(new Date().getMonth() + 1)}월 ${twoDigitsNumber(date.getDate())}일`) {
          result.push({
            url: $(item).find('.entry-header > .entry-title > a').attr('href') || '',
            title: $(item).find('.entry-header > .entry-title > a').text()
          })
        }
      })
      await browser.close()
      resolve(result)
    } catch (err) {
      console.log(err)
      resolve([])
    }
  })
}

const getDevTo = async () => { }

const getTTimes = async (): Promise<ILink[]> => {
  return new Promise(async (resolve, reject) => {
    try {
      const browser = await puppeteer.launch({
        executablePath, headless: IS_DEV, ignoreHTTPSErrors: true
      })
      const page = await browser.newPage()
      await page.goto('https://ttimes.co.kr')
      const content = await page.content()
      const $ = cheerio.load(content)
      const list = $('.list-desktop-panel > div > .list-item')
      let result: ILink[] = []
      list.each((index, item) => {
        if (index > 2) return
        result.push({
          url: $(item).find('div > .thumbnail > div > a').attr('href') || '',
          title: $(item).find('div > .title > div > a > span').text()
        })
      })
      await browser.close()
      resolve(result)
    } catch (err) {
      console.log(err)
      resolve([])
    }
  })
}

const getMedium = async () => { }

const getSurfit = async () => { }