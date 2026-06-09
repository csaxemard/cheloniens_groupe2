import * as mariadb from 'mariadb';


const pool = mariadb.createPool({
    host: '127.0.0.1',
    user: 'root',
    password: 'root',
    database: 'cheloniens',
    connectionLimit: 5,
    namedPlaceholders: true
});

export default pool;
