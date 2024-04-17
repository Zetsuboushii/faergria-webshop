const express = require('express')
const sqlite3 = require('sqlite3').verbose()
const cors = require('cors')
const app = express()
const PORT = 1337

app.use(cors())

app.use(express.json())

const db = new sqlite3.Database('./src/identifier.sqlite', sqlite3.OPEN_READWRITE, (err) => {
  if (err) return console.error(err.message)
  console.log('Verbunden mit der SQLite-Datenbank.')
})

app.get('/', (req, res) => {
  const sql = 'select * from category, item, collection, user, order'
})

app.get('/items', (req, res) => {
  const sql = 'select * from item join category cat on cat.category_id = item.fk_category join collection col on col.collection_id = item.fk_collection ORDER BY col.collection_name, item_name'
  db.all(sql, [], (err, rows) => {
    if (err) {
      res.status(400).json({error: err.message})
      return
    }
    res.json({
      message: 'Erfolg',
      data: rows
    })
  })
})

app.get('/categories', (req, res) => {
  const sql = 'select * from category ORDER BY category_name'
  db.all(sql, [], (err, rows) => {
    if (err) {
      res.status(400).json({error: err.message})
      return
    }
    res.json({
      message: 'Erfolg',
      data: rows
    })
  })
})

app.get('/collections', (req, res) => {
  const sql = 'select * from collection ORDER BY collection_name'
  db.all(sql, [], (err, rows) => {
    if (err) {
      res.status(400).json({error: err.message})
      return
    }
    res.json({
      message: 'Erfolg',
      data: rows
    })
  })
})

app.post('/login', (req, res) => {
  const { username, password } = req.body
  const sql = 'select * from user WHERE username = ? AND password = ?'
  db.get(sql, [username, password], (err, row) => {
    if (err) {
      res.status(400).json({error: err.message})
      return
    }
    res.json({
      message: 'Erfolg',
      data: row
    })
  })
})

app.get('/orders', (req, res) => {
  const sql = 'select * from order_item join main.items i on i.item_id = order_item.fk_item_id'
  db.all(sql, [], (err, rows) => {
    if (err) {
      res.status(400).json({error: err.message})
      return
    }
    res.json({
      message: 'Erfolg',
      data: rows
    })
  })
})

app.listen(PORT, () => {
  console.log(`Server läuft auf http://localhost:${PORT}`)
})
