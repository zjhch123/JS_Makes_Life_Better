/*
* @Author: zjhch123
* @Date:   2017-12-08 10:33:48
* @Last Modified time: 2017-12-12 15:26:36
*/

const request = require('request-promise')
const cheerio = require('cheerio')

const fn_index = async (ctx, next) => {
  await next()
  const result = await request.get('https://cnodejs.org/')
  const $ = cheerio.load(result);
  const hrefs = [].slice.call($('#topic_list .cell')).map((item) => {
    const $element = $(item)
    return 'https://cnodejs.org' + $element.find('.topic_title').attr('href')
  })



  ctx.body = {
    code: 200,
    result: hrefs
  }
}

module.exports = {
  "GET /index/": fn_index
}
