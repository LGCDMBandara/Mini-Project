const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const cors = require('cors');
const path = require('path');


const userRoutes = require('./routes/userRoutes');
const eventRoutes = require('./routes/eventRoutes');
const bloodRoutes = require('./routes/bloodRoutes');
const emailRoutes = require('./routes/emailRoutes');
const bloodRequestRoutes = require('./routes/bloodRequestsRoutes');

dotenv.config();
connectDB();

const app = express();

app.use(cors({ origin: 'http://localhost:5173' }));
app.use(express.json());

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use('/api/users', userRoutes);
app.use('/api/events', eventRoutes);
app.use('/api/blood', bloodRoutes);
app.use('/api/email', emailRoutes);
app.use('/api/blood-requests', bloodRequestRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
