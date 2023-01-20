const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const connectDB = require('./config/db');
const dotenv = require('dotenv').config();
const Login = require('./model/login');

const bcrypt = require('bcrypt');
const saltRounds = 10;

const app = express();


// Connect Database
connectDB();

app.use(cors());

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.get('/login', (req, res) => {
  const username = req.query.username;
  const password = req.query.password;

  // try to find the user in the database
  Login.findOne({
    username: username
  }).then(user => {
    if (!user) {
      return res.status(404).json({ message: 'User not found', status: 1 });
    }
    // check if the password is correct
    bcrypt.compare(password, user.password).then(isMatch => {
      if (isMatch) {
        // User matched
        // Create JWT Payload
        const payload = {
          id: user.id,
          username: user.username
        };
        res.json({ success: true, payload: payload, status: 0 });
      } else {
        return res.status(400).json({ message: 'Password incorrect', status: 2 });
      }
    }
    );
  });
});


const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});