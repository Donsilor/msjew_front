const isServer = process.server

const cookieparser = isServer ? require('cookieparser') : undefined
const definition = require('@/assets/js/definition.js').default
const i18n = require('@/assets/i18n/index.js').getLang

export default ({ req, app, store, $axios }, inject) => {
    // 设置语言
    let language = 'zh_CN'
    let coin = 'CNY'
    let areaId = 1
    let platform = 20
    if (isServer) {
        let host = req.headers['host']
        if ((/^(cn|cn-bdd|wap-cn|www\.bddco\.cn|wap\.bddco\.cn)/is).test(host)) {
            language = 'zh_CN'
            coin = 'CNY'
            areaId = 1
            platform = 20 //PC大陆
        } else if ((/^(us|us-bdd|wap-us)\./is).test(host)) {
            language = 'en_US'
            coin = 'USD'
            areaId = 99
            platform = 30 //PC美国
        } else if ((/^(tw|tw-bdd|wap-tw)\./is).test(host)) {
            language = 'zh_TW'
            coin = 'TWD'
            areaId = 3
            platform = 40 //PC台湾
        } else {
            language = 'zh_CN'
            coin = 'CNY'
            areaId = 1
            platform = 20 //PC香港
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
    inject('userLanguage', language)
    inject('bddLanguage', i18n(language))

    //  设置全局搜索条件配置定义
    inject('bddDefinition', definition(language))

    inject('STATIC_PATH', process.env.STATIC_PATH)

    inject('getSeoInfo', type => {
        return $axios({
            method: `get`,
            url: `web/common/seo/index`,
            params: {
                type
            }
        })
            .then(res => {
                // console.log("sss",res.data)
                if(res.data){
                    var data = res.data
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
