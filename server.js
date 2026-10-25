const express = require('express');
const dotenv = require('dotenv');
const authRoutes = require('./routes/authRoutes');
const reportRoutes = require('./routes/reportRoutes');

dotenv.config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// HARUS ADA BARIS INI
app.use(express.static('public'));

app.use('/api/auth', authRoutes);
app.use('/api/reports', reportRoutes);

// Sebaiknya seperti ini agar membuka localhost:3000 langsung ke login
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/login.html');
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server berjalan di port ${PORT}`);
});