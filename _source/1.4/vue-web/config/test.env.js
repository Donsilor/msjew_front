'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.test')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  RUNNING_ENV: '"test"'
})
