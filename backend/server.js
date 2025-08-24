

/*
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const app = express();
const PORT = process.env.PORT || 5002;

app.use(cors());
app.use(bodyParser.json());

// MongoDB Connection


const mongoURI = 'mongodb+srv://WriteUser: BkySOU9n6hogm4z6@cluster0.rsf8d.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('Could not connect to MongoDB:', err));

// Define the User Schema
const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    shapeDataHash: { type: String, required: true },
});

const User = mongoose.model('User', userSchema);

// Register Route
app.post('/api/register', async (req, res) => {
    const { username, email, shapeData } = req.body;

    try {
        // Hash the shape data before saving it to the database
        const hashedShapeData = await bcrypt.hash(JSON.stringify(shapeData), 10);

        // Check if user already exists
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(400).json({ message: 'Username already exists' });
        }

        // Create new user
        const newUser = new User({
            username,
            email,
            shapeDataHash: hashedShapeData,
        });

        await newUser.save();
        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        console.error('Error registering user:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// Login Route
app.post('/api/login', async (req, res) => {
    const { username, shapeData } = req.body;

    try {
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(400).json({ message: 'Invalid username' });
        }

        // Compare the hashed shape data
        const match = await bcrypt.compare(JSON.stringify(shapeData), user.shapeDataHash);
        if (match) {
            res.json({ message: 'Login successful' });
        } else {
            res.status(400).json({ message: 'Shape data does not match' });
        }
    } catch (error) {
        console.error('Error logging in:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
*/
require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const app = express();
const PORT = process.env.PORT || 5002;

app.use(cors());
app.use(bodyParser.json());

// MongoDB Connection
const mongoURI = process.env.MONGO_URI;
mongoose.connect(mongoURI, { 
    serverSelectionTimeoutMS: 5000 // Adjust the timeout as needed
})
    .then(() => console.log('MongoDB connected successfully'))
    .catch(err => console.error('Could not connect to MongoDB:', err));

// Define the User Schema
const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    shapeDataHash: { type: String, required: true },
});

const User = mongoose.model('User ', userSchema);

// Register Route
app.post('/api/register', async (req, res) => {
    const { username, email, shapeData } = req.body;

    try {
        // Hash the shape data before saving it to the database
        const hashedShapeData = await bcrypt.hash(JSON.stringify(shapeData), 10);

        // Check if user already exists
        const existingUser  = await User.findOne({ username });
        if (existingUser ) {
            return res.status(400).json({ message: 'Username already exists' });
        }

        // Create new user
        const newUser  = new User({
            username,
            email,
            shapeDataHash: hashedShapeData,
        });

        await newUser .save();
        res.status(201).json({ message: 'User  registered successfully' });
    } catch (error) {
        console.error('Error registering user:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// Login Route
app.post('/api/login', async (req, res) => {
    const { username, shapeData } = req.body;

    try {
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(400).json({ message: 'Invalid username' });
        }

        // Compare the hashed shape data
        const match = await bcrypt.compare(JSON.stringify(shapeData), user.shapeDataHash);
        if (match) {
            res.json({ message: 'Login successful' });
        } else {
            res.status(400).json({ message: 'Shape data does not match' });
        }
    } catch (error) {
        console.error('Error logging in:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
