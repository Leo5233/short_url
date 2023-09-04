const sqlite3 = require('sqlite3')
const DB_PATH = './test.db'

async function start(){
  const db = new sqlite3.Database(DB_PATH, (err) => {
    if (err) {
      return console.error(err.message)
    } else {
      console.log('Connect to database')
    }
  })

  db.run('CREATE TABLE IF NOT EXISTS `short_urls` (`short_url` VARCHAR(5) NOT NULL, `full_url` VARCHAR(2048) NOT NULL); ')


  db.close((err) => {
    if (err) {
      return console.error(err.message)
    } else {
      console.log('Close the database connection')
    }
  })
}

async function insertNewUrl(db, shortUrl, fullUrl) {
  await db.run('INSERT INTO short_urls(short_url, full_url) VALUES (?,?);', [shortUrl, fullUrl])
}

module.exports.start = start
module.exports.insertNewUrl = insertNewUrl