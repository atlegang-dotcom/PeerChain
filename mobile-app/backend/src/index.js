require('dotenv').config();
const express = require('express');
const cors = require('cors');

const authRoutes       = require('./routes/auth');
const pingRoutes       = require('./routes/ping');
const sessionRoutes    = require('./routes/sessions');
const reputationRoutes = require('./routes/reputation');
const fundingRoutes    = require('./routes/funding');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/ping',       pingRoutes);
app.use('/auth',       authRoutes);
app.use('/sessions',   sessionRoutes);
app.use('/reputation', reputationRoutes);
app.use('/funding',    fundingRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`StudyStream backend running on port ${PORT}`);
});
