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
const adminRoutes = require('./routes/adminRoutes');
const hospitalRequestRoutes = require('./routes/hospitalRequestRoutes');

dotenv.config();
connectDB();

const app = express();

app.use(cors({ origin: 'http://localhost:5173' }));
app.use(express.json());

app.use('/uploads', express.static(path.join(__dirname, 'Uploads')));

app.use('/api/users', userRoutes);
app.use('/api/events', eventRoutes);
app.use('/api/blood', bloodRoutes);
app.use('/api/email', emailRoutes);
app.use('/api/blood-requests', bloodRequestRoutes);
app.use('/api/admins', adminRoutes);
app.use('/api/hospital-requests', hospitalRequestRoutes);

app.use((err, req, res, next) => {
    console.error('Server Error:', err.stack);
    res.status(err.status || 500).json({
        success: false,
        message: err.message || 'Internal Server Error'
    });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));