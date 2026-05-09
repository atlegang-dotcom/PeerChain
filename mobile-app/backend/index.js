require('dotenv').config();
const express = require('express');
const cors = require('cors');

const authRoutes = require('./src/routes/auth.js');
const ping = require('./src/routes/ping.js');
const db = require('./src/config/database.js');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/ping', ping);
app.use('/auth', authRoutes);

// Initialize DB and start server
async function start() {
  try {
    await db.init();
    console.log('Database initialized');
  } catch (err) {
    console.warn('Database not available, using in-memory fallback:', err.message);
  }

  const port = process.env.PORT || 3001;
  app.listen(port, () => {
    console.log(`PeerChain backend running on port ${port}`);
  });
}

start();
