const { Pool } = require('pg');

let pool = null;

async function init() {
  if (!process.env.DATABASE_URL) {
    console.log('No DATABASE_URL set, using in-memory storage');
    return;
  }

  pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
  });

  // Create tables
  await pool.query(`
    CREATE TABLE IF NOT EXISTS nonces (
      wallet_address VARCHAR(48) PRIMARY KEY,
      nonce TEXT NOT NULL,
      created_at TIMESTAMP DEFAULT NOW()
    )
  `);

  await pool.query(`
    CREATE TABLE IF NOT EXISTS users (
      wallet_address VARCHAR(48) PRIMARY KEY,
      created_at TIMESTAMP DEFAULT NOW(),
      last_login TIMESTAMP DEFAULT NOW()
    )
  `);

  // Cleanup old nonces every hour
  setInterval(async () => {
    try {
      await pool.query("DELETE FROM nonces WHERE created_at < NOW() - INTERVAL '1 hour'");
    } catch (_) {}
  }, 3600000);
}

async function query(text, params) {
  if (!pool) return null;
  return pool.query(text, params);
}

async function close() {
  if (pool) await pool.end();
}

module.exports = { init, query, close };
