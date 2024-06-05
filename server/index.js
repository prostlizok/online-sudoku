const express = require('express');
const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcrypt');
const collection = require('./config');
const cors = require('cors');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
require('dotenv').config({ path: '../.env' });

const app = express();
app.use(express.json());
app.use(cors());

// Swagger setup
const swaggerOptions = {
    swaggerDefinition: {
        openapi: '3.0.0',
        info: {
            title: 'Sudoku API',
            version: '1.0.0',
            description: 'API for the Sudoku application'
        },
        servers: [
            {
                url: `http://localhost:${process.env.PORT || 5000}`
            }
        ],
    },
    apis: ['./server/index.js'],
};

const swaggerDocs = swaggerJsdoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Check if environment variables are loaded
console.log('MongoDB URI:', process.env.MONGODB_URI);

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Database connected successfully'))
    .catch(err => console.log('Error connecting to database', err));

/**
 * @swagger
 * /signup:
 *   post:
 *     summary: User signup
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 example: "exampleUser"
 *               password:
 *                 type: string
 *                 example: "examplePassword123@gmail.com"
 *     responses:
 *       201:
 *         description: User registered successfully
 *       400:
 *         description: Invalid email or mobile number or username already exists
 */
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

/**
 * @swagger
 * /login:
 *   post:
 *     summary: User login
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 example: "exampleUser"
 *               password:
 *                 type: string
 *                 example: "examplePassword123@gmail.com"
 *     responses:
 *       200:
 *         description: Login successful
 *       400:
 *         description: Invalid username or password
 */
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
