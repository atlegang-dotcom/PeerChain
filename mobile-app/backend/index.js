require('dotenv').config();
const express = require('express');
const cors = require('cors');

const authRoutes = require('./src/routes/auth.js');
const ping = require('./src/routes/ping.js');
// const sessionRoutes = require('./routes/sessions');
// const reputationRoutes = require('./routes/reputation');
// const fundingRoutes = require('./routes/funding');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/ping', ping);

app.use('/auth', authRoutes);
// app.use('/sessions', sessionRoutes);
// app.use('/reputation', reputationRoutes);
// app.use('/funding', fundingRoutes);

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});