/**
 * Groups of simultaneous connections to the database, max 5
 * Gets required infos from /backend/.env 
 */

import 'dotenv/config'
import * as mariadb from 'mariadb'

const pool = mariadb.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: Number(process.env.DB_PORT) || 3306,
    connectionLimit: 5,
    connectTimeout: 5000
})


export default pool


