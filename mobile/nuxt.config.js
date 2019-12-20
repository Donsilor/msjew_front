const pkg = require('./package')

const RUNNING_ENV = process.env.RUNNING_ENV || 'pro'
const CDN_PATH = process.env.CDN_PATH || ''
// 转移后的static文件夹路径
const STATIC_PATH = process.env.STATIC_PATH || ''

console.log('RUNNING_ENV=====>', RUNNING_ENV)

const serverUrl = {
  dev: 'https://bddco.leyouwangluo.com/bdd-web',
  test: 'http://192.168.2.111/bdd-web',
  pre: 'https://www.bddia.com/bdd-web',
  pro: 'https://www.bddco.com/bdd-web'
}

const resourceUrl = {
  dev: 'https://bdd-dev.oss-cn-shenzhen.aliyuncs.com/',
  test: 'http://bdd-dev.oss-cn-shenzhen.aliyuncs.com/',
  pre: 'https://bdd-cdn.leyouwangluo.com/',
  pro: 'https://bdd-cdn.leyouwangluo.com/'
}

console.log('serverUrl=======>', serverUrl[RUNNING_ENV])
console.log('resourceUrl=======>', resourceUrl[RUNNING_ENV])

module.exports = {
  mode: 'universal',

  /*
   ** Headers of the page
   */
  head: {
    title: pkg.name,
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
      {
        src: '/live-chat.js',
        type: 'text/javascript',
        charset: 'utf-8'
      },
      {
        src: '/google-layer.js',
        type: 'text/javascript',
        charset: 'utf-8'
      }
    ]
  },
  env: {
    DEVELOPMENT_URL: 'http://120.78.68.106:8090/',
    PRODUCTION_URL: 'http://120.78.68.106/bdd-web/',
    RESOURCE_URL: resourceUrl[RUNNING_ENV],
    STATIC_PATH: STATIC_PATH
  },
  /*
   ** Customize the carat-bar color
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
    { src: '~assets/css/common.css' }
  ],
  transition: {
    name: 'layout',
    mode: 'out-in'
  },
  /*
   ** Plugins to load before mounting the App
   */
  plugins: [
    { src: '@/plugins/basics', ssr: true },
    { src: '@/plugins/axios', ssr: true },
    { src: '@/plugins/init-helpers', ssr: false },
    { src: '@/plugins/touch', ssr: false },
    { src: '@/plugins/ssr-helpers', ssr: true },
    { src: '@/plugins/vue-components', ssr: true }
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
    less: ['./assets/css/var.less', './assets/css/commons.less']
  },
  /*
   ** Axios module configuration
   */
  axios: {
    // See https://github.com/nuxt-community/axios-module#options
    prefix: '/api',
    proxy: true
  },
  proxy: [
    [
      '/api',
      {
        target: serverUrl[RUNNING_ENV],
        changeOrigin: true,
        ogLevel: 'debug',
        pathRewrite: { '^/api/': '/' }
      }
    ]
  ],
  router: {
    middleware: ['setBasic', 'setToken', 'pcToWap'],
    scrollBehavior: function(to, from, savedPosition) {
      return { x: 0, y: 0 }
    }
  },
  /*
   ** Build configuration
   */
  build: {
    // 将dist文件上传到CDN，需将publicPath设置为CDN
    publicPath: CDN_PATH,
    // vendor: ['axios'],
    postcss: {
      plugins: {
        // 通过传递 false 来禁用插件
        'postcss-px2rem': { remUnit: 37.5 }
      },
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
      if (ctx.isDev && ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    },
    optimization: {
      splitChunks: {
        chunks: 'all',
        automaticNameDelimiter: '.',
        maxAsyncRequests: 7,
        cacheGroups: {
          vuetify: {
            test: /node_modules[\\/]vuetify/,
            chunks: 'all',
            priority: 20,
            name: true
          },
          elementui: {
            test: /node_modules[\\/]element-ui/,
            chunks: 'all',
            priority: 20,
            name: true
          }
        }
      }
    }
  }
}
