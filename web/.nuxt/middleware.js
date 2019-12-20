const middleware = {}

middleware['mustLogin'] = require('..\\middleware\\mustLogin.js');
middleware['mustLogin'] = middleware['mustLogin'].default || middleware['mustLogin']

middleware['pageNotFound'] = require('..\\middleware\\pageNotFound.js');
middleware['pageNotFound'] = middleware['pageNotFound'].default || middleware['pageNotFound']

middleware['pcToWap'] = require('..\\middleware\\pcToWap.js');
middleware['pcToWap'] = middleware['pcToWap'].default || middleware['pcToWap']

middleware['replaceWhenTokenCanUse'] = require('..\\middleware\\replaceWhenTokenCanUse.js');
middleware['replaceWhenTokenCanUse'] = middleware['replaceWhenTokenCanUse'].default || middleware['replaceWhenTokenCanUse']

middleware['setBasic'] = require('..\\middleware\\setBasic.js');
middleware['setBasic'] = middleware['setBasic'].default || middleware['setBasic']

middleware['setToken'] = require('..\\middleware\\setToken.js');
middleware['setToken'] = middleware['setToken'].default || middleware['setToken']

export default middleware
