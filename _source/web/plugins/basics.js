const isServer = process.server

const cookieparser = isServer ? require('cookieparser') : undefined
const definition = require('@/assets/js/definition.js').default
const i18n = require('@/assets/i18n/index.js').getLang

export default ({ req, app, store, $axios }, inject) => {
  // 设置语言
  let language = 'zh_TW'
  if (isServer) {
    if (req && req.headers && req.headers.cookie) {
      const cookie = cookieparser.parse(req.headers.cookie || '')
      language = cookie.language || language
    }
  } else if (store && store.state) {
    language = store.state.language
  }
  inject('userLanguage', language)
  inject('bddLanguage', i18n(language))

  //  设置全局搜索条件配置定义
  inject('bddDefinition', definition(language))

  inject('STATIC_PATH', process.env.STATIC_PATH)

  inject('getSeoInfo', type => {
    return $axios({
      method: `get`,
      url: `/web/WebsiteSeo/queryWebsiteSeo`,
      params: {
        type
      }
    })
      .then(data => {
        return {
          title: data.pageTitle,
          meta: [
            {
              name: 'title',
              content: data.pageTitle
            },
            {
              name: 'description',
              content: data.mataExplain
            },
            {
              name: 'keywords',
              content: data.mataKeyword
            }
          ]
        }
      })
      .catch(err => {
        console.error(err)
      })
  })

  inject('getDetailSeoInfo', detail => {
    return {
      title: detail.metaTitle || '',
      meta: [
        {
          name: 'title',
          content: detail.metaTitle || ''
        },
        {
          name: 'description',
          content: detail.metaDesc || ''
        },
        {
          name: 'keywords',
          content: detail.metaWord || ''
        }
      ]
    }
  })
}
