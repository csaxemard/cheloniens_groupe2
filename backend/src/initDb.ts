import * as mariadb from 'mariadb'

const pool = mariadb.createPool({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'cheloniens',
    connectionLimit: 5
})

export async function initDatabase() {
    let conn
    try {
        conn = await pool.getConnection()
        
        // Créer DB si n'existe pas
        await conn.query(`CREATE DATABASE IF NOT EXISTS cheloniens`)
        await conn.query(`USE cheloniens`)

        // Créer tables
        await conn.query(`
      CREATE TABLE IF NOT EXISTS turtles (
        id INT PRIMARY KEY AUTO_INCREMENT,
        name VARCHAR(100) NOT NULL,
        species VARCHAR(100)
      )
    `)

        return pool
    } finally {
        if (conn) conn.release()
    }
}