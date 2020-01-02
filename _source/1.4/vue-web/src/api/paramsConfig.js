const serverUrl = {
  dev: 'https://bddco.leyouwangluo.com/bdd-web',
  test: 'http://192.168.2.111/bdd-web',
  pre: 'https://www.bddia.com/bdd-web',
  pro: 'https://www.bddco.com/bdd-web'
};

const resourceUrl = {
  dev: 'https://bdd-dev.oss-cn-shenzhen.aliyuncs.com/',
  test: 'http://bdd-dev.oss-cn-shenzhen.aliyuncs.com/',
  pre: 'https://bdd-cdn.leyouwangluo.com/',
  pro: 'https://bdd-cdn.leyouwangluo.com/'
};

const RUNNING_ENV = process.env.RUNNING_ENV;

// 开发环境代理配置
const BASIC_URL = '/api';
console.log('RUNNING_ENV======>' + RUNNING_ENV);
console.log('serverUrl=======>', serverUrl[RUNNING_ENV]);
console.log('resourceUrl=======>', resourceUrl[RUNNING_ENV]);
// 配置参数
module.exports = {
  // 基本 打包
  BASIC_URL: serverUrl[RUNNING_ENV],
  IMG_URL: resourceUrl[RUNNING_ENV],
  // 开发环境代理
  PROXY: {
    '/api': {
      target: BASIC_URL,
      changeOrigin: true,
      ogLevel: 'debug',
      pathRewrite: {
        '^/api': ''
      }
    }
  },
  PORT: 8080,
  // axios 超时时间配置
  AXIOS_TIME_OUT: 15000,
  AXIOS_WITH_CREDENTIALS: true,
  // 请求成功的标识
  IS_SUCCESS: 0,
  // 发送验证码时间
  SECOND_COUNT: 60,
  // 查询分页参数 PAGENUM 页码 PAGESIZE 每页显示数量
  PAGENUM: 1,
  PAGESIZE: 10
};
