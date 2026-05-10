require('dotenv').config();
const { Connection } = require('@solana/web3.js');

const connection = new Connection(process.env.RPC_URL, 'confirmed');

module.exports = { connection };
