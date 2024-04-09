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

app.get('/categories', (req, res) => {
  const sql = 'select * from categories'
  db.all(sql, [], (err, rows) => {
    if (err) {
      res.status(400).json({ error: err.message })
      return
    }
    res.json({
      message: 'Erfolg',
      data: rows
    })
  })
})

app.get('/items', (req, res) => {
  const sql = 'select * from items join categories cat on cat.category_id = items.fk_category join main.collection col on col.collection_id = items.fk_collection'
  db.all(sql, [], (err, rows) => {
    if (err) {
      res.status(400).json({ error: err.message })
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
