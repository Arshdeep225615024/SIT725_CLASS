

const express = require('express');
const mongoose = require('mongoose');
const projectRoutes = require('./routes/projectRoutes');

const app = express();
const port = process.env.PORT || 3004;

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/myprojectDB', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
mongoose.connection.on('connected', () => {
    console.log('Connected to MongoDB');
});

// Middleware
app.use(express.static(__dirname + '/Public'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes
app.use('/api/projects', projectRoutes);

// Start server
app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});