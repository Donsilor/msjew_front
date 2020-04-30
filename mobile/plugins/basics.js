const isServer = process.server

const cookieparser = isServer ? require('cookieparser') : undefined
const definition = require('@/assets/js/definition.js').default
const i18n = require('@/assets/lang/index.js').getLang

export default ({ req, app, store, $axios }, inject) => {
    // 设置语言
    let language = 'en_US'
    if (isServer) {
        let host = req.headers['host']
        if ((/^(cn|wap-cn)\./is).test(host)) {
            language = 'zh_CN'
        } else if ((/^(us|wap-us)\./is).test(host)) {
            language = 'en_US'
        } else {
            language = 'zh_TW'
        }
        store.commit('setLanguage', language)
    } else if (store && store.state) {
        language = store.state.language
    }
    inject('bddLanguage', i18n(language))

    //  设置全局搜索条件配置定义
    inject('bddDefinition', definition(language))

    inject('IMG_URL', process.env.RESOURCE_URL)

    inject('STATIC_PATH', process.env.STATIC_PATH)

    inject('getSeoInfo', type => {
        return $axios({
            method: `get`,
            url: `/web/common/seo/index`,
            params: {
                type
            }
        })
            .then(data => {
                return {
                    title: data.meta_title,
                    meta: [
                        {
                            name: 'title',
                            content: data.meta_title
                        },
                        {
                            name: 'description',
                            content: data.meta_desc
                        },
                        {
                            name: 'keywords',
                            content: data.meta_word
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
