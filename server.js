const express = require('express');
const mongoose = require('mongoose');
const app = express();
const PORT = process.env.PORT || '3000';
const MONGO_URI = process.env.MONGO_URI || 'localhost:27017';

// Connect to MongoDB
mongoose.connect(MONGO_URI);

// Serve front end
app.use(express.static('www/build'));

// Mount router
const imageRouter = require(__dirname + '/routes/image-router');
app.use('/image', imageRouter);

// Listen
app.listen(PORT, () => console.log('Server up on port ' + PORT));