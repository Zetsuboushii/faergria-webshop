import sqlite3 from 'sqlite3'

async function openDatabase(): Promise<sqlite3.Database> {
  return new Promise((resolve, reject) => {
    const db = new sqlite3.Database('../identifier.sqlite', (err) => {
      db.run('create table if not exists categories(category_id integer not null constraint categories_pk primary key autoincrement, name text not null)', (err) => {
        if (err) reject(err)
        resolve(db)
      })
      if (err) reject(err)
      resolve(db)
    })
  })
}

export default openDatabase
