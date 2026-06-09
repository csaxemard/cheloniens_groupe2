import * as mariadb from 'mariadb';

// Pool de connexions réutilisable, importé par server.ts
const pool = mariadb.createPool({
    host: '127.0.0.1',
    user: 'root',
    password: 'root',
    database: 'cheloniens',
    connectionLimit: 5,
    namedPlaceholders: true
});

export default pool;
