import pool from './pool.js'

export async function initDatabase() {
    let conn
    try {
        conn = await pool.getConnection()

        // Create db if not exists
        await conn.query(`CREATE DATABASE IF NOT EXISTS \`${process.env.DB_NAME}\``)
        console.log('DB created or existing')

        // Use db 
        await conn.query(`USE \`${process.env.DB_NAME}\``)
        console.log('DB used')

        // Create table
        await conn.query(`CREATE TABLE IF NOT EXISTS users (
            id INT PRIMARY KEY AUTO_INCREMENT,
            username VARCHAR(100) UNIQUE NOT NULL,
            password VARCHAR(255) NOT NULL,
            role ENUM('admin', 'user') DEFAULT 'user',
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP
        )`)
        console.log('Table users created')

        await conn.query(`
            CREATE TABLE IF NOT EXISTS observations (
                id INT PRIMARY KEY AUTO_INCREMENT,
                localisation VARCHAR(255) NOT NULL,
                date_observation DATE NOT NULL,
                meteo VARCHAR(100) NOT NULL,
                espece VARCHAR(100) NOT NULL,
                nombre_tortues INT,
                profondeur INT,
                photos VARCHAR(500),
                commentaires TEXT,
                sexe VARCHAR(50),
                stade VARCHAR(100),
                user_id INT,
                created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
            )
        `)
        console.log('Table observations created')


        console.log('Database initialized')

        return true
    } catch (err) {
        console.error('Init failed:', err)
        throw err
    } finally {
        if (conn) conn.release()
    }
}