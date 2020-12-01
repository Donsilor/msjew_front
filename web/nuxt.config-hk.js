const pkg = require('./package')

const RUNNING_ENV = process.env.RUNNING_ENV || 'pro'
const CDN_PATH = process.env.CDN_PATH || ''
// 转移后的static文件夹路径
const STATIC_PATH = process.env.STATIC_PATH || ''

console.log('RUNNING_ENV=====>', RUNNING_ENV)

const serverUrl = {
  dev: 'https://api.msjew.com/index.php',   //http://api.bddco.com/     http://www.bddmall.com/api
  test: 'https://api.msjew.com/index.php',
  pro: 'https://api.msjew.com/index.php'
}

const resourceUrl = {
  dev: '',
  test: '',
  pro: ''
}

console.log('serverUrl=======>', serverUrl[RUNNING_ENV])
console.log('resourceUrl=======>', resourceUrl[RUNNING_ENV])
module.exports = {
  mode: 'universal',
  server: {
    port: 8418, // default: 3000
    host: '0.0.0.0' // default: localhost 0.0.0.0
  },
  /*
   ** Headers of the page
   */
  head: {
    title: '猫闪官网',
    meta: [
      { charset: 'utf-8' },
      {
        name: 'viewport',
        content:
          'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no, minimal-ui'
      }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      {
        rel: 'stylesheet',
        href: '//at.alicdn.com/t/font_1084741_as3v5yvkbke.css'
      }
    ],
    script: [
     {
        src: 'https://hm.baidu.com/hm.js?41361807982836a57c397f6c24feb20e',
        type: 'text/javascript',
        charset: 'utf-8',
        async: true
      },
      {
        src: 'https://www.googletagmanager.com/gtag/js?id=UA-102007445-1',
        type: 'text/javascript',
        charset: 'utf-8',
        async: true
      },
      {
        src: '/flexible.js',
        type: 'text/javascript',
        charset: 'utf-8'
      },
    //  {
    //     src: 'https://pwt.zoosnet.net/JS/LsJS.aspx?siteid=PWT48608987&float=1&lng=cn',
    //     type: 'text/javascript',
    //     charset: 'utf-8',
    //   },      
      {
        src: '/google-layer.js',
        type: 'text/javascript',
        charset: 'utf-8'
      },
     {
        src: '/facebook-pixel-code-cn.js',
        type: 'text/javascript',
        charset: 'utf-8'
      },
     {
        src: '/qrcode.min.js',
        type: 'text/javascript',
        charset: 'utf-8'  
      },
      {
        src: 'https://js.stripe.com/v3',
        type: 'text/javascript',
        charset: 'utf-8'  
      }
    ]
  },
  env: {
    DEVELOPMENT_URL: 'http://120.78.68.106:8090/',
    PRODUCTION_URL: 'http://120.78.68.106/bdd-web/',
    RESOURCE_URL: resourceUrl[RUNNING_ENV],
    STATIC_PATH
  },
  /*
   ** Customize the progress-bar color
   */
  // loading: { color: '#fff' },
  loading: '~/components/loading.vue',
  /*
   ** Global CSS
   */
  css: [
    { src: 'normalize.css/normalize.css' },
    { src: '~assets/css/base.css' },
    { src: '~assets/css/iconfont.css' },
    { src: '~assets/css/common.css' },
    { src: 'element-ui/lib/theme-chalk/index.css' },
    { src: '~assets/css/element-customize.css' },
    { src: 'swiper/dist/css/swiper.css' }
  ],
  /*
   ** Plugins to load before mounting the App
   */
  plugins: [
    { src: '@/plugins/basics', ssr: true },
    { src: '@/plugins/axios', ssr: true },
    { src: '@/plugins/init-helpers', ssr: false },
    { src: '@/plugins/ssr-helpers', ssr: true },
    { src: '@/plugins/vue-components', ssr: true },
    { src: '@/plugins/element-ui', ssr: true },
    { src: '@/plugins/i18n', ssr: true },
    { src: '@/plugins/vue-https', ssr: true },
    { src: '@/plugins/baiduGa', ssr: true /*大陆站点百度统计代码*/}
  ],
  /*
   ** Nuxt.js dev-modules
   */
  devModules: [
    // Doc: https://github.com/nuxt-community/eslint-module
    // '@nuxtjs/eslint-module'
  ],
  /*
   ** Nuxt.js modules
   */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/proxy',
    '@nuxtjs/axios',
    '@nuxtjs/style-resources'
  ],
  styleResources: {
    less: [
      './assets/css/var.less',
      './assets/css/commons.less',
      './assets/css/list.less',
      './assets/css/detail.less'
    ]
  },
  /*
   ** Axios module configuration
   ** See https://axios.nuxtjs.org/options
   */
  axios: {
    // See https://github.com/nuxt-community/axios-module#options
    prefix: serverUrl[RUNNING_ENV],
    baseURL:serverUrl[RUNNING_ENV],
    // proxy: true
  },
  /*proxy: [
    [
      '/',
      {
        target: serverUrl[RUNNING_ENV],
        changeOrigin: true,
        ogLevel: 'debug',
        pathRewrite: { '^/api/': '/' }
      }
    ]
  ],*/
  router: {
    middleware: ['setBasic', 'setToken','pcToWap'],
    scrollBehavior(to, from, savedPosition) {
      return { x: 0, y: 0 }
    }
  },
  /*
   ** Build configuration
   */
  build: {
    extractCSS: { allChunks: true },
    // 将dist文件上传到CDN，需将publicPath设置为CDN
    publicPath: CDN_PATH,
    transpile: [/^element-ui/],
    postcss: {
      preset: {
        // 更改postcss-preset-env 设置
        autoprefixer: {
          // browsers: ['> 1%', 'last 2 versions', 'not ie <= 8']
        }
      }
    },
    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {
      // Run ESLint on save
      // if (ctx.isDev && ctx.isClient) {
      //   config.module.rules.push({
      //     enforce: 'pre',
      //     test: /\.(js|vue)$/,
      //     loader: 'eslint-loader',
      //     exclude: /(node_modules)/
      //   })
      // }
    }
  }
}
