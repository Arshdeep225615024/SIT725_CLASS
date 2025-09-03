

const express = require('express');
const mongoose = require('mongoose');
const projectRoutes = require('./routes/projectRoutes');

const app = express();
const port = process.env.PORT || 3004;

const http = require('http').createServer(app); 
const io = require('socket.io')(http);

io.on('connection', (socket) => {
    console.log('a user connected')
    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
    setInterval(()=>{
        socket.emit('number', parseInt(Math.random()*10));
    }, 1000);
});

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
http.listen(port, () => {
    console.log(`App listening on port ${port}`);
});