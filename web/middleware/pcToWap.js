export default function ({ req, res, redirect, store, route }) {
    // console.log('req==================>', req)
    // console.log('res==================>', res)
    function isWap (u) {
        // var u = navigator.userAgent, app = navigator.appVersion;
        return !!u.match(/AppleWebKit.*Mobile.*/)
        // ||                   //是否为移动终端
        //     (u.indexOf('Trident') > -1||                            //IE内核
        //     u.indexOf('Presto') > -1 ||                             //opera内核
        //     u.indexOf('AppleWebKit') > -1||                       //苹果、谷歌内核
        //     u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1 ||    //火狐内核
        //     !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)||              //ios终端
        //     u.indexOf('Android') > -1 || u.indexOf('Linux') > -1||//android终端或者uc浏览器
        //     u.indexOf('iPhone') > -1||                              //是否为iPhone或者QQHD浏览器
        //     u.indexOf('iPad') > -1||                                  //是否iPad
        //     u.indexOf('Safari') == -1||                             //是否web应该程序，没有头部与底部
        //     u.indexOf('MicroMessenger') > -1||                      //是否微信 （2015-01-22新增）
        //     u.match(/\sQQ/i) == " qq"  )                                //是否QQ
    }

    const getQueryFromUrl = url => {
        const result = {}
        const start = url.indexOf('?')
        if (start === -1) {
            return result
        }
        url = url.slice(start + 1, url.length)
        const query = url.split('&')
        // console.log("sdssass",url)
        for (let n = 0, length = query.length; n < length; n++) {
            const item = query[n].split('=')
            result[item[0]] = item[1]
        }
        // console.log("result",result)
        return result
    }

    function queryParams (data) {
        let _result = []
        for (let key in data) {
            let value = data[key]
            // 去掉为空的参数
            if (['', undefined, null].includes(value)) {
                continue
            }
            if (value.constructor === Array) {
                value.forEach(_value => {
                    _result.push(encodeURIComponent(key) + '[]=' + encodeURIComponent(_value))
                })
            } else {
                _result.push(encodeURIComponent(key) + '=' + encodeURIComponent(value))
            }
        }

        return _result.length ? _result.join('&') : ''
    }


    if (process.server) {

        let u = req.headers['user-agent']

        if (!isWap(u)) {
            return
        }
        // http://localhost:8328   https://wap.bddco.com   https://wap.bdd.bddia.com
        //头部host
        let headerHost = req.headers['host']
        //生产环境
        let host = 'https://wap.msjew.com';
        if ((/^(hk|us|tw)\.msjew\.com/).test(headerHost)) {
            //生产环境
            host = 'https://wap-' + headerHost;
        } else if ((/bddco.cn/).test(headerHost)) {
            
            if ((/^(hk|us|tw)-msjew.bddco.cn/).test(headerHost)) {
                host = 'https://wap-' + headerHost;
            } else if (headerHost == 'www-msjew.bddco.cn') {
                host = 'https://wap-msjew.bddco.cn'
            }
        }

        const toWapUrl = path => {
            if (path === '/undefined') {
                return
            }

            let href = path.split('?')
            let rules = [
                // 首页
                {
                    'pcUrl': /^\/?$/,
                    'mobileUrl': `/`,
                },
                // 登录
                {
                    'pcUrl': /^\/login\/?$/,
                    'mobileUrl': `/login`
                },
                {
                    'pcUrl': /^\/login\/\?type=login/,
                    'mobileUrl': `/login`
                },
                // 注册  /login?type=register  /login/email
                {
                    'pcUrl': /^\/login\/\?type=register/,
                    'mobileUrl': `/register`
                },


                // 猫闪start

                // MS戒指系列-字母系列
                {
                    'pcUrl': /^\/wedding-rings\/ring-letter-series$/,
                    'mobileUrl': `/marriage-ring/single-ring`,
                    'params': {
                        'series': '288',
                    },
                },

                // MS戒指材质-合金
                {
                    'pcUrl': /^\/wedding-rings\/alloy$/,
                    'mobileUrl': `/marriage-ring/single-ring`,
                    'params': {
                        'material': '204',
                    },
                },

                // MS戒指材质-925银
                {
                    'pcUrl': /^\/wedding-rings\/925-silver$/,
                    'mobileUrl': `/marriage-ring/single-ring`,
                    'params': {
                        'material': '35',
                    },
                },

                // MS戒指材质-9k金
                {
                    'pcUrl': /^\/wedding-rings\/9k-gold$/,
                    'mobileUrl': `/marriage-ring/single-ring`,
                    'params': {
                        'material': '272',
                    },
                },

                // MS戒指材质-14k金
                {
                    'pcUrl': /^\/wedding-rings\/14k-gold$/,
                    'mobileUrl': `/marriage-ring/single-ring`,
                    'params': {
                        'material': '273',
                    },
                },

                // MS戒指材质-18k金
                {
                    'pcUrl': /^\/wedding-rings\/18k-gold$/,
                    'mobileUrl': `/marriage-ring/single-ring`,
                    'params': {
                        'material': '274',
                    },
                },

                // MS戒指人群-浪漫女士
                {
                    'pcUrl': /^\/wedding-rings\/ring-Romantic-lady$/,
                    'mobileUrl': `/marriage-ring/single-ring`,
                    // 'params': {
                    //     'style': '277',
                    // },
                },

                // MS戒指人群-尊贵男士
                {
                    'pcUrl': /^\/wedding-rings\/ring-distinguished-man$/,
                    'mobileUrl': `/marriage-ring/single-ring`,
                    // 'params': {
                    //     'style': '277',
                    // },
                },

                // MS戒指镶嵌-群镶
                {
                    'pcUrl': /^\/wedding-rings\/ring-group-setting$/,
                    'mobileUrl': `/marriage-ring/single-ring`,
                    // 'params': {
                    //     'style': '277',
                    // },
                },

                // MS戒指镶嵌-单钻
                {
                    'pcUrl': /^\/wedding-rings\/ring-single-drill$/,
                    'mobileUrl': `/marriage-ring/single-ring`,
                    // 'params': {
                    //     'style': '277',
                    // },
                },

                // MS戒指风格-现代简约
                {
                    'pcUrl': /^\/wedding-rings\/ring-modern-simplicity$/,
                    'mobileUrl': `/marriage-ring/single-ring`,
                    'params': {
                        'style': '277',
                    },
                },

                // MS戒指风格-经典复古
                {
                    'pcUrl': /^\/wedding-rings\/ring-classic-retro$/,
                    'mobileUrl': `/marriage-ring/single-ring`,
                    'params': {
                        'style': '278',
                    },
                },

                // MS戒指风格-个性玩趣
                {
                    'pcUrl': /^\/wedding-rings\/ring-fun-with-personality$/,
                    'mobileUrl': `/marriage-ring/single-ring`,
                    'params': {
                        'style': '279',
                    },
                },

                // MS戒指风格-时尚限定
                {
                    'pcUrl': /^\/wedding-rings\/ring-fashion-limited$/,
                    'mobileUrl': `/marriage-ring/single-ring`,
                    'params': {
                        'style': '280',
                    },
                },

                //MS戒指-价格(0-500)
                {
                    'pcUrl': /^\/wedding-rings\/all\?priceRange=WzAsOTk5XQ%3D%3D$/,
                    'mobileUrl': `/marriage-ring/single-ring`,
                    'params': {
                        'startPrice': '0',
                        'endPrice': '500'
                    },
                },

                //MS戒指-价格(500-1000)
                {
                    'pcUrl': /^\/wedding-rings\/all\?priceRange=WzUwMCwxMDAwXQ%3D%3D$/,
                    'mobileUrl': `/marriage-ring/single-ring`,
                    'params': {
                        'startPrice': '500',
                        'endPrice': '1000'
                    },
                },

                //MS戒指-价格(1000-5000)
                {
                    'pcUrl': /^\/wedding-rings\/all\?priceRange=WzEwMDAsNTAwMF0%3D$/,
                    'mobileUrl': `/marriage-ring/single-ring`,
                    'params': {
                        'startPrice': '1000',
                        'endPrice': '5000'
                    },
                },

                //MS戒指-价格(5000-10000)
                {
                    'pcUrl': /^\/wedding-rings\/all\?priceRange=WzUwMDAsMTAwMDBd$/,
                    'mobileUrl': `/marriage-ring/single-ring`,
                    'params': {
                        'startPrice': '5000',
                        'endPrice': '10000'
                    },
                },

                //MS戒指-价格(10000以上)
                {
                    'pcUrl': /^\/wedding-rings\/all\?priceRange=WzEwMDAwLDMwMDAwMF0%3D$/,
                    'mobileUrl': `/marriage-ring/single-ring`,
                    'params': {
                        'startPrice': '10000',
                        'endPrice': '300000'
                    },
                },
                
                //MS项链-字母系列
                {
                    'pcUrl': /^\/jewellery\/necklace-letter-series$/,
                    'mobileUrl': `/accessories/list`,
                    'params': {
                        'actIndex': '0',
                        'series': '288'
                    },
                },

                //MS项链-合金
                {
                    'pcUrl': /^\/jewellery\/necklace-alloy$/,
                    'mobileUrl': `/accessories/list`,
                    'params': {
                        'actIndex': '0',
                        'material': '204'
                    },
                },

                //MS项链-925银
                {
                    'pcUrl': /^\/jewellery\/necklace-925-silver$/,
                    'mobileUrl': `/accessories/list`,
                    'params': {
                        'actIndex': '0',
                        'material': '35'
                    },
                },

                //MS项链-9K金
                {
                    'pcUrl': /^\/jewellery\/necklace-9k-gold$/,
                    'mobileUrl': `/accessories/list`,
                    'params': {
                        'actIndex': '0',
                        'material': '272'
                    },
                },

                //MS项链-14K金
                {
                    'pcUrl': /^\/jewellery\/necklace-14k-gold$/,
                    'mobileUrl': `/accessories/list`,
                    'params': {
                        'actIndex': '0',
                        'material': '273'
                    },
                },

                //MS项链-18K金
                {
                    'pcUrl': /^\/jewellery\/necklace-18k-gold$/,
                    'mobileUrl': `/accessories/list`,
                    'params': {
                        'actIndex': '0',
                        'material': '274'
                    },
                },

                // MS项链人群-浪漫女士
                {
                    'pcUrl': /^\/jewellery\/necklace-Romantic-lady$/,
                    'mobileUrl': `/accessories/list`,
                    'params': {
                        'actIndex': '0'
                    },
                },

                // MS项链人群-尊贵男士
                {
                    'pcUrl': /^\/jewellery\/necklace-distinguished-man$/,
                    'mobileUrl': `/accessories/list`,
                    'params': {
                        'actIndex': '0'
                    },
                },

                // MS项链镶嵌-群镶
                {
                    'pcUrl': /^\/jewellery\/necklace-group-setting$/,
                    'mobileUrl': `/accessories/list`,
                    'params': {
                        'actIndex': '0'
                    },
                },

                // MS项链镶嵌-单钻
                {
                    'pcUrl': /^\/jewellery\/necklace-single-drill$/,
                    'mobileUrl': `/accessories/list`,
                    'params': {
                        'actIndex': '0'
                    },
                },

                // MS项链风格-现代简约
                {
                    'pcUrl': /^\/jewellery\/necklace-modern-simplicity$/,
                    'mobileUrl': `/accessories/list`,
                    'params': {
                        'actIndex': '0',
                        // 'style': '277'
                    },
                },

                // MS项链风格-经典复古
                {
                    'pcUrl': /^\/jewellery\/necklace-classic-retro$/,
                    'mobileUrl': `/accessories/list`,
                    'params': {
                        'actIndex': '0',
                        // 'style': '277'
                    },
                },

                // MS项链风格-个性玩趣
                {
                    'pcUrl': /^\/jewellery\/necklace-fun-with-personality$/,
                    'mobileUrl': `/accessories/list`,
                    'params': {
                        'actIndex': '0',
                        // 'style': '277'
                    },
                },

                // MS项链风格-时尚限定
                {
                    'pcUrl': /^\/jewellery\/necklace-fashion-limited$/,
                    'mobileUrl': `/accessories/list`,
                    'params': {
                        'actIndex': '0',
                        // 'style': '277'
                    },
                },

                // MS项链-价格(0-500)
                {
                    'pcUrl': /^\/jewellery\/necklaces\?priceRange=WzAsNTAwXQ%3D%3D$/,
                    'mobileUrl': `/accessories/list`,
                    'params': {
                        'actIndex': '0',
                        'startPrice': '0',
                        'endPrice': '500'
                    },
                },

                // MS项链-价格(500-1000)
                {
                    'pcUrl': /^\/jewellery\/necklaces\?priceRange=WzUwMCwxMDAwXQ%3D%3D$/,
                    'mobileUrl': `/accessories/list`,
                    'params': {
                        'actIndex': '0',
                        'startPrice': '500',
                        'endPrice': '1000'
                    },
                },

                // MS项链-价格(1000-5000)
                {
                    'pcUrl': /^\/jewellery\/necklaces\?priceRange=WzEwMDAsNTAwMF0%3D$/,
                    'mobileUrl': `/accessories/list`,
                    'params': {
                        'actIndex': '0',
                        'startPrice': '1000',
                        'endPrice': '5000'
                    },
                },

                // MS项链-价格(5000-10000)
                {
                    'pcUrl': /^\/jewellery\/necklaces\?priceRange=WzUwMDAsMTAwMDBd$/,
                    'mobileUrl': `/accessories/list`,
                    'params': {
                        'actIndex': '0',
                        'startPrice': '5000',
                        'endPrice': '10000'
                    },
                },

                // MS项链-价格(10000以上)
                {
                    'pcUrl': /^\/jewellery\/necklaces\?priceRange=WzEwMDAwLDMwMDAwMF0%3D$/,
                    'mobileUrl': `/accessories/list`,
                    'params': {
                        'actIndex': '0',
                        'startPrice': '10000',
                        'endPrice': '300000'
                    },
                },

                //MS手链-字母系列
                {
                    'pcUrl': /^\/jewellery\/bracelet-letter-series$/,
                    'mobileUrl': `/accessories/list`,
                    'params': {
                        'actIndex': '2',
                        'series': '288'
                    },
                },

                //MS手链-合金
                {
                    'pcUrl': /^\/jewellery\/bracelet-alloy$/,
                    'mobileUrl': `/accessories/list`,
                    'params': {
                        'actIndex': '2',
                        'material': '204'
                    },
                },

                //MS手链-925银
                {
                    'pcUrl': /^\/jewellery\/bracelet-925-silver$/,
                    'mobileUrl': `/accessories/list`,
                    'params': {
                        'actIndex': '2',
                        'material': '35'
                    },
                },

                //MS手链-9K金
                {
                    'pcUrl': /^\/jewellery\/bracelet-9k-gold$/,
                    'mobileUrl': `/accessories/list`,
                    'params': {
                        'actIndex': '2',
                        'material': '272'
                    },
                },

                //MS手链-14K金
                {
                    'pcUrl': /^\/jewellery\/bracelet-14k-gold$/,
                    'mobileUrl': `/accessories/list`,
                    'params': {
                        'actIndex': '2',
                        'material': '273'
                    },
                },

                //MS手链-18K金
                {
                    'pcUrl': /^\/jewellery\/bracelet-18k-gold$/,
                    'mobileUrl': `/accessories/list`,
                    'params': {
                        'actIndex': '2',
                        'material': '274'
                    },
                },

                // MS手链人群-浪漫女士
                {
                    'pcUrl': /^\/jewellery\/bracelet-Romantic-lady$/,
                    'mobileUrl': `/accessories/list`,
                    'params': {
                        'actIndex': '2'
                    },
                },

                // MS手链人群-尊贵男士
                {
                    'pcUrl': /^\/jewellery\/bracelet-distinguished-man$/,
                    'mobileUrl': `/accessories/list`,
                    'params': {
                        'actIndex': '2'
                    },
                },

                // MS手链镶嵌-群镶
                {
                    'pcUrl': /^\/jewellery\/bracelet-group-setting$/,
                    'mobileUrl': `/accessories/list`,
                    'params': {
                        'actIndex': '2'
                    },
                },

                // MS手链镶嵌-单钻
                {
                    'pcUrl': /^\/jewellery\/bracelet-single-drill$/,
                    'mobileUrl': `/accessories/list`,
                    'params': {
                        'actIndex': '2'
                    },
                },

                // MS手链风格-简约时尚
                {
                    'pcUrl': /^\/jewellery\/bracelet-Simple-and-stylish$/,
                    'mobileUrl': `/accessories/list`,
                    'params': {
                        'actIndex': '2',
                        // 'style': '277'
                    },
                },

                // MS手链风格-职场通勤
                {
                    'pcUrl': /^\/jewellery\/bracelet-workplace-commute$/,
                    'mobileUrl': `/accessories/list`,
                    'params': {
                        'actIndex': '2',
                        // 'style': '277'
                    },
                },

                // MS手链风格-个性玩趣
                {
                    'pcUrl': /^\/jewellery\/bracelet-fun-with-personality$/,
                    'mobileUrl': `/accessories/list`,
                    'params': {
                        'actIndex': '2',
                        // 'style': '277'
                    },
                },

                // MS手链风格-潮流经典
                {
                    'pcUrl': /^\/jewellery\/bracelet-Trend-classic$/,
                    'mobileUrl': `/accessories/list`,
                    'params': {
                        'actIndex': '2',
                        // 'style': '277'
                    },
                },

                // MS手链-价格(0-500)
                {
                    'pcUrl': /^\/jewellery\/bracelets\?priceRange=WzAsNTAwXQ%3D%3D$/,
                    'mobileUrl': `/accessories/list`,
                    'params': {
                        'actIndex': '2',
                        'startPrice': '0',
                        'endPrice': '500'
                    },
                },

                // MS手链-价格(500-1000)
                {
                    'pcUrl': /^\/jewellery\/bracelets\?priceRange=WzUwMCwxMDAwXQ%3D%3D$/,
                    'mobileUrl': `/accessories/list`,
                    'params': {
                        'actIndex': '2',
                        'startPrice': '500',
                        'endPrice': '1000'
                    },
                },

                // MS手链-价格(1000-5000)
                {
                    'pcUrl': /^\/jewellery\/bracelets\?priceRange=WzEwMDAsNTAwMF0%3D$/,
                    'mobileUrl': `/accessories/list`,
                    'params': {
                        'actIndex': '2',
                        'startPrice': '1000',
                        'endPrice': '5000'
                    },
                },

                // MS手链-价格(5000-10000)
                {
                    'pcUrl': /^\/jewellery\/bracelets\?priceRange=WzUwMDAsMTAwMDBd$/,
                    'mobileUrl': `/accessories/list`,
                    'params': {
                        'actIndex': '2',
                        'startPrice': '5000',
                        'endPrice': '10000'
                    },
                },

                // MS手链-价格(10000以上)
                {
                    'pcUrl': /^\/jewellery\/bracelets\?priceRange=WzEwMDAwLDMwMDAwMF0%3D$/,
                    'mobileUrl': `/accessories/list`,
                    'params': {
                        'actIndex': '2',
                        'startPrice': '10000',
                        'endPrice': '300000'
                    },
                },

                //MS耳饰-字母系列
                {
                    'pcUrl': /^\/jewellery\/earring-letter-series$/,
                    'mobileUrl': `/accessories/list`,
                    'params': {
                        'actIndex': '4',
                        'series': '288'
                    },
                },

                //MS耳饰-合金
                {
                    'pcUrl': /^\/jewellery\/earring-alloy$/,
                    'mobileUrl': `/accessories/list`,
                    'params': {
                        'actIndex': '4',
                        'material': '204'
                    },
                },

                //MS耳饰-925银
                {
                    'pcUrl': /^\/jewellery\/earring-925-silver$/,
                    'mobileUrl': `/accessories/list`,
                    'params': {
                        'actIndex': '4',
                        'material': '35'
                    },
                },

                //MS耳饰-9K金
                {
                    'pcUrl': /^\/jewellery\/earring-9k-gold$/,
                    'mobileUrl': `/accessories/list`,
                    'params': {
                        'actIndex': '4',
                        'material': '272'
                    },
                },

                //MS耳饰-14K金
                {
                    'pcUrl': /^\/jewellery\/earring-14k-gold$/,
                    'mobileUrl': `/accessories/list`,
                    'params': {
                        'actIndex': '4',
                        'material': '273'
                    },
                },

                //MS类别-耳环
                {
                    'pcUrl': /^\/jewellery\/Earrings$/,
                    'mobileUrl': `/accessories/list`,
                    'params': {
                        'actIndex': '5'
                    },
                },

                //MS类别-耳钉
                {
                    'pcUrl': /^\/jewellery\/earStud$/,
                    'mobileUrl': `/accessories/list`,
                    'params': {
                        'actIndex': '6'
                    },
                },

                //MS类别-耳线
                {
                    'pcUrl': /^\/jewellery\/EarLine$/,
                    'mobileUrl': `/accessories/list`,
                    'params': {
                        'actIndex': '7'
                    },
                },

                //MS类别-耳坠
                {
                    'pcUrl': /^\/jewellery\/EarDrop$/,
                    'mobileUrl': `/accessories/list`,
                    'params': {
                        'actIndex': '8'
                    },
                },


                //MS耳饰-18K金
                {
                    'pcUrl': /^\/jewellery\/earring-18k-gold$/,
                    'mobileUrl': `/accessories/list`,
                    'params': {
                        'actIndex': '4',
                        'material': '274'
                    },
                },

                // MS耳饰风格-简约时尚
                {
                    'pcUrl': /^\/jewellery\/earring-Simple-and-stylish$/,
                    'mobileUrl': `/accessories/list`,
                    'params': {
                        'actIndex': '4',
                        // 'style': '277'
                    },
                },

                // MS耳饰风格-职场通勤
                {
                    'pcUrl': /^\/jewellery\/earring-workplace-commute$/,
                    'mobileUrl': `/accessories/list`,
                    'params': {
                        'actIndex': '4',
                        // 'style': '277'
                    },
                },

                // MS耳饰风格-个性玩趣
                {
                    'pcUrl': /^\/jewellery\/earring-fun-with-personality$/,
                    'mobileUrl': `/accessories/list`,
                    'params': {
                        'actIndex': '4',
                        // 'style': '277'
                    },
                },

                // MS耳饰风格-潮流经典
                {
                    'pcUrl': /^\/jewellery\/earring-Trend-classic$/,
                    'mobileUrl': `/accessories/list`,
                    'params': {
                        'actIndex': '4',
                        // 'style': '277'
                    },
                },

                // MS耳饰-价格(0-500)
                {
                    'pcUrl': /^\/jewellery\/Earring\?priceRange=WzAsNTAwXQ%3D%3D$/,
                    'mobileUrl': `/accessories/list`,
                    'params': {
                        'actIndex': '4',
                        'startPrice': '0',
                        'endPrice': '500'
                    },
                },

                // MS耳饰-价格(500-1000)
                {
                    'pcUrl': /^\/jewellery\/Earring\?priceRange=WzUwMCwxMDAwXQ%3D%3D$/,
                    'mobileUrl': `/accessories/list`,
                    'params': {
                        'actIndex': '4',
                        'startPrice': '500',
                        'endPrice': '1000'
                    },
                },

                // MS耳饰-价格(1000-5000)
                {
                    'pcUrl': /^\/jewellery\/Earring\?priceRange=WzEwMDAsNTAwMF0%3D$/,
                    'mobileUrl': `/accessories/list`,
                    'params': {
                        'actIndex': '4',
                        'startPrice': '1000',
                        'endPrice': '5000'
                    },
                },

                // MS耳饰-价格(5000-10000)
                {
                    'pcUrl': /^\/jewellery\/Earring\?priceRange=WzUwMDAsMTAwMDBd$/,
                    'mobileUrl': `/accessories/list`,
                    'params': {
                        'actIndex': '4',
                        'startPrice': '5000',
                        'endPrice': '10000'
                    },
                },

                // MS耳饰-价格(10000以上)
                {
                    'pcUrl': /^\/jewellery\/Earring\?priceRange=WzEwMDAwLDMwMDAwMF0%3D$/,
                    'mobileUrl': `/accessories/list`,
                    'params': {
                        'actIndex': '4',
                        'startPrice': '10000',
                        'endPrice': '300000'
                    },
                },

                //MS设计师系列-字母系列
                {
                    'pcUrl': /^\/designer\/designer-letter-series$/,
                    'mobileUrl': `/designers/list`,
                    'params': {
                        'series': '288'
                    },
                },

                //MS设计师系列-合金
                {
                    'pcUrl': /^\/designer\/bracelet-alloy$/,
                    'mobileUrl': `/designers/list`,
                    'params': {
                        'material': '204'
                    },
                },

                //MS设计师系列-925银
                {
                    'pcUrl': /^\/designer\/bracelet-925-silver$/,
                    'mobileUrl': `/designers/list`,
                    'params': {
                        'material': '35'
                    },
                },

                //MS设计师系列-9K金
                {
                    'pcUrl': /^\/designer\/bracelet-9k-gold$/,
                    'mobileUrl': `/designers/list`,
                    'params': {
                        'material': '272'
                    },
                },

                //MS设计师系列-14K金
                {
                    'pcUrl': /^\/designer\/bracelet-14k-gold$/,
                    'mobileUrl': `/designers/list`,
                    'params': {
                        'material': '273'
                    },
                },

                //MS设计师系列-18K金
                {
                    'pcUrl': /^\/designer\/bracelet-18k-gold$/,
                    'mobileUrl': `/designers/list`,
                    'params': {
                        'material': '274'
                    },
                },

                // MS设计师系列风格-现代简约
                {
                    'pcUrl': /^\/designer\/designer-modern-simplicity$/,
                    'mobileUrl': `/designers/list`,
                    'params': {
                        'style': '277'
                    },
                },

                // MS设计师系列风格-经典复古
                {
                    'pcUrl': /^\/designer\/designer-classic-retro$/,
                    'mobileUrl': `/designers/list`,
                    'params': {
                        'style': '278'
                    },
                },

                // MS设计师系列风格-个性玩趣
                {
                    'pcUrl': /^\/designer\/designer-fun-with-personality$/,
                    'mobileUrl': `/designers/list`,
                    'params': {
                        'style': '279'
                    },
                },

                // MS设计师系列风格-时尚限定
                {
                    'pcUrl': /^\/designer\/designer-fashion-limited$/,
                    'mobileUrl': `/designers/list`,
                    'params': {
                        'style': '280'
                    },
                },

                

                // 猫闪end






                // 戒指专题页   ring/wedding-rings
                {
                    'pcUrl': /^\/wedding-rings\/?$/,
                    'mobileUrl': `/marriage-ring`
                },
                //求婚戒指
                {
                    'pcUrl': /^\/wedding-rings\/proposal-ring$/,
                    'mobileUrl': `/marriage-ring/single-ring`,
                    'params': {
                        'style': '162',
                    },
                },
                //订婚戒指
                {
                    'pcUrl': /^\/wedding-rings\/engagement-ring$/,
                    'mobileUrl': `/marriage-ring/single-ring`,
                    'params': {
                        'style': '160',
                    },
                },
                //结婚戒指
                {
                    'pcUrl': /^\/wedding-rings\/wedding-ring$/,
                    'mobileUrl': `/marriage-ring/single-ring`,
                    'params': {
                        'style': '161',
                    },
                },
                //套接
                {
                    'pcUrl': /^\/wedding-rings\/ring$/,
                    'mobileUrl': `/marriage-ring/single-ring`,
                    'params': {
                        'style': '164',
                    },
                },
                //时尚戒指
                {
                    'pcUrl': /^\/wedding-rings\/fashion-ring$/,
                    'mobileUrl': `/marriage-ring/single-ring`,
                    'params': {
                        'style': '163',
                    },
                },
                // 情侣对戒
                {
                    'pcUrl': /^\/wedding-rings\/classic-series$/,
                    'mobileUrl': `/marriage-ring/pair-ring`
                },
                //18K白
                {
                    'pcUrl': /^\/wedding-rings\/18k-white$/,
                    'mobileUrl': `/marriage-ring/single-ring`,
                    'params': {
                        'material': '28',
                    },
                },
                //18K黄金
                {
                    'pcUrl': /^\/wedding-rings\/18k-yellow$/,
                    'mobileUrl': `/marriage-ring/single-ring`,
                    'params': {
                        'material': '29',
                    },
                },
                //18K玫瑰金
                {
                    'pcUrl': /^\/wedding-rings\/18k-rose-gold$/,
                    'mobileUrl': `/marriage-ring/single-ring`,
                    'params': {
                        'material': '30',
                    },
                },
                //铂金
                {
                    'pcUrl': /^\/wedding-rings\/platinum$/,
                    'mobileUrl': `/marriage-ring/single-ring`,
                    'params': {
                        'material': '34',
                    },
                },
                //银
                {
                    'pcUrl': /^\/wedding-rings\/channel-set$/,
                    'mobileUrl': `/marriage-ring/single-ring`,
                    'params': {
                        'material': '35',
                    },
                },
                //戒指 价格0-1000
                {
                    'pcUrl': /^\/wedding-rings\/all\?priceRange=WzAsOTk5XQ%3D%3D$/,
                    'mobileUrl': `/marriage-ring/single-ring`,
                    'params': {
                        'startPrice': '0',
                        'endPrice': '999'
                    },
                },
                //戒指 价格1000-1999
                {
                    'pcUrl': /^\/wedding-rings\/all\?priceRange=WzEwMDAsMTk5OV0%3D$/,
                    'mobileUrl': `/marriage-ring/single-ring`,
                    'params': {
                        'startPrice': '1000',
                        'endPrice': '1999'
                    },
                },
                //戒指 价格2000-2999
                {
                    'pcUrl': /^\/wedding-rings\/all\?priceRange=WzIwMDAsMjk5OV0%3D$/,
                    'mobileUrl': `/marriage-ring/single-ring`,
                    'params': {
                        'startPrice': '2000',
                        'endPrice': '2999'
                    },
                },
                //戒指 价格3000-4999
                {
                    'pcUrl': /^\/wedding-rings\/all\?priceRange=WzMwMDAsNDk5OV0%3D$/,
                    'mobileUrl': `/marriage-ring/single-ring`,
                    'params': {
                        'startPrice': '3000',
                        'endPrice': '4999'
                    },
                },
                //戒指 价格5000以上
                {
                    'pcUrl': /^\/wedding-rings\/all\?priceRange=WzUwMDAsMzAwMDAwXQ%3D%3D$/,
                    'mobileUrl': `/marriage-ring/single-ring`,
                    'params': {
                        'startPrice': '5000',
                        'endPrice': '300000'
                    },
                },
                //戒指其他链接
                {
                    'pcUrl': /^\/wedding-rings\/?/,
                    'mobileUrl': `/marriage-ring/single-ring`,
                },

                //项链
                {
                    'pcUrl': /^\/jewellery\/necklaces$/,
                    'mobileUrl': `/accessories/list`,
                    'params': {
                        'actIndex': '0',
                    },
                },

                //吊坠
                {
                    'pcUrl': /^\/jewellery\/pendants$/,
                    'mobileUrl': `/accessories/list`,
                    'params': {
                        'actIndex': '1',
                    },
                },
                //手链
                {
                    'pcUrl': /^\/jewellery\/bracelets$/,
                    'mobileUrl': `/accessories/list`,
                    'params': {
                        'actIndex': '4',
                    },
                },
                //手镯
                {
                    'pcUrl': /^\/jewellery\/bangles$/,
                    'mobileUrl': `/accessories/list`,
                    'params': {
                        'actIndex': '5',
                    },
                },
                //耳环
                {
                    'pcUrl': /^\/jewellery\/earrings$/,
                    'mobileUrl': `/accessories/list`,
                    'params': {
                        'actIndex': '3',
                    },
                },
                //耳钉
                {
                    'pcUrl': /^\/jewellery\/ear-stud$/,
                    'mobileUrl': `/accessories/list`,
                    'params': {
                        'actIndex': '2',
                    },
                },
                //摆件
                {
                    'pcUrl': /^\/jewellery\/decoration$/,
                    'mobileUrl': `/accessories/list`,
                    'params': {
                        'actIndex': '6',
                    },
                },
                //挂件
                {
                    'pcUrl': /^\/jewellery\/widgets$/,
                    'mobileUrl': `/accessories/list`,
                    'params': {
                        'actIndex': '7',
                    },
                },
                //其他
                {
                    'pcUrl': /^\/jewellery\/others$/,
                    'mobileUrl': `/accessories/list`,
                    'params': {
                        'actIndex': '8',
                    },
                },

                //项链-吊坠
                {
                    'pcUrl': /^\/jewellery\/necklace-pendant$/,
                    'mobileUrl': `/accessories/list`,
                    'params': {
                        'actIndex': '0',
                    },
                },
                //手链-手镯
                {
                    'pcUrl': /^\/jewellery\/bracelet-bangle$/,
                    'mobileUrl': `/accessories/list`,
                    'params': {
                        'actIndex': '4',
                    },
                },
                //耳环-耳钉
                {
                    'pcUrl': /^\/jewellery\/earrings-stud$/,
                    'mobileUrl': `/accessories/list`,
                    'params': {
                        'actIndex': '3',
                    },
                },
                //摆件-挂件
                {
                    'pcUrl': /^\/jewellery\/decoration-widgets$/,
                    'mobileUrl': `/accessories/list`,
                    'params': {
                        'actIndex': '6',
                    },
                },


                //项链--18K白金
                {
                    'pcUrl': /^\/jewellery\/necklace-pendant-18k-white$/,
                    'mobileUrl': `/accessories/list`,
                    'params': {
                        'actIndex': '0',
                        'material': '28'
                    },
                },
                //项链--18K黄金
                {
                    'pcUrl': /^\/jewellery\/necklace-pendant-18K-yellow$/,
                    'mobileUrl': `/accessories/list`,
                    'params': {
                        'actIndex': '0',
                        'material': '29'
                    },
                },
                //项链--18K玫瑰金
                {
                    'pcUrl': /^\/jewellery\/necklace-pendan-18k-rose-gold$/,
                    'mobileUrl': `/accessories/list`,
                    'params': {
                        'actIndex': '0',
                        'material': '30'
                    },
                },
                //项链--铂金
                {
                    'pcUrl': /^\/jewellery\/necklace-pendant-platinum$/,
                    'mobileUrl': `/accessories/list`,
                    'params': {
                        'actIndex': '0',
                        'material': '34'
                    },
                },
                //项链--银
                {
                    'pcUrl': /^\/jewellery\/necklace-pendant-fineSilver$/,
                    'mobileUrl': `/accessories/list`,
                    'params': {
                        'actIndex': '0',
                        'material': '35'
                    },
                },


                //手链--18K白金
                {
                    'pcUrl': /^\/jewellery\/bracelet-bangle-18k-white$/,
                    'mobileUrl': `/accessories/list`,
                    'params': {
                        'actIndex': '4',
                        'material': '28'
                    },
                },
                //手链--18K黄金
                {
                    'pcUrl': /^\/jewellery\/bracelet-bangle-18K-yellow$/,
                    'mobileUrl': `/accessories/list`,
                    'params': {
                        'actIndex': '4',
                        'material': '29'
                    },
                },
                //手链--18K玫瑰金
                {
                    'pcUrl': /^\/jewellery\/bracelet-bangle-18k-rose-gold$/,
                    'mobileUrl': `/accessories/list`,
                    'params': {
                        'actIndex': '4',
                        'material': '30'
                    },
                },
                //手链--铂金
                {
                    'pcUrl': /^\/jewellery\/bracelet-bangle-platinum$/,
                    'mobileUrl': `/accessories/list`,
                    'params': {
                        'actIndex': '4',
                        'material': '34'
                    },
                },
                //手链--银
                {
                    'pcUrl': /^\/jewellery\/bracelet-bangle-fineSilver$/,
                    'mobileUrl': `/accessories/list`,
                    'params': {
                        'actIndex': '4',
                        'material': '35'
                    },
                },

                //项链-吊坠--1000以内
                {
                    'pcUrl': /^\/jewellery\/necklace-pendant\?priceRange=WzAsOTk5XQ%3D%3D$/,
                    'mobileUrl': `/accessories/list`,
                    'params': {
                        'actIndex': '0',
                        'startPrice': '0',
                        'endPrice': '999'
                    },
                },

                //项链-吊坠--1000-1999
                {
                    'pcUrl': /^\/jewellery\/necklace-pendant\?priceRange=WzEwMDAsMTk5OV0%3D$/,
                    'mobileUrl': `/accessories/list`,
                    'params': {
                        'actIndex': '0',
                        'startPrice': '1000',
                        'endPrice': '1999'
                    },
                },
                //项链-吊坠--2000-2999
                {
                    'pcUrl': /^\/jewellery\/necklace-pendant\?priceRange=WzIwMDAsMjk5OV0%3D$/,
                    'mobileUrl': `/accessories/list`,
                    'params': {
                        'actIndex': '0',
                        'startPrice': '2000',
                        'endPrice': '2999'
                    },
                },
                //项链-吊坠--3000-4999
                {
                    'pcUrl': /^\/jewellery\/necklace-pendant\?priceRange=WzMwMDAsNDk5OV0%3D$/,
                    'mobileUrl': `/accessories/list`,
                    'params': {
                        'actIndex': '0',
                        'startPrice': '3000',
                        'endPrice': '4999'
                    },
                },
                //项链-吊坠--5000以上
                {
                    'pcUrl': /^\/jewellery\/necklace-pendant\?priceRange=WzUwMDAsMzAwMDAwXQ%3D%3D$/,
                    'mobileUrl': `/accessories/list`,
                    'params': {
                        'actIndex': '0',
                        'startPrice': '5000',
                        'endPrice': '300000'
                    },
                },


                //手链-手镯--1000以内
                {
                    'pcUrl': /^\/jewellery\/bracelet-bangle\?priceRange=WzAsOTk5XQ%3D%3D$/,
                    'mobileUrl': `/accessories/list`,
                    'params': {
                        'actIndex': '4',
                        'startPrice': '0',
                        'endPrice': '999'
                    },
                },

                //手链-手镯--1000-1999
                {
                    'pcUrl': /^\/jewellery\/bracelet-bangle\?priceRange=WzEwMDAsMTk5OV0%3D$/,
                    'mobileUrl': `/accessories/list`,
                    'params': {
                        'actIndex': '4',
                        'startPrice': '1000',
                        'endPrice': '1999'
                    },
                },
                //手链-手镯--2000-2999
                {
                    'pcUrl': /^\/jewellery\/bracelet-bangle\?priceRange=WzIwMDAsMjk5OV0%3D$/,
                    'mobileUrl': `/accessories/list`,
                    'params': {
                        'actIndex': '4',
                        'startPrice': '2000',
                        'endPrice': '2999'
                    },
                },
                //手链-手镯--3000-4999
                {
                    'pcUrl': /^\/jewellery\/bracelet-bangle\?priceRange=WzMwMDAsNDk5OV0%3D$/,
                    'mobileUrl': `/accessories/list`,
                    'params': {
                        'actIndex': '4',
                        'startPrice': '3000',
                        'endPrice': '4999'
                    },
                },
                //手链-手镯--5000以上
                {
                    'pcUrl': /^\/jewellery\/bracelet-bangle\?priceRange=WzUwMDAsMzAwMDAwXQ%3D%3D$/,
                    'mobileUrl': `/accessories/list`,
                    'params': {
                        'actIndex': '4',
                        'startPrice': '5000',
                        'endPrice': '300000'
                    },
                },
                //项链-吊坠 情人节
                {
                    'pcUrl': /^\/jewellery\/necklace-pendant-valentines-day$/,
                    'mobileUrl': `/accessories/list`,
                    'params': {
                        'actIndex': '0',
                        'theme': '197',
                    },
                },
                //项链-吊坠 母亲节
                {
                    'pcUrl': /^\/jewellery\/necklace-pendant-mothers-day$/,
                    'mobileUrl': `/accessories/list`,
                    'params': {
                        'actIndex': '0',
                        'theme': '198',
                    },
                },
                //项链-吊坠 生日礼物
                {
                    'pcUrl': /^\/jewellery\/necklace-pendant-birthday-present$/,
                    'mobileUrl': `/accessories/list`,
                    'params': {
                        'actIndex': '0',
                        'theme': '199',
                    },
                },
                //项链-吊坠 圣诞礼物
                {
                    'pcUrl': /^\/jewellery\/necklace-pendant-christmas-gift$/,
                    'mobileUrl': `/accessories/list`,
                    'params': {
                        'actIndex': '0',
                        'theme': '200',
                    },
                },
                //项链-吊坠 万圣节礼物
                {
                    'pcUrl': /^\/jewellery\/necklace-pendant-halloween-gift$/,
                    'mobileUrl': `/accessories/list`,
                    'params': {
                        'actIndex': '0',
                        'theme': '201',
                    },
                },
                //手链-手镯 情人节
                {
                    'pcUrl': /^\/jewellery\/bracelet-bangle-valentines-day$/,
                    'mobileUrl': `/accessories/list`,
                    'params': {
                        'actIndex': '4',
                        'theme': '197',
                    },
                },
                //手链-手镯 母亲节
                {
                    'pcUrl': /^\/jewellery\/bracelet-bangle-mothers-day$/,
                    'mobileUrl': `/accessories/list`,
                    'params': {
                        'actIndex': '4',
                        'theme': '198',
                    },
                },
                //手链-手镯 生日礼物
                {
                    'pcUrl': /^\/jewellery\/bracelet-bangle-birthday-present$/,
                    'mobileUrl': `/accessories/list`,
                    'params': {
                        'actIndex': '4',
                        'theme': '199',
                    },
                },
                //手链-手镯 圣诞礼物
                {
                    'pcUrl': /^\/jewellery\/bracelet-bangle-christmas-gift$/,
                    'mobileUrl': `/accessories/list`,
                    'params': {
                        'actIndex': '4',
                        'theme': '200',
                    },
                },
                //手链-手镯 万圣节礼物
                {
                    'pcUrl': /^\/jewellery\/bracelet-bangle-halloween-gift$/,
                    'mobileUrl': `/accessories/list`,
                    'params': {
                        'actIndex': '4',
                        'theme': '201',
                    },
                },
                //饰品 情人节
                {
                    'pcUrl': /^\/jewellery\/valentines-day$/,
                    'mobileUrl': `/accessories/list`,
                    'params': {
                        'theme': '197',
                    },
                },
                //饰品 母亲节
                {
                    'pcUrl': /^\/jewellery\/mothers-day$/,
                    'mobileUrl': `/accessories/list`,
                    'params': {
                        'theme': '198',
                    },
                },
                //饰品 生日礼物
                {
                    'pcUrl': /^\/jewellery\/birthday-present$/,
                    'mobileUrl': `/accessories/list`,
                    'params': {
                        'theme': '199',
                    },
                },
                //饰品 圣诞礼物
                {
                    'pcUrl': /^\/jewellery\/christmas-gift$/,
                    'mobileUrl': `/accessories/list`,
                    'params': {
                        'theme': '200',
                    },
                },
                //饰品 万圣节礼物
                {
                    'pcUrl': /^\/jewellery\/halloween-gift$/,
                    'mobileUrl': `/accessories/list`,
                    'params': {
                        'theme': '201',
                    },
                },
                //戒托 ---单石戒
                {
                    'pcUrl': /^\/engagement-rings\/solitaire$/,
                    'mobileUrl': `/engagement/list`,
                    'params': {
                        'style': '109',
                    },
                },
                //戒托 开口戒
                {
                    'pcUrl': /^\/engagement-rings\/jump$/,
                    'mobileUrl': `/engagement/list`,
                    'params': {
                        'style': '110',
                    },
                },
                //戒托 爪镶戒
                {
                    'pcUrl': /^\/engagement-rings\/halo-set$/,
                    'mobileUrl': `/engagement/list`,
                    'params': {
                        'style': '114',
                    },
                },
                //戒托 群镶戒
                {
                    'pcUrl': /^\/engagement-rings\/pave-set$/,
                    'mobileUrl': `/engagement/list`,
                    'params': {
                        'style': '111',
                    },
                },
                //戒托 三主石戒
                {
                    'pcUrl': /^\/engagement-rings\/three-stone$/,
                    'mobileUrl': `/engagement/list`,
                    'params': {
                        'style': '115',
                    },
                },
                //戒托 18k白金
                {
                    'pcUrl': /^\/engagement-rings\/18k-white$/,
                    'mobileUrl': `/engagement/list`,
                    'params': {
                        'material': '28',
                    },
                },
                //戒托 18k黄金
                {
                    'pcUrl': /^\/engagement-rings\/18k-yellow$/,
                    'mobileUrl': `/engagement/list`,
                    'params': {
                        'material': '29',
                    },
                },
                //戒托 18k玫瑰金
                {
                    'pcUrl': /^\/engagement-rings\/18k-rose-gold$/,
                    'mobileUrl': `/engagement/list`,
                    'params': {
                        'material': '30',
                    },
                },
                //戒托 铂金
                {
                    'pcUrl': /^\/engagement-rings\/platinum$/,
                    'mobileUrl': `/engagement/list`,
                    'params': {
                        'material': '34',
                    },
                },
                //戒托 银
                {
                    'pcUrl': /^\/engagement-rings\/channel-set$/,
                    'mobileUrl': `/engagement/list`,
                    'params': {
                        'material': '35',
                    },
                },
                // 戒托
                {
                    'pcUrl': /^\/engagement-rings\/?$/,
                    'mobileUrl': `/engagement`
                },
                // 戒托详情
                {
                    'pcUrl': /^\/ring\/engagement-rings/,
                    'mobileUrl': `/engagement/engagement-rings`,
                    'params': {
                        'goodId': 'goodId',
                        'ringType': 'ringType',
                    },
                },


                // 戒指 详情
                {
                    'pcUrl': /^\/ring\/wedding-rings\/\d+\?goodId=\d+\&ringType=single/,

                    'mobileUrl': `/marriage-ring/single-ring-detail`,
                    'params': {
                        'goodId': 'goodId',
                        'ringType': 'ringType',
                    },
                },
                // 对戒 详情
                {

                    'pcUrl': /^\/ring\/wedding-rings\/\d+\?goodId=\d+&ringType=pair/,
                    'mobileUrl': `/marriage-ring/pair-ring-detail`,
                    'params': {
                        'goodId': 'goodId',
                        'ringType': 'ringType',
                    },
                },

                // 裸石
                {
                    'pcUrl': /^\/diamonds\/all\?caratRange=WzAsMC4yOV0%3D$/,
                    'mobileUrl': `/diamond/list`,
                    'params': {
                        'startCarat': '0',
                        'endCarat': '0.29'
                    },
                },

                {
                    'pcUrl': /^\/diamonds\/all\?caratRange=WzAuMywwLjQ5XQ%3D%3D$/,
                    'mobileUrl': `/diamond/list`,
                    'params': {
                        'startCarat': '0.3',
                        'endCarat': '0.49'
                    },
                },
                {
                    'pcUrl': /^\/diamonds\/all\?caratRange=WzAuNSwwLjc5XQ%3D%3D$/,
                    'mobileUrl': `/diamond/list`,
                    'params': {
                        'startCarat': '0.5',
                        'endCarat': '0.79'
                    },
                },
                {
                    'pcUrl': /^\/diamonds\/all\?caratRange=WzAuOCwwLjk5XQ%3D%3D$/,
                    'mobileUrl': `/diamond/list`,
                    'params': {
                        'startCarat': '0.8',
                        'endCarat': '0.99'
                    },
                },
                {
                    'pcUrl': /^\/diamonds\/all\?caratRange=WzEsMS40OV0%3D$/,
                    'mobileUrl': `/diamond/list`,
                    'params': {
                        'startCarat': '1',
                        'endCarat': '1.49'
                    },
                },
                {
                    'pcUrl': /^\/diamonds\/all\?caratRange=WzEuNSwxMF0%3D$/,
                    'mobileUrl': `/diamond/list`,
                    'params': {
                        'startCarat': '1.5',
                        'endCarat': '10'
                    },
                },




                {
                    'pcUrl': /^\/diamonds\/round-cut$/,
                    'mobileUrl': `/diamond/list`,
                    'params': {
                        'shape': '16',
                    },
                },

                {
                    'pcUrl': /^\/diamonds\/asscher-cut$/,
                    'mobileUrl': `/diamond/list`,
                    'params': {
                        'shape': '17',
                    },
                },
                {
                    'pcUrl': /^\/diamonds\/princess-cut$/,
                    'mobileUrl': `/diamond/list`,
                    'params': {
                        'shape': '54',
                    },
                },
                {
                    'pcUrl': /^\/diamonds\/emerald-cut$/,
                    'mobileUrl': `/diamond/list`,
                    'params': {
                        'shape': '55',
                    },
                },
                {
                    'pcUrl': /^\/diamonds\/heart-shaped$/,
                    'mobileUrl': `/diamond/list`,
                    'params': {
                        'shape': '56',
                    },
                },
                {
                    'pcUrl': /^\/diamonds\/marquise-cut$/,
                    'mobileUrl': `/diamond/list`,
                    'params': {
                        'shape': '57',
                    },
                },
                {
                    'pcUrl': /^\/diamonds\/cushion-cut$/,
                    'mobileUrl': `/diamond/list`,
                    'params': {
                        'shape': '58',
                    },
                },
                {
                    'pcUrl': /^\/diamonds\/pear-shaped$/,
                    'mobileUrl': `/diamond/list`,
                    'params': {
                        'shape': '59',
                    },
                },
                {
                    'pcUrl': /^\/diamonds\/asscher-cut$/,
                    'mobileUrl': `/diamond/list`,
                    'params': {
                        'shape': '60',
                    },
                },
                {
                    'pcUrl': /^\/diamonds\/radiant-cut$/,
                    'mobileUrl': `/diamond/list`,
                    'params': {
                        'shape': '61',
                    },
                },
                {
                    'pcUrl': /^\/diamonds/,
                    'mobileUrl': `/diamond/list`
                },

                // 裸石详情
                {
                    'pcUrl': /^\/diamond-details/,
                    'mobileUrl': `/diamond/diamonds`,
                    'params': {
                        'goodId': 'goodId'

                    },
                },


                // 选择戒托  build-your-own-ring/settings
                {
                    'pcUrl': /^\/build-your-own-ring\/settings/,
                    'mobileUrl': `/custom-made/ring-made/ring-list`,
                    'params': {
                        'steps': 'melo',
                        'step': 'step',
                    },
                },
                // 选择戒托戒托详情
                {
                    'pcUrl': /^\/build-your-own-ring\/setting-details/,
                    'mobileUrl': `/custom-made/ring-made/ring-detail`,
                    'params': {
                        'goodId': 'goodId',
                        'ringType': 'ringType',
                        'steps': 'melo',
                        'step': 'step'
                    },
                },

                // 选择莫桑石 build-your-own-ring/diamonds
                {
                    'pcUrl': /^\/build-your-own-ring\/diamonds/,
                    'mobileUrl': `/custom-made/diamond-made/diamond-list`,
                    'params': {
                        'steps': 'melo',
                        'step': 'step',
                    },
                },

                // 选择莫桑石莫桑石详情
                {
                    'pcUrl': /^\/build-your-own-ring\/diamond-details/,
                    'mobileUrl': `/custom-made/diamond-made/diamond-detail`,
                    'params': {
                        'goodId': 'goodId',
                        'steps': 'melo',
                        'step': 'step'
                    },
                },

                // 珠宝首饰详情   /jewellery/all
                {
                    'pcUrl': /^\/jewellery\/(all|necklace|pendant|studEarring|earring|bracelet|braceletLine|decoration|widgets|others)\/\d/,
                    'mobileUrl': `/accessories/accessories`,
                    'params': {
                        'goodId': 'goodId',
                    },
                },
                // 知识
                //克拉
                {
                    'pcUrl': /^\/education\/diamonds\/carat\/?$/,
                    'mobileUrl': `/help-pages/diamondCarat`
                },
                {
                    'pcUrl': /^\/education\/diamonds\/cut\/?$/,
                    'mobileUrl': `/help-pages/diamondCut`
                },
                {
                    'pcUrl': /^\/education\/diamonds\/color\/?$/,
                    'mobileUrl': `/help-pages/diamondColor`
                },
                {
                    'pcUrl': /^\/education\/diamonds\/clarity\/?$/,
                    'mobileUrl': `/help-pages/diamondCleanliness`
                },
                {
                    'pcUrl': /^\/education\/diamonds\/shape\/?$/,
                    'mobileUrl': `/help-pages/diamondShape`
                },
                {
                    'pcUrl': /^\/education\/diamonds\/certification\/?$/,
                    'mobileUrl': `/help-pages/proof`
                },

                //莫桑石护理
                {
                    'pcUrl': /^\/education\/diamonds\/maintenance\/?$/,
                    'mobileUrl': `/help-pages/diamondCarat`
                },
                {
                    'pcUrl': /^\/education\/rings\/size\/?$/,
                    'mobileUrl': `/help-pages/sizeguide`
                },

                {
                    'pcUrl': /^\/policies\/payment-methods\/?$/,
                    'mobileUrl': `/help-pages/paymentMethod`
                },
                {
                    'pcUrl': /^\/policies\/quality-value\/?$/,
                    'mobileUrl': `/help-pages/qualityValue`
                },
                {
                    'pcUrl': /^\/policies\/return-refund-policy\/?$/,
                    'mobileUrl': `/help-pages/paymentMethod`
                },
                {
                    'pcUrl': /^\/policies\/free-shipping\/?$/,
                    'mobileUrl': `/help-pages/freeShipping`
                },
                {
                    'pcUrl': /^\/policies\/shipping\/?$/,
                    'mobileUrl': `/help-pages/deliveryPolicy`
                },
                {
                    'pcUrl': /^\/policies\/international\/?$/,
                    'mobileUrl': `/help-pages/internationalPolicy`
                },
                {
                    'pcUrl': /^\/policies\/privacy-policy\/?$/,
                    'mobileUrl': `/help-pages/privacyPolicy`
                },
                {
                    'pcUrl': /^\/policies\/terms-and-conditions\/?$/,
                    'mobileUrl': `/help-pages/clause`
                },


                //搜索
                {
                    'pcUrl': /^\/search/,
                    'mobileUrl': `/search/result`,
                    'params': {
                        'keyword': 'keyword'

                    },
                },

                //购物车
                {
                    'pcUrl': /^\/shopping-cart\/?$/,
                    'mobileUrl': `/cart`,

                },
                //密码
                {
                    'pcUrl': /^\/reset-password\/?$/,
                    'mobileUrl': `/forget`,

                },

            ]

            if (href.length > 0) {
                let currUrl = href.length > 1 ? href[0] + "?" + href[1] : href[0]

                for (let i = 0; i < rules.length; i++) {
                    let rule = rules[i]

                    if ((rule['pcUrl']).test(currUrl)) {
                        let url = host + rule['mobileUrl']
                        let param = ''
                        if (typeof rule['params'] !== 'undefined') {
                            let params = rule['params'];
                            let query2 = {}
                            let query1 = getQueryFromUrl(req.originalUrl)


                            Object.keys(params).forEach(function (key) {
                                if (typeof query1[key] !== 'undefined') {
                                    query2[params[key]] = unescape(query1[key])
                                } else {
                                    query2[key] = unescape(params[key])
                                }
                            });
                            // param = queryParams(query2)
                            href[1] = queryParams(query2)
                        }

                        if (href.length > 1) {
                            url = url + '?' + param + href[1]
                        }

                        redirect(url)
                        return
                    }
                }
            }

            // console.log(url)
            redirect(host)
            return
        }
        // console.log("req.originalUrl----", req.originalUrl)
        toWapUrl(req.originalUrl)
    }
}

