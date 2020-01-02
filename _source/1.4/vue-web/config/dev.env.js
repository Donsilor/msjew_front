'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.dev')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  RUNNING_ENV: '"dev"'
})
