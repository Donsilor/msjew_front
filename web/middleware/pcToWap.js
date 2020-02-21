export default function({ req, res, redirect, store , route}) {
  // console.log('req==================>', req)
  // console.log('res==================>', res)
  function isWap(u) {
    // var u = navigator.userAgent, app = navigator.appVersion;
    return  !!u.match(/AppleWebKit.*Mobile.*/)
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

  return _result.length ? _result.join('&') + '&' : ''
}


  if (process.server) {
  
    let u = req.headers['user-agent']

    if(!isWap(u)) {
      return
    }
    // http://localhost:8328   https://wap.bddco.com   https://wap.bdd.bddia.com

    //头部host
	let headerHost = req.headers['host']
    //生产环境
	let host = 'https://wap.bddco.com';
    if(!(/bddco\.com/).test(headerHost)) {
		//测试环境
		host = 'http://wap.bdd.bddia.com';
	}
	//host = '127.0.0.1:8328'
   
    const toWapUrl = path => {
      if(path === '/undefined') {
        return
      }

      let href =  path.split('?')
      let rules = [
        // 首页
        {
          'pcUrl':/^\/?$/,
          'mobileUrl':`/`,
        },
        // 登录
        {
          'pcUrl':/\/login/,
          'mobileUrl':`/login`
        },
         // 注册  /login?type=register  /login/email
         {
          'pcUrl':/\/login\?type=register/,
          'mobileUrl':`/login/email`
        },
        // 订婚
        {
          'pcUrl':/^\/engagement-rings\/?$/,
          'mobileUrl':`/engagement`,
        }, 
        // 订婚列表


       /*
        {
          'pcUrl':/^\/engagement-rings\/(solitaire|jump|pave-set|classical|channel-set|halo-set|three-stone|14k-white|18k-white|14k-yellow|18k-yellow|platinum|18k-rose-gold)\/?$/,
          'mobileUrl':`/engagement/list`,
        }, 
		*/
		
		{
          'pcUrl':/^\/engagement-rings\/solitaire$/,
          'mobileUrl':`/engagement/list`,
		  'params':{
            'style':'109',
          },
        }, 
		
		//开口戒
		{
          'pcUrl':/^\/engagement-rings\/jump$/,
          'mobileUrl':`/engagement/list`,
		  'params':{
            'style':'110',
          },
        }, 
		
		//密钉戒

		{
          'pcUrl':/^\/engagement-rings\/pave-set$/,
          'mobileUrl':`/engagement/list`,
		  'params':{
            'style':'111',
          },
        }, 
		{
          'pcUrl':/^\/engagement-rings\/classical$/,
          'mobileUrl':`/engagement/list`,
		  'params':{
            'style':'112',
          },
        }, 
		{
          'pcUrl':/^\/engagement-rings\/channel-set$/,
          'mobileUrl':`/engagement/list`,
		  'params':{
            'style':'113',
          },
        }, 
		{
          'pcUrl':/^\/engagement-rings\/halo-set$/,
          'mobileUrl':`/engagement/list`,
		  'params':{
            'style':'114',
          },
        }, 
		{
          'pcUrl':/^\/engagement-rings\/three-stone$/,
          'mobileUrl':`/engagement/list`,
		  'params':{
            'style':'115',
          },
        }, 
		
		{
          'pcUrl':/^\/engagement-rings\/14k-white$/,
          'mobileUrl':`/engagement/list`,
		  'params':{
            'material':'31',
          },
        }, 
		
		{
          'pcUrl':/^\/engagement-rings\/18k-white$/,
          'mobileUrl':`/engagement/list`,
		  'params':{
            'material':'28',
          },
        }, 
		
		{
          'pcUrl':/^\/engagement-rings\/14k-yellow$/,
          'mobileUrl':`/engagement/list`,
		  'params':{
            'material':'32',
          },
        }, 
		
		{
          'pcUrl':/^\/engagement-rings\/18k-yellow$/,
          'mobileUrl':`/engagement/list`,
		  'params':{
            'material':'29',
          },
        }, 
		
		{
          'pcUrl':/^\/engagement-rings\/platinum$/,
          'mobileUrl':`/engagement/list`,
		  'params':{
            'material':'34',
          },
        }, 
		
		{
          'pcUrl':/^\/engagement-rings\/18k-rose-gold$/,
          'mobileUrl':`/engagement/list`,
		  'params':{
            'material':'30',
          },
        }, 
		
		
		
        // 订婚详情
        {
          'pcUrl':/^\/ring\/engagement-rings/,
          'mobileUrl':`/engagement/engagement-rings`,
          'params':{
            'goodId':'goodId',
            'ringType':'ringType',
          },
        }, 
        // 结婚   ring/wedding-rings
        {
          'pcUrl':/^\/wedding-rings\/?$/,
          'mobileUrl':`/marriage-ring`
        },
		
		 // 结婚列表
       /*
        {
          'pcUrl':/^\/wedding-rings\/(womens-classic|womens-eternity|womens-anniversary|womens-diamond|womens-stackable|mens-classic|mens-carved|mens-diamond|mens-alternative-metals|14k-white|18k-white|14k-yellow|18k-yellow|platinum|18k-rose-gold)\/?$/,
          'mobileUrl':`/marriage-ring/single-ring`,
        }, 
		*/
		
		{
          'pcUrl':/^\/wedding-rings\/womens-classic$/,
          'mobileUrl':`/marriage-ring/single-ring`,
		  'params':{
			'type':'lady',   
            'style':'160',
          },
        }, 
		{
          'pcUrl':/^\/wedding-rings\/womens-eternity$/,
          'mobileUrl':`/marriage-ring/single-ring`,
		  'params':{
			'type':'lady',   
            'style':'161',
          },
        }, 
		{
          'pcUrl':/^\/wedding-rings\/womens-anniversary$/,
          'mobileUrl':`/marriage-ring/single-ring`,
		  'params':{
			'type':'lady',   
            'style':'162',
          },
        }, 
		{
          'pcUrl':/^\/wedding-rings\/womens-diamond$/,
          'mobileUrl':`/marriage-ring/single-ring`,
		  'params':{
			'type':'lady',   
            'style':'163',
          },
        }, 
		{
          'pcUrl':/^\/wedding-rings\/womens-stackable$/,
          'mobileUrl':`/marriage-ring/single-ring`,
		  'params':{
			'type':'lady',    
            'style':'164',
          },
        }, 
		{
          'pcUrl':/^\/wedding-rings\/mens-classic$/,
          'mobileUrl':`/marriage-ring/single-ring`,
		  'params':{
			'type':'gentlemen',    
            'style':'165',
          },
        }, 
		{
          'pcUrl':/^\/wedding-rings\/mens-carved$/,
          'mobileUrl':`/marriage-ring/single-ring`,
		  'params':{
			'type':'gentlemen',    
            'style':'166',
          },
        }, 
		{
          'pcUrl':/^\/wedding-rings\/mens-diamond$/,
          'mobileUrl':`/marriage-ring/single-ring`,
		  'params':{
			'type':'gentlemen',  
            'style':'167',
          },
        }, 
		{
          'pcUrl':/^\/wedding-rings\/mens-alternative-metals$/,
          'mobileUrl':`/marriage-ring/single-ring`,
		  'params':{
			'type':'gentlemen',  
            'style':'168',
          },
        }, 
		
		
		
		
		
		
		{
          'pcUrl':/^\/wedding-rings\/14k-white$/,
          'mobileUrl':`/marriage-ring/single-ring`,
		  'params':{
			'type':'lady',   
            'material':'31',
          },
        }, 
		
		{
          'pcUrl':/^\/wedding-rings\/18k-white$/,
          'mobileUrl':`/marriage-ring/single-ring`,
		  'params':{
			'type':'lady', 
            'material':'28',
          },
        }, 
		
		{
          'pcUrl':/^\/wedding-rings\/14k-yellow$/,
          'mobileUrl':`/marriage-ring/single-ring`,
		  'params':{
			'type':'lady', 
            'material':'32',
          },
        }, 
		
		{
          'pcUrl':/^\/wedding-rings\/18k-yellow$/,
          'mobileUrl':`/marriage-ring/single-ring`,
		  'params':{
			'type':'lady',  
            'material':'29',
          },
        }, 
		
		{
          'pcUrl':/^\/wedding-rings\/platinum$/,
          'mobileUrl':`/marriage-ring/single-ring`,
		  'params':{
			'type':'lady',  
            'material':'34',
          },
        }, 
		
		{
          'pcUrl':/^\/wedding-rings\/18k-rose-gold$/,
          'mobileUrl':`/marriage-ring/single-ring`,
		  'params':{
			'type':'lady',  
            'material':'30',
          },
        }, 
		
		
        // 结婚 详情
        {
          'pcUrl':/^\/ring\/wedding-rings\/\d+\?goodId=\d+\&ringType=single/,

          'mobileUrl':`/marriage-ring/single-ring-detail`,
          'params':{
            'goodId':'goodId',
            'ringType':'ringType',
          },
        },
		
		// 对戒列表
        {
          'pcUrl':/^\/wedding-rings\/(classic-series|channel-set-series)\/?/,
          'mobileUrl':`/marriage-ring/pair-ring`
        },
		
		// 对戒 详情
        {

          'pcUrl':/^\/ring\/wedding-rings\/\d+\?goodId=\d+&ringType=pair/,
          'mobileUrl':`/marriage-ring/pair-ring-detail`,
          'params':{
            'goodId':'goodId',
			'ringType':'ringType',
          },
        },
		
		
		// 裸钻
        {
          'pcUrl':/^\/diamonds/,
          'mobileUrl':`/diamond/list`
        },
		
		// 裸钻详情
        {
          'pcUrl':/^\/diamond-details/,
          'mobileUrl':`/diamond/diamonds`,
          'params':{
            'goodId':'goodId'
          
          },
        },
		
		
        // 选择戒托  build-your-own-ring/settings
        {
          'pcUrl':/^\/build-your-own-ring\/settings\/?$/,
          'mobileUrl':`/custom-made/ring-made/ring-list`,
          'params':{
            'step':'step',
          },
        },
        // 选择戒托戒托详情
        {
          'pcUrl':/^\/build-your-own-ring\/setting-details/,
          'mobileUrl':`/custom-made/ring-made/ring-detail`,
          'params':{
            'goodId':'goodId',
            'ringType':'ringType',
          },
        },

        // 选择钻石 build-your-own-ring/diamonds
        {
          'pcUrl':/^\/build-your-own-ring\/diamonds\/?$/,
          'mobileUrl':`/custom-made/diamond-made/diamond-list`,
          'params':{
            'step':'step',
          },
        },

        // 选择钻石钻石详情
        {
          'pcUrl':/^\/build-your-own-ring\/diamond-details/,
          'mobileUrl':`/custom-made/diamond-made/diamond-detail`,
          'params':{
            'goodId':'goodId',
            'step':'step'
          },
        },

        
        
		
		 // 珠宝首饰   /jewellery/all
        {
          'pcUrl':/^\/jewellery\/(all|necklaces|pendants|ear-stud|earrings|bracelets|bangles)\/?$/,
          'mobileUrl':`/accessories/list`
		  
        },
		
		
		// 珠宝首饰详情   /jewellery/all
        {
          'pcUrl':/^\/jewellery\/(all|necklace|pendants|ear-stud|earrings|bracelets|bangles|studEarring)\/\d/,
          'mobileUrl':`/accessories/accessories`,
		  'params':{
            'goodId':'goodId',
          },
        },
        // 知识
        {
          'pcUrl':/^\/education\/diamonds\/(carat|cut|color|clarity|shape|certification|maintenance)\/?$/,
          'mobileUrl':`/help-pages/knowledge`
        },
        
		//搜索
        {
          'pcUrl':/^\/search/,
          'mobileUrl':`/search/result`,
          'params':{
            'keyword':'keyword'
            
          },
        }
      ]

      if(href.length>0) {

        for(let i=0;i<rules.length;i++) {

          let rule = rules[i]
		  let currUrl = href.length>1 ? href[0]+ "?" +href[1] : href[0]
		  console.log(44444,currUrl)
          if((rule['pcUrl']).test(currUrl)) {
            let url = host + rule['mobileUrl']

            let param = ''
            if(typeof rule['params'] !== 'undefined') {
              let params = rule['params'];
              let query2 = {}
              let query1 = getQueryFromUrl(req.originalUrl)
              
              Object.keys(params).forEach(function(key) {
                if(typeof query1[key] !== 'undefined') {
                  query2[params[key]] = query1[key]
                }else{
				  query2[key] = params[key]
				}
              });
              // param = queryParams(query2)
              href[1] = queryParams(query2)
            }

            if(href.length>1) {
              url = url + '?' + param + href[1]
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
    console.log("req.originalUrl----",req.originalUrl)
    toWapUrl(req.originalUrl)
  }
}

