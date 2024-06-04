const express = require('express');
const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcrypt');
const collection = require('./config');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect('mongodb://localhost:27017/mydb', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Database connected successfully'))
    .catch(err => console.log('Error connecting to database', err));

app.post('/signup', async (req, res) => {
    const { username, password } = req.body;

    const mobileRegex = /\b\d{10}\b/;
    const isMobile = mobileRegex.test(password);
    const isValid = validator.isEmail(password);

    const existing = await collection.findOne({ name: username });

    if (existing) {
        console.log("Username already exists");
        return res.status(400).send("Username already exists");
    }

    if (isMobile || isValid) {
        const hash = await bcrypt.hash(password, 10);
        const newUser = new collection({ name: username, password: hash });
        await newUser.save();
        console.log("User registered successfully");
        return res.status(201).send("User registered successfully");
    } else {
        console.log("Invalid email or mobile number");
        return res.status(400).send("Invalid email or mobile number");
    }
});

app.post('/login', async (req, res) => {
    const { username, password } = req.body;

    const user = await collection.findOne({ name: username });
    if (!user) {
        return res.status(400).send("Username not found");
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        return res.status(400).send("Invalid username or password");
    }

    return res.status(200).send("Login successful");
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
