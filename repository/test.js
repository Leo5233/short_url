const sqlite3 = require('sqlite3')
const DB_PATH = './test.db'

const dataSys = {
  start() {
    const db = new sqlite3.Database(DB_PATH, (err) => {
      if (err) {
        return console.error(err.message)
      } else {
        console.log('Connect to in-memory database')
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
  },

  searchShortUrl(fullUrl) {
    const db = new sqlite3.Database(DB_PATH, (err) => {
      if (err) {
        return console.error(err.message)
      } else {
        console.log('Connect to in-memory database')
      }
    })

    db.get(`SELECT short_url, full_url FROM short_urls WHERE full_url = "${fullUrl}"`, (err, row) => {
      if (err) { throw err }
      console.log(row)
    })

    db.close((err) => {
      if (err) {
        return console.error(err.message)
      } else {
        console.log('Close the database connection')
      }
    })
  },

  insertNewUrl(shortUrl, fullUrl) {
    const db = new sqlite3.Database(DB_PATH, (err) => {
      if (err) {
        return console.error(err.message)
      } else {
        console.log('Connect to in-memory database')
      }
    })

    db.run('INSERT INTO short_urls(short_url, full_url) VALUES (?,?)', [shortUrl, fullUrl])

    db.close((err) => {
      if (err) {
        return console.error(err.message)
      } else {
        console.log('Close the database connection')
      }
    })
  }
}

module.exports = dataSys