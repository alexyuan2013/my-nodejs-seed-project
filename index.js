var app = require('./src/router.js')
var http = require('http').Server(app)

/**
 * 生产环境下注销console.log
 */
if (process.env.NODE_ENV === 'production') {
  console.log = function(){}
}

http.listen(process.env.PORT || 8005, function(){
  console.log('listening on: ' + process.env.PORT || 8005)
});