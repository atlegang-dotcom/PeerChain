require('dotenv').config();
const express = require('express');
const cors = require('cors');

const authRoutes = require('./routes/auth');
const sessionRoutes = require('./routes/sessions');
const reputationRoutes = require('./routes/reputation');
const fundingRoutes = require('./routes/funding');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/auth', authRoutes);
app.use('/sessions', sessionRoutes);
app.use('/reputation', reputationRoutes);
app.use('/funding', fundingRoutes);

app.listen(process.env.PORT || 3000, () => {
  console.log(`StudyStream backend running on port ${process.env.PORT || 3000}`);
});
