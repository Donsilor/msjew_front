const config = require('../nuxt.config.js')
config.dev = process.env.NODE_ENV !== 'production'
let path
  if (config.dev) {
    path = 'https://www.bdd.bddia.com'
    console.log("path测试",path)
  } else {
    path = 'https://www.bddco.com'
    console.log("path正式",path)
  }
export default path