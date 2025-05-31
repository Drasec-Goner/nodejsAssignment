const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const personRoutes = require('./routes/personRoutes');
app.use('/person', personRoutes);

// Add this route to redirect root to /person
app.get('/', (req, res) => {
    res.redirect('/person');
});

mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log('MongoDB Connected');
        app.listen(3000, () => console.log('Server running at http://localhost:3000'));
    })
    .catch(err => {
        console.error('Failed to connect to MongoDB:', err);
        process.exit(1);
    }
);
