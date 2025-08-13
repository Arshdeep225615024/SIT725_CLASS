// var express = require("express")
// var app = express()
// var port = process.env.port || 3004
// const mongoose = require('mongoose');
// mongoose.connect('mongodb://localhost:27017/myprojectDB', {
// useNewUrlParser: true,
// useUnifiedTopology: true,
// });
// mongoose.connection.on('connected', () => {
// console.log('Connected to MongoDB');
// });

// app.use(express.static(__dirname + '/public'));
// app.use(express.json());
// app.use(express.urlencoded({ extended: false }));


// const ProjectSchema = new mongoose.Schema({
// title: String,
// image: String,
// link: String,
// description: String,
// });
// const Project = mongoose.model('Project', ProjectSchema);

// app.get('/api/projects', async (req, res) => {
// const projects = await Project.find({});
// res.json({ statusCode: 200, data: projects, message: 'Success' });
// });

// app.listen(port, () => {
// console.log(`App listening on port ${port}`);
// });

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