// server/index.js
const express = require("express");
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const authRoutes = require('./routes/authRoutes');
const calcRoutes = require('./routes/calcRoutes');
const userRoutes = require('./routes/userRoutes');
const { requireAuth } = require('./middleware/authMiddleware');
const { checkUser } = require('./middleware/authMiddleware');

//const PORT = process.env.PORT || 3001;

const app = express();

//middleware
app.use(express.json());
app.use(cookieParser());

//database connection
const dbURI = 'mongodb+srv://user1:cellardoor@cluster0.h37lvqb.mongodb.net/auth-node-example?retryWrites=true&w=majority'
mongoose.connect(dbURI)
  .then((result) => app.listen(3001))
  .catch((err) => console.log(err));

//routes
app.use(authRoutes);
app.use(calcRoutes);
app.use(userRoutes);
