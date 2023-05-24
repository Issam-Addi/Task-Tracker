const express = require('express');
const jwt = require('jsonwebtoken');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

// Secret key for JWT
const secretKey = 'c82796e28e08143cf47e5ec1cae06bced05c9a3c0f8077184db120ba8e5888d6';

// User registration route
app.post('/Register', (req, res) => {
  const { username, email, password } = req.body;

    // Store user information and hashed password in database
    const user = {
      username,
      email,
      password,
    };

    // Generate JWT
    const token = jwt.sign(user, secretKey);

    res.status(200).json({ token });
    console.log(user);
  });

// Protected route that requires a valid JWT
app.get('/user', authenticateToken, (req, res) => {
  // Access user information from the request object (decoded from JWT)
  const { username, email } = req.user;

  res.status(200).json({ username, email });
});

// Middleware to authenticate JWT
function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (token == null) {
    return res.sendStatus(401);
  }

  jwt.verify(token, secretKey, (err, user) => {
    if (err) {
      return res.sendStatus(403);
    }

    req.user = user;
    next();
  });
}

// Start the server
app.listen(4000, () => {
  console.log('Server is running on port 4000');
});


