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

db.serialize(() => {
  db.run(
    `
  CREATE TABLE IF NOT EXISTS categories
  (
    category_id
    INTEGER
    PRIMARY
    KEY
    AUTOINCREMENT,
    category_name
    TEXT
    NOT
    NULL
  );

  CREATE TABLE IF NOT EXISTS collections
  (
    collection_id
    INTEGER
    PRIMARY
    KEY
    AUTOINCREMENT,
    collection_name
    TEXT
    NOT
    NULL
  );

  CREATE TABLE IF NOT EXISTS items
  (
    item_id
    TEXT
    PRIMARY
    KEY
    NOT
    NULL,
    item_name
    TEXT
    NOT
    NULL,
    fk_category
    INTEGER,
    fk_collection
    INTEGER,
    price
    REAL,
    stock
    INTEGER,
    FOREIGN
    KEY
  (
    fk_category
  ) REFERENCES categories
  (
    category_id
  ),
    FOREIGN KEY
  (
    fk_collection
  ) REFERENCES collections
  (
    collection_id
  )
    );

  CREATE TABLE IF NOT EXISTS orders
  (
    order_id
    INTEGER
    PRIMARY
    KEY
    AUTOINCREMENT,
    order_date
    DATE,
    order_email
    TEXT,
    order_name
    TEXT,
    order_address
    TEXT,
    order_postal
    TEXT,
    order_country
    TEXT
  );

  CREATE TABLE IF NOT EXISTS orders_items
  (
    fk_order_id
    INTEGER
    NOT
    NULL,
    fk_item_id
    TEXT
    NOT
    NULL,
    PRIMARY
    KEY
  (
    fk_order_id,
    fk_item_id
  ),
    FOREIGN KEY
  (
    fk_order_id
  ) REFERENCES orders
  (
    order_id
  ),
    FOREIGN KEY
  (
    fk_item_id
  ) REFERENCES items
  (
    item_id
  )
    );`
  )
})

app.get('/', (req, res) => {
  const sql = 'select * from categories, item, collection, user, order'
})

app.get('/items', (req, res) => {
  const sql = 'select * from items i join categories cat on cat.category_id = i.fk_category join collections col on col.collection_id = i.fk_collection ORDER BY col.collection_name, item_name'
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
  const sql = 'select * from categories ORDER BY category_name'
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
  const sql = 'select * from collections ORDER BY collection_name'
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
  const {username, password} = req.body
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

app.post('/orders', (req, res) => {
  const sql = 'select * from orders_items join items i on i.item_id = orders_items.fk_item_id'
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

app.post('/save-order', (req, res) => {
  const orderData = req.body

  const orderInsertSql = `
    INSERT INTO orders (order_date, order_email, order_name, order_address, order_postal, order_country)
    VALUES (?, ?, ?, ?, ?, ?)
  `

  const values = [new Date(), orderData.email, orderData.name, orderData.address, orderData.postal, orderData.country]

  db.run(orderInsertSql, values, function (err) {
    if (err) {
      console.error("Fehler beim Einfügen der Bestellung:", err.message)
      res.status(500).json({error: err.message})
      return
    }

    console.log("Bestellung erfolgreich eingefügt. ID:", this.lastID)

    // Jetzt können wir die Bestellungselemente einfügen
    const orderId = this.lastID
    const orderItems = orderData.items
    console.log(orderItems)

    const orderItemInsertSql = `
      INSERT INTO orders_items (fk_order_id, fk_item_id)
      VALUES (?, ?)
    `

    // Eine Transaktion starten, um sicherzustellen, dass entweder alle Artikel eingefügt werden oder keiner
    db.run("BEGIN TRANSACTION", function (err) {
      if (err) {
        console.error("Fehler beim Starten der Transaktion:", err.message)
        res.status(500).json({error: err.message})
        return
      }

      // Artikel in die Datenbank einfügen
      orderItems.forEach(item => {
        db.run(orderItemInsertSql, [orderId, item.item_id], function (err) {
          if (err) {
            console.error("Fehler beim Einfügen des Artikels:", err.message)
            res.status(500).json({error: err.message})
            return
          }
          console.log("Artikel erfolgreich eingefügt. ID:", this.lastID)
        })
      })

      // Transaktion beenden
      db.run("COMMIT", function (err) {
        if (err) {
          console.error("Fehler beim Beenden der Transaktion:", err.message)
          res.status(500).json({error: err.message})
          return
        }

        console.log("Transaktion erfolgreich abgeschlossen.")
        res.json({message: 'Bestellung erfolgreich gespeichert'})
      })
    })
  })
})


app.listen(PORT, () => {
  console.log(`Server läuft auf http://localhost:${PORT}`)
})
