const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const handler = require('../src/controller.js')
const pug = require('pug')
const fs = require('fs')
const morgan = require('morgan')
const path = require('path')
const rfs = require('rotating-file-stream')

app.set('view engine', 'pug')
app.set('views', './views')

//配置路由
const router = express.Router();
//配置访问静态文件
app.use(express.static('public'));
//配置解析json
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
// 配置跨域Header
app.use(function (req, res, next) {

  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', '*');

  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', true);

  // Pass to next layer of middleware
  next();
});

// 配置访问日志
var appDir = path.dirname(require.main.filename);
var logDir = path.join(appDir, 'log')
// ensure log directory exists
fs.existsSync(logDir) || fs.mkdirSync(logDir)
// create a rotating write stream
var accessLogStream = rfs('access.log', {
  interval: '1d', // rotate daily
  path: logDir
})
app.use(morgan('combined', {stream: accessLogStream}));
// 以下为实际路由配置
router.get('/test', function(req, res){
  handler.handleTest(req, res)
})

app.use('/api/v1', router)


/**
 * 验证token
 */
app.use(function(req, res, next){
  if (req.headers.token) {
    next()
  } else {
    next()
  }
})

/**
*handle 404
*/
app.use(function(req, res, next){
  res.status(404);

  // respond with html page
  if (req.accepts('html')) {
    res.render('404', { message: req.url })
    return
  }

  // respond with json
  if (req.accepts('json')) {
    res.send({ errno: 404, error: 'Resource Not found' })
    return
  }

  // default to plain-text. send()
  res.type('txt').send('Not found')
})
/**
 * 处理异常
 */
app.use(function(err, req, res, next){
  res.status(200)
  //console.log(err.toString())
  res.send({ errno: 500, error: err.toString() })
})

module.exports = app;