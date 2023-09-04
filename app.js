const express = require('express') 
const bodyParser = require('body-parser') 
const dataSys = require('./repository/url-db-context')
const getUniqueUrl = require('./utilities/unique_num_str')
const {engine} = require('express-handlebars')
const sqlite3 = require('sqlite3')
const DB_PATH = './test.db'
const app = express()
const port = 3000
const BASE_URL='localhost:3000/'
dataSys.start();


app.engine('.hbs', engine({extname: '.hbs'}))
app.set('view engine', '.hbs')
app.set('views', './views')
app.use(express.static('public'))//使用public資料夾做為靜態資料根目錄 會影響layouts/main.hbs去連結css和js
app.use(bodyParser.urlencoded({ extended: true })) //解析前端POST回來的資料需要這句

app.get('/', (req, res) => {
  res.render('index')
})

app.post('/', async (req, res) => {
  let shortUrl = ''
  try {
    const fullUrl = req.body['full_url'];
    const db = new sqlite3.Database(DB_PATH)
    //先找資料庫有無舊短址，沒有就產生新的
    db.get(`SELECT short_url, full_url FROM short_urls WHERE full_url = "${fullUrl}";`, (err, row) => {
      if (err) { throw err }
      if (row) {
        shortUrl = row.short_url
      }
      if (!shortUrl) {
        shortUrl = BASE_URL + getUniqueUrl();
        dataSys.insertNewUrl(db, shortUrl, fullUrl);
      }
      res.render('index', { shortUrl })
    })
    db.close()
  }
  catch (err) {
    res.status(400).end(err.message);
  }
});

app.get('/:url', (req, res) => {
  let full_url = ''
  const short = req.params.url
  const db = new sqlite3.Database(DB_PATH)
  //用縮網址找回原網址並重新導向
  db.get(`SELECT short_url, full_url FROM short_urls WHERE short_url LIKE "%${short}";`, (err, row) => {
    if (err) { throw err }
    if (row) {
      full_url = row.full_url
      console.log('full', full_url)
    }
    if (!full_url) {
      res.status(404).end();
    } else {
      res.status(301).redirect(full_url) //status(301)才能導向絕對路徑
    }
    
  })
  db.close()
})

app.listen(port, () => {
  console.log(`express server is running on https:localhost:${port}`)
})


