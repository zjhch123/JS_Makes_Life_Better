/*
* @Author: zjhch123
* @Date:   2017-12-08 10:33:48
* @Last Modified by:   zjhch123
* @Last Modified time: 2017-12-08 10:53:33
*/

const request = require('request-promise')
const cheerio = require('cheerio')

const fn_index = async (ctx, next) => {
  await next()
  const result = await request.get('https://cnodejs.org/')
  const $ = cheerio.load(result);
  const retValue = [].slice.call($('#topic_list .cell')).map((item) => {
    const $element = $(item)
    return {
      title: $element.find('.topic_title').attr('title'),
      href: $element.find('.topic_title').attr('href'),
      author: $element.find('.user_avatar').children().eq(0).attr('title') || 'unknown'
    }
  })

  ctx.body = {
    code: 200,
    result: retValue
  }
}

module.exports = {
  "GET /index/": fn_index
}
