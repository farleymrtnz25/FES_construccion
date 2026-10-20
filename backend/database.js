const mysql = require('mysql2/promise');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '.env') });

const poolConfig = {
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT ? Number(process.env.DB_PORT) : 3306,
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'fes_construccion',
  waitForConnections: true,
  connectionLimit: 15,
  queueLimit: 0,
  enableKeepAlive: true,
  keepAliveInitialDelay: 10000,
  ssl: (process.env.DB_SSL === 'true' || process.env.DB_PORT === '4000') ? { rejectUnauthorized: false } : undefined
};

const db = mysql.createPool(poolConfig);

// Test inicial no bloqueante
db.getConnection()
  .then((conn) => {
    console.log('✅ Conexión exitosa a MySQL (XAMPP - fes_construccion)');
    conn.release();
  })
  .catch((err) => {
    console.warn('⚠️ Advertencia al conectar con MySQL:', err.message);
  });

module.exports = db;
