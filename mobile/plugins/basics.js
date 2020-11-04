const isServer = process.server

const cookieparser = isServer ? require('cookieparser') : undefined
const definition = require('@/assets/js/definition.js').default
const i18n = require('@/assets/lang/index.js').getLang

export default ({ req, app, store, $axios }, inject) => {
    // 设置语言
    let language = 'zh_CN'
    let coin = 'CNY'
    let areaId = 1
    let platform = 21
    if (isServer) {
        let host = req.headers['host']
        if ((/^(hk|hk-msjew|wap-hk|wap-hk-msjew)/is).test(host)) {
            language = 'zh_TW'
            coin = 'HKD'
            areaId = 2
            platform = 11 //移动-香港
        } else if ((/^(us|us-msjew|wap-us|wap-us-msjew)\./is).test(host)) {
            language = 'en_US'
            coin = 'USD'
            areaId = 99
            platform = 31 //移动-美国
        } else if ((/^(tw|tw-bdd|wap-tw|wap-tw-bdd)\./is).test(host)) {
            language = 'zh_TW'
            coin = 'TWD'
            areaId = 3
            platform = 41 //移动-台湾
        } else {
            language = 'zh_CN'
            coin = 'CNY'
            areaId = 1
            platform = 21 //移动-大陆
        }
        if (req.headers.cookie) {
            const cookie = cookieparser.parse(req.headers.cookie || '')
            language = cookie.language || language
            coin = cookie.coin || coin
        }
        store.commit('setLanguage', language)
        store.commit('setCoin', coin)
        store.commit('setAreaId', areaId)
        store.commit('setPlatform', platform)
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
