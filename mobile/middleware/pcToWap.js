export default function({ req, res, redirect, store , route}) {
  // console.log('req==================>', req)
  // console.log('res==================>', res)
  function isWap(u) {
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

  return _result.length ? _result.join('&')  : ''
}

  if (process.server) {
  
    let u = req.headers['user-agent']
    
	//console.log('headerHost',headerHost);
    if(isWap(u)) {
      return
    }
    // https://www.bdd.bddia.com   https://www.bddco.com
	//头部host
	let headerHost = req.headers['host']
    //生产环境
	let host = 'https://www.bddco.com';
    if(!(/bddco\.com/).test(headerHost)) {
		//测试环境
		host = 'http://www.bdd.bddia.com';
	}
    //host = '127.0.0.1:8318'
    const toWapUrl = path => {
      if(path === '/undefined') {
        return
      }

      let href =  path.split('?')
      let rules = [
        // 首页
        {
          'mobileUrl':/^\/?$/,
          'pcUrl':`/`,
        },
        // 登录
        {
          'mobileUrl':/\/login/,
          'pcUrl':`/login`
        },
        // 注册  /login?type=register  /login/email
        {
          'mobileUrl':/\/login\/email/,
          'pcUrl':`/login?type=register`
        },
		
		//订婚
		{
          'mobileUrl':/^\/engagement\/?$/,
          'pcUrl':`/engagement-rings`,
        }, 
		
        // 订婚列表
		
		
		
		{
          'mobileUrl':/^\/engagement\/list\?style=109/,
          'pcUrl':`/engagement-rings/solitaire`,
		  'params':{
            'param':'none',          
          },
        }, 

		//开口戒
		{
          'mobileUrl':/^\/engagement\/list\?style=110/,
          'pcUrl':`/engagement-rings/jump`,
		  'params':{
            'param':'none',          
          },
        }, 
		//密钉戒
		{
          'mobileUrl':/^\/engagement\/list\?style=111/,
          'pcUrl':`/engagement-rings/pave-set`,
		  'params':{
            'param':'none',          
          },
        }, 
		
		{
          'mobileUrl':/^\/engagement\/list\?style=112/,
          'pcUrl':`/engagement-rings/classical`,
		  'params':{
            'param':'none',          
          },
        }, 
		
		{
          'mobileUrl':/^\/engagement\/list\?style=113/,
          'pcUrl':`/engagement-rings/channel-set`,
		  'params':{
            'param':'none',          
          },
        }, 
		
		{
          'mobileUrl':/^\/engagement\/list\?style=114/,
          'pcUrl':`/engagement-rings/halo-set`,
		  'params':{
            'param':'none',          
          },
        }, 
		

		
		{
          'mobileUrl':/^\/engagement\/list\?style=115/,
          'pcUrl':`/engagement-rings/three-stone`,
		  'params':{
            'param':'none',          
          },
        }, 
		
		//订婚戒指14K白金
		{
          'mobileUrl':/^\/engagement\/list\?material=31/,
          'pcUrl':`/engagement-rings/14k-white`,
		  'params':{
            'param':'none',          
          },
        }, 
		
		{
          'mobileUrl':/^\/engagement\/list\?material=28/,
          'pcUrl':`/engagement-rings/18k-white`,
		  'params':{
            'param':'none',          
          },
        }, 
		
		{
          'mobileUrl':/^\/engagement\/list\?material=32/,
          'pcUrl':`/engagement-rings/14k-yellow`,
		  'params':{
            'param':'none',          
          },
        }, 
		
		
		{
          'mobileUrl':/^\/engagement\/list\?material=29/,
          'pcUrl':`/engagement-rings/18k-yellow`,
		  'params':{
            'param':'none',          
          },
        }, 
		
		{
          'mobileUrl':/^\/engagement\/list\?material=34/,
          'pcUrl':`/engagement-rings/platinum`,
		  'params':{
            'param':'none',          
          },
        }, 
		
		{
          'mobileUrl':/^\/engagement\/list\?material=30/,
          'pcUrl':`/engagement-rings/18k-rose-gold`,
		  'params':{
            'param':'none',          
          },
        },
		
		
		
		

        {
          'mobileUrl':/^\/engagement\/list\/?$/,
          'pcUrl':`/engagement-rings/list`,
        }, 
		 
		
        // 订婚详情
        {
          'mobileUrl':/^\/engagement\/engagement-rings/,
          'pcUrl':`/ring/engagement-rings`,
          'params':{
            'goodId':'goodId',
            'ringType':'ringType',
          },
        }, 
        // 结婚   ring/wedding-rings
        {
          'mobileUrl':/^\/marriage-ring\/?$/,
          'pcUrl':`/wedding-rings`
        },
		
		 // 结婚列表
		 
		 {
          'mobileUrl':/^\/marriage-ring\/single-ring\?type=lady&style=160/,
          'pcUrl':`/wedding-rings/womens-classic`,
		  'params':{
            'param':'none',          
          },
        }, 
		
		{
          'mobileUrl':/^\/marriage-ring\/single-ring\?type=lady&style=161/,
          'pcUrl':`/wedding-rings/womens-eternity`,
		  'params':{
            'param':'none',          
          },
        }, 
		{
          'mobileUrl':/^\/marriage-ring\/single-ring\?type=lady&style=162/,
          'pcUrl':`/wedding-rings/womens-anniversary`,
		  'params':{
            'param':'none',          
          },
        }, 
		{
          'mobileUrl':/^\/marriage-ring\/single-ring\?type=lady&style=163/,
          'pcUrl':`/wedding-rings/womens-diamond`,
		  'params':{
            'param':'none',          
          },
        }, 
		{
          'mobileUrl':/^\/marriage-ring\/single-ring\?type=lady&style=164/,
          'pcUrl':`/wedding-rings/womens-stackable`,
		  'params':{
            'param':'none',          
          },
        }, 
		{
          'mobileUrl':/^\/marriage-ring\/single-ring\?type=gentlemen&style=165/,
          'pcUrl':`/wedding-rings/mens-classic`,
		  'params':{
            'param':'none',          
          },
        }, 
		
		{
          'mobileUrl':/^\/marriage-ring\/single-ring\?type=gentlemen&style=166/,
          'pcUrl':`/wedding-rings/mens-carved`,
		  'params':{
            'param':'none',          
          },
        }, 
		
		{
          'mobileUrl':/^\/marriage-ring\/single-ring\?type=gentlemen&style=167/,
          'pcUrl':`/wedding-rings/mens-diamond`,
		  'params':{
            'param':'none',          
          },
        }, 
		
		{
          'mobileUrl':/^\/marriage-ring\/single-ring\?type=gentlemen&style=168/,
          'pcUrl':`/wedding-rings/mens-alternative-metals`,
		  'params':{
            'param':'none',          
          },
        }, 
		
		
		
		//结婚戒指 -- 成色
		 {
          'mobileUrl':/^\/marriage-ring\/single-ring\?type=lady&material=31/,
          'pcUrl':`/wedding-rings/14k-white`,
		  'params':{
            'param':'none',          
          },
        }, 
		
		{
          'mobileUrl':/^\/marriage-ring\/single-ring\?type=lady&material=28/,
          'pcUrl':`/wedding-rings/18k-white`,
		  'params':{
            'param':'none',          
          },
        }, 
		
		{
          'mobileUrl':/^\/marriage-ring\/single-ring\?type=lady&material=32/,
          'pcUrl':`/wedding-rings/14k-yellow`,
		  'params':{
            'param':'none',          
          },
        }, 
		
		
		{
          'mobileUrl':/^\/marriage-ring\/single-ring\?type=lady&material=29/,
          'pcUrl':`/wedding-rings/18k-yellow`,
		  'params':{
            'param':'none',          
          },
        }, 
		
		{
          'mobileUrl':/^\/marriage-ring\/single-ring\?type=lady&material=34/,
          'pcUrl':`/wedding-rings/platinum`,
		  'params':{
            'param':'none',          
          },
        }, 
		
		{
          'mobileUrl':/^\/marriage-ring\/single-ring\?type=lady&material=30/,
          'pcUrl':`/wedding-rings/18k-rose-gold`,
		  'params':{
            'param':'none',          
          },
        },
		 
		 
		 // 结婚 详情
        {
          'mobileUrl':/^\/marriage-ring\/single-ring-detail/,
          'pcUrl':`/ring/wedding-rings/1`,
          'params':{
            'goodId':'goodId',
            'ringType':'ringType',
          },
        }, 

        //男士戒指
        {
          'mobileUrl':/^\/marriage-ring\/single-ring\?type=gentlemen/,
          'pcUrl':`/wedding-rings/mens-classic`,
		  'params':{
            'param':'none',          
          },
        }, 
		//女士戒指
        {
          'mobileUrl':/^\/marriage-ring\/single-ring\/?/,
          'pcUrl':`/wedding-rings/womens-classic`,
		  'params':{
            'param':'none',          
          },
        }, 
       
		
		// 对戒列表
        {
          'mobileUrl':/^\/marriage-ring\/pair-ring\/?$/,
          'pcUrl':`/wedding-rings/classic-series`
        },
		
		// 对戒 详情
        {
          'mobileUrl':/^\/marriage-ring\/pair-ring-detail/,
          'pcUrl':`/ring/wedding-rings/1`,
          'params':{
            'goodId':'goodId',
			'ringType':'ringType',
          },
        },
		
		
		// 裸钻
        {
          'mobileUrl':/^\/diamond\/list\/?$/,
          'pcUrl':`/diamonds/list`
        },
		
		// 裸钻详情
        {
          'mobileUrl':/^\/diamond\/diamond/,
          'pcUrl':`/diamond-details`,
          'params':{
            'goodId':'goodId'
          
          },
        },
		
		
        // 选择戒托  build-your-own-ring/settings
        {
          'mobileUrl':/^\/custom-made\/ring-made\/ring-list\/?$/,
          'pcUrl':`/build-your-own-ring/settings`,
          'params':{
            'step':'step',
          },
        },
        // 选择戒托戒托详情
        {
          'mobileUrl':/^\/custom-made\/ring-made\/ring-detail/,
          'pcUrl':`/build-your-own-ring/setting-details`,
          'params':{
            'goodId':'goodId',
            'ringType':'ringType',
          },
        },

        // 选择钻石 build-your-own-ring/diamonds
        {
          'mobileUrl':/^\/custom-made\/diamond-made\/diamond-list\/?$/,
          'pcUrl':`/build-your-own-ring/diamonds`,
          'params':{
            'step':'step',
          },
        },

        // 选择钻石钻石详情
        {
          'mobileUrl':/^\/custom-made\/diamond-made\/diamond-detail/,
          'pcUrl':`/build-your-own-ring/diamond-details`,
          'params':{
            'goodId':'goodId',
            'step':'step'
          },
        },

        
        // 珠宝首饰   /jewellery/all
        {
          'mobileUrl':/^\/accessories\/list\/?$/,
          'pcUrl':`/jewellery/all`
        },
		
		
		
		
		// 珠宝首饰详情   /jewellery/all
        {
          'mobileUrl':/^\/accessories\/accessories/,
          'pcUrl':`/jewellery/all/1`,
		  'params':{
            'goodId':'goodId',
          },
        },
        // 知识
        {
          'mobileUrl':/^\/help-pages\/knowledge\/?$/,
          'pcUrl':`/education/diamonds/carat`
        },
        
		//搜索
        {
          'mobileUrl':/^\/search\/result/,
          'pcUrl':`/search`,
          'params':{
            'keyword':'keyword'
            
          },
        }
      ]

      if(href.length>0) {

        for(let i=0;i<rules.length;i++) {

          let rule = rules[i]
		  let currUrl = href.length>1 ? href[0]+ "?" +href[1] : href[0]
          if((rule['mobileUrl']).test(currUrl)) {
            let url = host + rule['pcUrl']

            let param = ''
            if(typeof rule['params'] !== 'undefined') {
              let params = rule['params'];
              let query2 = {}
              let query1 = getQueryFromUrl(req.originalUrl)
              
              Object.keys(params).forEach(function(key) {
				
				if(params[key] == 'none'){
					href.splice(1,1)
				}				  
                if(typeof query1[key] !== 'undefined') {
                  query2[params[key]] = query1[key]
                  url = url.replace('{'+key+'}',query1[key])
                }else{
				  query2[key] = params[key]
				}
              })
               param = queryParams(query2)
              //href[1] = queryParams(query2)
            }

            if(href.length>1) {
              url = url + '?' + param 
            }
            console.log(url)
            redirect(url)
            return  
          }
        }
      }
      redirect(host)
      return
    }
    console.log("req.originalUrl",req.originalUrl)
    toWapUrl(req.originalUrl)
  }
}
