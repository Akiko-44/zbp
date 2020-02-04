var createError = require('http-errors');
var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var userRouter = require('./routes/user');
var designRouter = require('./routes/design');
var exchangeRouter = require('./routes/exchange');
var galleryRouter = require('./routes/gallery');
var jewelryRouter = require('./routes/jewelry');
var businessShopRouter = require('./routes/businessShop');
var jewelryFairRouter = require('./routes/jewelry_fair'); //珠宝展
var upAndDownRouter = require('./routes/up_and_down.js');
var manufactureRouter = require('./routes/manufacture');
var newsRouter = require('./routes/news');
var fileRouter = require('./routes/file');
var jwshowRouter = require('./routes/jwshow');
var liveRouter = require('./routes/live');
var agreementRouter = require('./routes/agreement');
var preferentialRouter = require('./routes/preferential');
var committeeRouter = require('./routes/committee');
var downRouter = require('./routes/down');
var homeRouter = require('./routes/home');
var jewelryCircleRouter = require('./routes/jewelryCircle');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(bodyParser.json({
  limit: '50mb'
}));
app.use(bodyParser.urlencoded({
  limit: '50mb',
  extended: true
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

var axios = require('axios');
app.get('/qq/getUid', function (req, res) {
  const url = 'https://graph.qq.com/oauth2.0/me';
  axios.get(url, {
    params: req.query
  }).then((response) => {
    res.json(response.data)
  }).catch((respnse) => {
    res.json('error')
  })
})
app.get('/qq/getUserInfo', function (req, res) {
  const url = 'https://graph.qq.com/user/get_user_info';
  axios.get(url, {
    params: req.query
  }).then((response) => {
    res.json(response.data)
  }).catch((respnse) => {
    res.json('error')
  })
})
app.get('/weixin/getToken', function (req, res) {
  const url = 'https://api.weixin.qq.com/sns/oauth2/access_token';
  axios.get(url, {
    params: req.query
  }).then((response) => {
    res.json(response.data)
  }).catch((respnse) => {
    res.json('error')
  })
})
app.get('/weixin/getUserInfo', function (req, res) {
  const url = 'https://api.weixin.qq.com/sns/userinfo';
  axios.get(url, {
    params: req.query
  }).then((response) => {
    res.json(response.data)
  }).catch((respnse) => {
    res.json('error')
  })
})
app.post('/weibo/getToken', function (req, res) {
  const url = "https://api.weibo.com/oauth2/access_token?client_id=" + req.query.client_id + "&client_secret=" + req.query.client_secret + "&grant_type=authorization_code&redirect_uri=" + req.query.redirect_uri + "&code=" + req.query.code;
  axios.post(url).then((response) => {
    res.json(response.data)
  }).catch((err) => {
    res.json(err)
  })
})
app.get('/weibo/getUserInfo', function (req, res) {
  const url = 'https://api.weibo.com/2/users/show.json';
  axios.get(url, {
    params: req.query
  }).then((response) => {
    res.json(response.data)
  }).catch((respnse) => {
    res.json('error')
  })
})

app.use('/', indexRouter);
app.use('/user', userRouter);
app.use('/design', designRouter);
app.use('/exchange', exchangeRouter);
app.use('/gallery', galleryRouter);
app.use('/jewelry', jewelryRouter);
app.use('/businessShop', businessShopRouter);
app.use('/jewelry_fair', jewelryFairRouter);
app.use('/manufacture', manufactureRouter);
app.use('/news', newsRouter);
app.use('/file', fileRouter);
app.use('/jwshow', jwshowRouter);
app.use('/live', liveRouter);
app.use('/up_and_down', upAndDownRouter);
app.use('/agreement', agreementRouter);
app.use('/preferential', preferentialRouter); //活动页
app.use('/committee', committeeRouter);
app.use('/download', downRouter);
app.use('/home', homeRouter);
app.use('/jewelryCircle', jewelryCircleRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});



module.exports = app;