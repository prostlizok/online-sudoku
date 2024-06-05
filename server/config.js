const mongoose = require('mongoose');
require('dotenv').config({ path: '../.env' });


const mongoURI = process.env.MONGODB_URL || 'mongodb://localhost:27017/mydb';

mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Database connected successfully'))
    .catch(err => console.log('Error connecting to database', err));

const LoginSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});

const collection = mongoose.model('login', LoginSchema);
module.exports = collection;
