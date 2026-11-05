// Gerencia a conexão com o MySQL.

import mysql from 'mysql2/promise' // permite trabalhar naturalmente com: async e await

const pool = mysql.createPool({  //createPool: cria um pool de conexões. Em vez de abrir uma nova conexão a cada requisição, as conexões podem ser reutilizadas.
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,

    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
})

export default pool