const express = require('express');
const ping = express.Router();

ping.get('/', (req, res) => {
  res.send("server live and healthy");
});

module.exports = ping;