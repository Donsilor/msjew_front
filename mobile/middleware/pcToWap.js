export default function ({ req, res, redirect, store, route }) {
    // console.log('req==================>', req)
    // console.log('res==================>', res)
    function isWap (u) {
        // var u = navigator.userAgent, app = navigator.appVersion;
        return !!u.match(/AppleWebKit.*Mobile.*/)
        // ||                   //是否为移动终端
        //     (u.indexOf('Trident') > -1||                            //IE内核
        //     u.indexOf('Presto') > -1 ||                             //opera内核
        //     u.indexOf('AppleWebKit') > -1||                         //苹果、谷歌内核
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
        for (let n = 0, length = query.length; n < length; n++) {
            const item = query[n].split('=')
            result[item[0]] = item[1]
        }
        return result
    }

    function queryParams (data) {
        // console.log("sssss",data)
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

        //console.log('headerHost',headerHost);
        if (isWap(u)) {
            return
        }
        // https://www.bdd.bddia.com   https://www.bddco.com
        //头部host
        let headerHost = req.headers['host']
        //生产环境
        let host = 'https://www.bddco.com';
        if (!(/bddco\.com/).test(headerHost)) {

            if ((/^(wap-cn|wap-us)\.bddia\.com/).test(headerHost)) {
                //测试环境
                host = 'https://' + headerHost.replace('wap-', '');
            } else if (headerHost == 'wap.bddia.com') {
                host = 'https://www.bddia.com';
            } else {
                //本地
                host = 'http://' + headerHost;
            }
        } else if ((/^(wap-cn|wap-us)\.bddco\.com/).test(headerHost)) {
            //生产环境
            host = 'https://' + headerHost.replace('wap-', '');
        }

        const toWapUrl = path => {
            if (path === '/undefined') {
                return
            }

            let href = path.split('?')
            let rules = [
                // 首页
                {
                    'mobileUrl': /^\/?$/,
                    'pcUrl': `/`,
                },
                // 登录
                {
                    'mobileUrl': /\/login/,
                    'pcUrl': `/login`
                },
                // 注册  /login?type=register  /login/email
                {
                    'mobileUrl': /\/register/,
                    'pcUrl': `/login?type=register`
                },


                //戒指
                {
                    'mobileUrl': /^\/marriage-ring\/?$/,
                    'pcUrl': `/wedding-rings`
                },

                //求婚戒指
                {
                    'mobileUrl': /^\/marriage-ring\/single-ring\?style=162/,
                    'pcUrl': `/wedding-rings/proposal-ring`,
                    'params': {
                        'param': 'none',
                    },
                },

                //订婚戒指
                {
                    'mobileUrl': /^\/marriage-ring\/single-ring\?style=160/,
                    'pcUrl': `/wedding-rings/engagement-ring`,
                    'params': {
                        'param': 'none',
                    },
                },
                //结婚戒指
                {
                    'mobileUrl': /^\/marriage-ring\/single-ring\?style=161/,
                    'pcUrl': `/wedding-rings/wedding-ring`,
                    'params': {
                        'param': 'none',
                    },
                },
                //套戒
                {
                    'mobileUrl': /^\/marriage-ring\/single-ring\?style=164/,
                    'pcUrl': `/wedding-rings/ring`,
                    'params': {
                        'param': 'none',
                    },
                },
                //时尚戒指
                {
                    'mobileUrl': /^\/marriage-ring\/single-ring\?style=163/,
                    'pcUrl': `/wedding-rings/fashion-ring`,
                    'params': {
                        'param': 'none',
                    },
                },
                //情侣对戒
                {
                    'mobileUrl': /^\/marriage-ring\/pair-ring$/,
                    'pcUrl': `/wedding-rings/classic-series`,

                },
                //18K白
                {
                    'mobileUrl': /^\/marriage-ring\/single-ring\?material=28/,
                    'pcUrl': `/wedding-rings/18k-white`,
                    'params': {
                        'param': 'none',
                    },
                },
                //18K黄金
                {
                    'mobileUrl': /^\/marriage-ring\/single-ring\?material=29/,
                    'pcUrl': `/wedding-rings/18k-yellow`,
                    'params': {
                        'param': 'none',
                    },
                },
                //18K玫瑰金
                {
                    'mobileUrl': /^\/marriage-ring\/single-ring\?material=30/,
                    'pcUrl': `/wedding-rings/18k-rose-gold`,
                    'params': {
                        'param': 'none',
                    },
                },
                //铂金
                {
                    'mobileUrl': /^\/marriage-ring\/single-ring\?material=35/,
                    'pcUrl': `/wedding-rings/channel-set`,
                    'params': {
                        'param': 'none',
                    },
                },
                //戒指 价格0-1000
                {
                    'mobileUrl': /^\/marriage-ring\/single-ring\?startPrice=0&endPrice=999/,
                    'pcUrl': `/wedding-rings/all`,
                    'params': {
                        'priceRange': 'WzAsOTk5XQ%3D%3D',
                    },
                },
                //戒指 价格1000-1999
                {
                    'mobileUrl': /^\/marriage-ring\/single-ring\?startPrice=1000&endPrice=1999/,
                    'pcUrl': `/wedding-rings/all`,
                    'params': {
                        'priceRange': 'WzEwMDAsMTk5OV0%3D',
                    },
                },
                //戒指 价格2000-2999
                {
                    'mobileUrl': /^\/marriage-ring\/single-ring\?startPrice=2000&endPrice=2999/,
                    'pcUrl': `/wedding-rings/all`,
                    'params': {
                        'priceRange': 'WzIwMDAsMjk5OV0%3D',
                    },
                },
                //戒指 价格3000-4999
                {
                    'mobileUrl': /^\/marriage-ring\/single-ring\?startPrice=3000&endPrice=4999/,
                    'pcUrl': `/wedding-rings/all`,
                    'params': {
                        'priceRange': 'WzMwMDAsNDk5OV0%3D',
                    },
                },
                //戒指 价格5000以上
                {
                    'mobileUrl': /^\/marriage-ring\/single-ring\?startPrice=5000&endPrice=300000/,
                    'pcUrl': `/wedding-rings/all`,
                    'params': {
                        'priceRange': 'WzUwMDAsMzAwMDAwXQ%3D%3D',
                    },
                },

                //戒指
                {
                    'mobileUrl': /^\/marriage-ring\/single-ring$/,
                    'pcUrl': `/wedding-rings/all`
                },
                //项链
                {
                    'mobileUrl': /^\/accessories\/list\?actIndex=0$/,
                    'pcUrl': `/jewellery/necklaces`,
                    'params': {
                        'param': 'none',
                    },
                },
                //吊坠
                {
                    'mobileUrl': /^\/accessories\/list\?actIndex=1$/,
                    'pcUrl': `/jewellery/pendants`,
                    'params': {
                        'param': 'none',
                    },
                },
                //手链
                {
                    'mobileUrl': /^\/accessories\/list\?actIndex=4$/,
                    'pcUrl': `/jewellery/bracelets`,
                    'params': {
                        'param': 'none',
                    },
                },
                //手镯
                {
                    'mobileUrl': /^\/accessories\/list\?actIndex=5$/,
                    'pcUrl': `/jewellery/bangles`,
                    'params': {
                        'param': 'none',
                    },
                },
                //耳环
                {
                    'mobileUrl': /^\/accessories\/list\?actIndex=3$/,
                    'pcUrl': `/jewellery/earrings`,
                    'params': {
                        'param': 'none',
                    },
                },
                //耳钉
                {
                    'mobileUrl': /^\/accessories\/list\?actIndex=2$/,
                    'pcUrl': `/jewellery/ear-stud`,
                    'params': {
                        'param': 'none',
                    },
                },
                //摆件
                {
                    'mobileUrl': /^\/accessories\/list\?actIndex=6$/,
                    'pcUrl': `/jewellery/decoration`,
                    'params': {
                        'param': 'none',
                    },
                },
                //挂件
                {
                    'mobileUrl': /^\/accessories\/list\?actIndex=7$/,
                    'pcUrl': `/jewellery/widgets`,
                    'params': {
                        'param': 'none',
                    },
                },
                //其他
                {
                    'mobileUrl': /^\/accessories\/list\?actIndex=8$/,
                    'pcUrl': `/jewellery/others`,
                    'params': {
                        'param': 'none',
                    },
                },
                //项链--18K白金
                {
                    'mobileUrl': /^\/accessories\/list\?actIndex=0&material=28$/,
                    'pcUrl': `/jewellery/necklace-pendant-18k-white`,
                    'params': {
                        'param': 'none',
                    },
                },
                //项链--18K黄金
                {
                    'mobileUrl': /^\/accessories\/list\?actIndex=0&material=29$/,
                    'pcUrl': `/jewellery/necklace-pendant-18K-yellow`,
                    'params': {
                        'param': 'none',
                    },
                },
                //项链--18K玫瑰金
                {
                    'mobileUrl': /^\/accessories\/list\?actIndex=0&material=30$/,
                    'pcUrl': `/jewellery/necklace-pendant-18k-rose-gold`,
                    'params': {
                        'param': 'none',
                    },
                },
                //项链--铂金
                {
                    'mobileUrl': /^\/accessories\/list\?actIndex=0&material=34$/,
                    'pcUrl': `/jewellery/necklace-pendant-platinum`,
                    'params': {
                        'param': 'none',
                    },
                },
                //项链--银
                {
                    'mobileUrl': /^\/accessories\/list\?actIndex=0&material=35$/,
                    'pcUrl': `/jewellery/necklace-pendant-fineSilver`,
                    'params': {
                        'param': 'none',
                    },
                },

                //手链--18K白金
                {
                    'mobileUrl': /^\/accessories\/list\?actIndex=4&material=28$/,
                    'pcUrl': `/jewellery/bracelet-bangle-18k-white`,
                    'params': {
                        'param': 'none',
                    },
                },
                //手链--18K黄金
                {
                    'mobileUrl': /^\/accessories\/list\?actIndex=4&material=29$/,
                    'pcUrl': `/jewellery/bracelet-bangle-18K-yellow`,
                    'params': {
                        'param': 'none',
                    },
                },
                //手链--18K玫瑰金
                {
                    'mobileUrl': /^\/accessories\/list\?actIndex=4&material=30$/,
                    'pcUrl': `/jewellery/bracelet-bangle-18k-rose-gold`,
                    'params': {
                        'param': 'none',
                    },
                },
                //手链--铂金
                {
                    'mobileUrl': /^\/accessories\/list\?actIndex=4&material=34$/,
                    'pcUrl': `/jewellery/bracelet-bangle-platinum`,
                    'params': {
                        'param': 'none',
                    },
                },
                //手链--银
                {
                    'mobileUrl': /^\/accessories\/list\?actIndex=4&material=35$/,
                    'pcUrl': `/jewellery/bracelet-bangle-fineSilver`,
                    'params': {
                        'param': 'none',
                    },
                },
                //项链-吊坠--1000以内
                {
                    'mobileUrl': /^\/accessories\/list\?actIndex=0&startPrice=0&endPrice=999/,
                    'pcUrl': `/jewellery/necklace-pendant`,
                    'params': {
                        'priceRange': 'WzAsOTk5XQ%3D%3D',
                    },
                },
                //项链-吊坠--1000-1999
                {
                    'mobileUrl': /^\/accessories\/list\?actIndex=0&startPrice=1000&endPrice=1999/,
                    'pcUrl': `/jewellery/necklace-pendant`,
                    'params': {
                        'priceRange': 'WzEwMDAsMTk5OV0%3D',
                    },
                },
                //项链-吊坠--2000-2999
                {
                    'mobileUrl': /^\/accessories\/list\?actIndex=0&startPrice=2000&endPrice=2999/,
                    'pcUrl': `/jewellery/necklace-pendant`,
                    'params': {
                        'priceRange': 'WzIwMDAsMjk5OV0%3D',
                    },
                },
                //项链-吊坠--3000-4999
                {
                    'mobileUrl': /^\/accessories\/list\?actIndex=0&startPrice=3000&endPrice=4999/,
                    'pcUrl': `/jewellery/necklace-pendant`,
                    'params': {
                        'priceRange': 'WzMwMDAsNDk5OV0%3D',
                    },
                },
                //项链-吊坠--5000以上
                {
                    'mobileUrl': /^\/accessories\/list\?actIndex=0&startPrice=5000&endPrice=300000/,
                    'pcUrl': `/jewellery/necklace-pendant`,
                    'params': {
                        'priceRange': 'WzUwMDAsMzAwMDAwXQ%3D%3D',
                    },
                },

                //手链-手镯--1000以内
                {
                    'mobileUrl': /^\/accessories\/list\?actIndex=4&startPrice=0&endPrice=999/,
                    'pcUrl': `/jewellery/bracelet-bangle`,
                    'params': {
                        'priceRange': 'WzAsOTk5XQ%3D%3D',
                    },
                },
                //手链-手镯--1000-1999
                {
                    'mobileUrl': /^\/accessories\/list\?actIndex=4&startPrice=1000&endPrice=1999/,
                    'pcUrl': `/jewellery/bracelet-bangle`,
                    'params': {
                        'priceRange': 'WzEwMDAsMTk5OV0%3D',
                    },
                },

                //手链-手镯--2000-2999
                {
                    'mobileUrl': /^\/accessories\/list\?actIndex=4&startPrice=2000&endPrice=2999/,
                    'pcUrl': `/jewellery/bracelet-bangle`,
                    'params': {
                        'priceRange': 'WzIwMDAsMjk5OV0%3D',
                    },
                },
                //手链-手镯--3000-4999
                {
                    'mobileUrl': /^\/accessories\/list\?actIndex=4&startPrice=3000&endPrice=4999/,
                    'pcUrl': `/jewellery/bracelet-bangle`,
                    'params': {
                        'priceRange': 'WzMwMDAsNDk5OV0%3D',
                    },
                },
                //手链-手镯--5000以上
                {
                    'mobileUrl': /^\/accessories\/list\?actIndex=4&startPrice=5000&endPrice=300000/,
                    'pcUrl': `/jewellery/bracelet-bangle`,
                    'params': {
                        'priceRange': 'WzUwMDAsMzAwMDAwXQ%3D%3D',
                    },
                },
                //项链-吊坠 情人节
                {
                    'mobileUrl': /^\/accessories\/list\?actIndex=0&theme=197$/,
                    'pcUrl': `/jewellery/necklace-pendant-valentines-day`,
                    'params': {
                        'param': 'none',
                    },
                },
                //项链-吊坠 母亲节
                {
                    'mobileUrl': /^\/accessories\/list\?actIndex=0&theme=198$/,
                    'pcUrl': `/jewellery/necklace-pendant-mothers-day`,
                    'params': {
                        'param': 'none',
                    },
                },

                //项链-吊坠 生日礼物
                {
                    'mobileUrl': /^\/accessories\/list\?actIndex=0&theme=199$/,
                    'pcUrl': `/jewellery/necklace-pendant-birthday-present`,
                    'params': {
                        'param': 'none',
                    },
                },
                //项链-吊坠 圣诞礼物
                {
                    'mobileUrl': /^\/accessories\/list\?actIndex=0&theme=200$/,
                    'pcUrl': `/jewellery/necklace-pendant-christmas-gift`,
                    'params': {
                        'param': 'none',
                    },
                },
                //项链-吊坠 万圣节礼物
                {
                    'mobileUrl': /^\/accessories\/list\?actIndex=0&theme=201$/,
                    'pcUrl': `/jewellery/necklace-pendant-halloween-gift`,
                    'params': {
                        'param': 'none',
                    },
                },
                //手链-手镯 情人节
                {
                    'mobileUrl': /^\/accessories\/list\?actIndex=4&theme=197$/,
                    'pcUrl': `/jewellery/bracelet-bangle-valentines-day`,
                    'params': {
                        'param': 'none',
                    },
                },
                //手链-手镯 母亲节
                {
                    'mobileUrl': /^\/accessories\/list\?actIndex=4&theme=198$/,
                    'pcUrl': `/jewellery/bracelet-bangle-mothers-day`,
                    'params': {
                        'param': 'none',
                    },
                },
                //手链-手镯 生日礼物
                {
                    'mobileUrl': /^\/accessories\/list\?actIndex=4&theme=199$/,
                    'pcUrl': `/jewellery/bracelet-bangle-birthday-present`,
                    'params': {
                        'param': 'none',
                    },
                },
                //手链-手镯 圣诞礼物
                {
                    'mobileUrl': /^\/accessories\/list\?actIndex=4&theme=200$/,
                    'pcUrl': `/jewellery/bracelet-bangle-christmas-gift`,
                    'params': {
                        'param': 'none',
                    },
                },
                //手链-手镯 万圣节礼物
                {
                    'mobileUrl': /^\/accessories\/list\?actIndex=4&theme=201$/,
                    'pcUrl': `/jewellery/bracelet-bangle-halloween-gift`,
                    'params': {
                        'param': 'none',
                    },
                },
                //饰品 情人节
                {
                    'mobileUrl': /^\/accessories\/list\?theme=197$/,
                    'pcUrl': `/jewellery/valentines-day`,
                    'params': {
                        'param': 'none',
                    },
                },
                //饰品 母亲节
                {
                    'mobileUrl': /^\/accessories\/list\?theme=198$/,
                    'pcUrl': `/jewellery/mothers-day`,
                    'params': {
                        'param': 'none',
                    },
                },
                //饰品 生日礼物
                {
                    'mobileUrl': /^\/accessories\/list\?theme=199$/,
                    'pcUrl': `/jewellery/birthday-present`,
                    'params': {
                        'param': 'none',
                    },
                },
                //饰品 圣诞礼物
                {
                    'mobileUrl': /^\/accessories\/list\?theme=200$/,
                    'pcUrl': `/jewellery/christmas-gift`,
                    'params': {
                        'param': 'none',
                    },
                },
                //饰品 万圣节礼物
                {
                    'mobileUrl': /^\/accessories\/list\?theme=201$/,
                    'pcUrl': `/jewellery/halloween-gift`,
                    'params': {
                        'param': 'none',
                    },
                },
                //戒托 ---单石戒
                {
                    'mobileUrl': /^\/engagement\/list\?style=109$/,
                    'pcUrl': `/engagement-rings/solitaire`,
                    'params': {
                        'param': 'none',
                    },
                },
                //戒托 开口戒
                {
                    'mobileUrl': /^\/engagement\/list\?style=110$/,
                    'pcUrl': `/engagement-rings/jump`,
                    'params': {
                        'param': 'none',
                    },
                },
                //戒托 爪镶戒
                {
                    'mobileUrl': /^\/engagement\/list\?style=114/,
                    'pcUrl': `/engagement-rings/halo-set`,
                    'params': {
                        'param': 'none',
                    },
                },
                //戒托 群镶戒
                {
                    'mobileUrl': /^\/engagement\/list\?style=111/,
                    'pcUrl': `/engagement-rings/pave-set`,
                    'params': {
                        'param': 'none',
                    },
                },
                //戒托 三主石戒
                {
                    'mobileUrl': /^\/engagement\/list\?style=115/,
                    'pcUrl': `/engagement-rings/three-stone`,
                    'params': {
                        'param': 'none',
                    },
                },

                //戒托 18k白金
                {
                    'mobileUrl': /^\/engagement\/list\?material=28/,
                    'pcUrl': `/engagement-rings/18k-white`,
                    'params': {
                        'param': 'none',
                    },
                },
                //戒托 18k黄金
                {
                    'mobileUrl': /^\/engagement\/list\?material=29/,
                    'pcUrl': `/engagement-rings/18k-yellow`,
                    'params': {
                        'param': 'none',
                    },
                },
                //戒托 18k玫瑰金
                {
                    'mobileUrl': /^\/engagement\/list\?material=30/,
                    'pcUrl': `/engagement-rings/18k-rose-gold`,
                    'params': {
                        'param': 'none',
                    },
                },
                //戒托 铂金
                {
                    'mobileUrl': /^\/engagement\/list\?material=34/,
                    'pcUrl': `/engagement-rings/platinum`,
                    'params': {
                        'param': 'none',
                    },
                },
                //戒托 银
                {
                    'mobileUrl': /^\/engagement\/list\?material=35/,
                    'pcUrl': `/engagement-rings/channel-set`,
                    'params': {
                        'param': 'none',
                    },
                },


                //戒托专题页
                {
                    'mobileUrl': /^\/engagement\/?$/,
                    'pcUrl': `/engagement-rings`,
                },

                //戒托列表
                {
                    'mobileUrl': /^\/engagement\/list\/?$/,
                    'pcUrl': `/engagement-rings/list`,
                },

                // 戒托详情
                {
                    'mobileUrl': /^\/engagement\/engagement-rings/,
                    'pcUrl': `/ring/engagement-rings`,
                    'params': {
                        'goodId': 'goodId',
                        'ringType': 'ringType',
                    },
                },
                // 戒指专题页   ring/wedding-rings
                {
                    'mobileUrl': /^\/marriage-ring\/?$/,
                    'pcUrl': `/wedding-rings`
                },


                // 戒指 详情
                {
                    'mobileUrl': /^\/marriage-ring\/single-ring-detail/,
                    'pcUrl': `/ring/wedding-rings/1`,
                    'params': {
                        'goodId': 'goodId',
                        'ringType': 'ringType',
                    },
                },




                // 对戒 详情
                {
                    'mobileUrl': /^\/marriage-ring\/pair-ring-detail/,
                    'pcUrl': `/ring/wedding-rings/1`,
                    'params': {
                        'goodId': 'goodId',
                        'ringType': 'ringType',
                    },
                },


                // 对戒列表
                {
                    'mobileUrl': /^\/marriage-ring\/pair-ring\/?/,
                    'pcUrl': `/wedding-rings/classic-series`,
                    'params': {
                        'param': 'none',
                    },
                },

                // 裸钻
                {
                    'mobileUrl': /^\/diamond\/list\?startCarat=0&endCarat=0.29/,
                    'pcUrl': `/diamonds/all`,
                    'params': {
                        'caratRange': 'WzAsMC4yOV0%3D',
                    },
                },
                {
                    'mobileUrl': /^\/diamond\/list\?startCarat=0.3&endCarat=0.49/,
                    'pcUrl': `/diamonds/all`,
                    'params': {
                        'caratRange': 'WzAuMywwLjQ5XQ%3D%3D',
                    },
                },
                {
                    'mobileUrl': /^\/diamond\/list\?startCarat=0.5&endCarat=0.79/,
                    'pcUrl': `/diamonds/all`,
                    'params': {
                        'caratRange': 'WzAuNSwwLjc5XQ%3D%3D',
                    },
                },
                {
                    'mobileUrl': /^\/diamond\/list\?startCarat=0.8&endCarat=0.99/,
                    'pcUrl': `/diamonds/all`,
                    'params': {
                        'caratRange': 'WzAuOCwwLjk5XQ%3D%3D',
                    },
                },
                {
                    'mobileUrl': /^\/diamond\/list\?startCarat=1&endCarat=1.49/,
                    'pcUrl': `/diamonds/all`,
                    'params': {
                        'caratRange': 'WzEsMS40OV0%3D',
                    },
                },
                {
                    'mobileUrl': /^\/diamond\/list\?startCarat=1.5&endCarat=10/,
                    'pcUrl': `/diamonds/all`,
                    'params': {
                        'caratRange': 'WzEuNSwxMF0%3D',
                    },
                },



                {
                    'mobileUrl': /^\/diamond\/list\?shape=16/,
                    'pcUrl': `/diamonds/round-cut`,
                    'params': {
                        'param': 'none',
                    },
                },
                {
                    'mobileUrl': /^\/diamond\/list\?shape=17/,
                    'pcUrl': `/diamonds/asscher-cut`,
                    'params': {
                        'param': 'none',
                    },
                },
                {
                    'mobileUrl': /^\/diamond\/list\?shape=54/,
                    'pcUrl': `/diamonds/princess-cut`,
                    'params': {
                        'param': 'none',
                    },
                },
                {
                    'mobileUrl': /^\/diamond\/list\?shape=55/,
                    'pcUrl': `/diamonds/emerald-cut`,
                    'params': {
                        'param': 'none',
                    },
                },
                {
                    'mobileUrl': /^\/diamond\/list\?shape=56/,
                    'pcUrl': `/diamonds/heart-shaped`,
                    'params': {
                        'param': 'none',
                    },
                },
                {
                    'mobileUrl': /^\/diamond\/list\?shape=57/,
                    'pcUrl': `/diamonds/marquise-cut`,
                    'params': {
                        'param': 'none',
                    },
                },
                {
                    'mobileUrl': /^\/diamond\/list\?shape=58/,
                    'pcUrl': `/diamonds/cushion-cut`,
                    'params': {
                        'param': 'none',
                    },
                },
                {
                    'mobileUrl': /^\/diamond\/list\?shape=59/,
                    'pcUrl': `/diamonds/pear-shaped`,
                    'params': {
                        'param': 'none',
                    },
                },
                {
                    'mobileUrl': /^\/diamond\/list\?shape=60/,
                    'pcUrl': `/diamonds/asscher-cut`,
                    'params': {
                        'param': 'none',
                    },
                },
                {
                    'mobileUrl': /^\/diamond\/list\?shape=61/,
                    'pcUrl': `/diamonds/radiant-cut`,
                    'params': {
                        'param': 'none',
                    },
                },

                {
                    'mobileUrl': /^\/diamond\/list\/?$/,
                    'pcUrl': `/diamonds/list`
                },

                // 裸钻详情
                {
                    'mobileUrl': /^\/diamond\/diamond/,
                    'pcUrl': `/diamond-details`,
                    'params': {
                        'goodId': 'goodId'

                    },
                },


                // 选择戒托  build-your-own-ring/settings
                {
                    'mobileUrl': /^\/custom-made\/ring-made\/ring-list/,
                    'pcUrl': `/build-your-own-ring/settings`,
                    'params': {
                        'melo': 'steps',
                        'step': 'step',
                    },
                },
                // 选择戒托戒托详情
                {
                    'mobileUrl': /^\/custom-made\/ring-made\/ring-detail/,
                    'pcUrl': `/build-your-own-ring/setting-details`,
                    'params': {
                        'goodId': 'goodId',
                        'ringType': 'ringType',
                        'melo': 'steps',
                        'step': 'step',
                    },
                },

                {
                    'mobileUrl': /^\/custom-made\/ring-made\/ring-detail/,
                    'pcUrl': `/build-your-own-ring/setting-details`,
                    'params': {
                        'goodId': 'goodId',
                        'ringType': 'ringType',
                        'melo': 'steps',
                        'step': 'step',
                    },
                },

                // 选择钻石 build-your-own-ring/diamonds
                {
                    'mobileUrl': /^\/custom-made\/diamond-made\/diamond-list/,
                    'pcUrl': `/build-your-own-ring/diamonds`,
                    'params': {
                        'melo': 'steps',
                        'step': 'step',
                    },
                },

                // 选择钻石钻石详情
                {
                    'mobileUrl': /^\/custom-made\/diamond-made\/diamond-detail/,
                    'pcUrl': `/build-your-own-ring/diamond-details`,
                    'params': {
                        'goodId': 'goodId',
                        'melo': 'steps',
                        'step': 'step',
                    },
                },


                //饰品列表
                {
                    'mobileUrl': /^\/accessories\/list\/?$/,
                    'pcUrl': `/jewellery/necklaces`,
                    'params': {
                        'param': 'none',
                    },
                },


                // 珠宝首饰详情   /jewellery/all
                {
                    'mobileUrl': /^\/accessories\/accessories/,
                    'pcUrl': `/jewellery/all/1`,
                    'params': {
                        'goodId': 'goodId',
                    },
                },
                // 知识
                {
                    'mobileUrl': /^\/help-pages\/diamondCarat\/?$/,
                    'pcUrl': `/education/diamonds/carat`
                },
                {
                    'mobileUrl': /^\/help-pages\/diamondCut\/?$/,
                    'pcUrl': `/education/diamonds/cut`
                },

                {
                    'mobileUrl': /^\/help-pages\/diamondColor\/?$/,
                    'pcUrl': `/education/diamonds/color`
                },
                {
                    'mobileUrl': /^\/help-pages\/diamondCleanliness\/?$/,
                    'pcUrl': `/education/diamonds/clarity`
                },
                {
                    'mobileUrl': /^\/help-pages\/diamondShape\/?$/,
                    'pcUrl': `/education/diamonds/shape`
                },
                {
                    'mobileUrl': /^\/help-pages\/proof\/?$/,
                    'pcUrl': `/education/diamonds/certification`
                },
                {
                    'mobileUrl': /^\/help-pages\/sizeguide\/?$/,
                    'pcUrl': `/education/rings/size`
                },
                {
                    'mobileUrl': /^\/help-pages\/paymentMethod\/?$/,
                    'pcUrl': `/policies/payment-methods`
                },
                {
                    'mobileUrl': /^\/help-pages\/qualityValue\/?$/,
                    'pcUrl': `/policies/quality-value`
                },
                {
                    'mobileUrl': /^\/help-pages\/freeShipping\/?$/,
                    'pcUrl': `/policies/free-shipping`
                },
                {
                    'mobileUrl': /^\/help-pages\/deliveryPolicy\/?$/,
                    'pcUrl': `/policies/shipping`
                },
                {
                    'mobileUrl': /^\/help-pages\/internationalPolicy\/?$/,
                    'pcUrl': `/policies/international`
                },
                {
                    'mobileUrl': /^\/help-pages\/privacyPolicy\/?$/,
                    'pcUrl': `/policies/privacy-policy`
                },
                {
                    'mobileUrl': /^\/help-pages\/clause\/?$/,
                    'pcUrl': `/policies/terms-and-conditions`
                },

                {
                    'mobileUrl': /^\/help-pages\/knowledge\/?$/,
                    'pcUrl': `/education/diamonds/carat`
                },



                //搜索
                {
                    'mobileUrl': /^\/search\/result/,
                    'pcUrl': `/search`,
                    'params': {
                        'keyword': 'keyword'

                    },
                },
                //购物车
                {
                    'mobileUrl': /^\/cart\/?$/,
                    'pcUrl': `/shopping-cart`,

                },

                //密码
                {
                    'mobileUrl': /^\/forget\/?$/,
                    'pcUrl': `/reset-password`,

                },
            ]

            if (href.length > 0) {

                for (let i = 0; i < rules.length; i++) {

                    let rule = rules[i]
                    let currUrl = href.length > 1 ? href[0] + "?" + href[1] : href[0]
                    if ((rule['mobileUrl']).test(currUrl)) {
                        let url = host + rule['pcUrl']

                        let param = ''
                        if (typeof rule['params'] !== 'undefined') {
                            let params = rule['params'];
                            let query2 = {}
                            let query1 = getQueryFromUrl(req.originalUrl)

                            Object.keys(params).forEach(function (key) {

                                if (params[key] == 'none') {
                                    href.splice(1, 1)
                                }

                                if (typeof query1[key] !== 'undefined') {
                                    query2[params[key]] = unescape(query1[key])
                                } else {
                                    query2[key] = unescape(params[key])
                                }
                            })
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
            redirect(host)
            return
        }
        console.log("req.originalUrl", req.originalUrl)
        toWapUrl(req.originalUrl)
    }
}
