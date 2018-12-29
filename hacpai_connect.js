const _ajax = (url, cb, opt) => {
  $.ajax(Object.assign({
    url: url,
    dataType: 'json',
    success: cb
  }, opt))
}

const getArticle = ({
  id,
  host
}) => {
  return new Promise((resolve, reject) => {
    _ajax(`${host}/console/article/${id}`, (data) => resolve(data))
  }).then(res => {
    return {
      id: id,
      title: res.article.articleTitle,
      permalink: res.article.articlePermalink,
      tags: res.article.articleTags.map(t => t.tagTitle).join(','),
      content: res.article.articleContent
    }
  })
}

const getClient = ({
  id,
  host
}) => {
  return new Promise((resolve, reject) => {
    _ajax(`${host}/console/preference/`, (data) => resolve(data))
  }).then(res => {
    return {
      key: res.preference.keyOfSolo,
      title: res.preference.blogTitle,
      host: host,
      email: res.preference.adminEmail
    }
  })
}

const connect = (data) => {
  return new Promise((resolve, reject) => {
    _ajax(`https://rhythm.b3log.org/api/article`, (data) => resolve(data), {
      method: 'post',
      data: JSON.stringify(data),
      contentType: 'application/json;charset=utf-8'
    })
  })
}

(async function (config) {
  const article = await getArticle(config)
  const client = await getClient(config)
  const result = await connect({
    article,
    client
  })
  console.log(result)
})({
  id: '1545486864691',
  host: 'https://blog.hduzplus.xyz'
})