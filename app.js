const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./routes/authRoutes');
const calcRoutes = require('./routes/calcRoutes');
const cookieParser = require('cookie-parser');
const { requireAuth } = require('./middleware/authMiddleware');
const { checkUser } = require('./middleware/authMiddleware');


const app = express();

// middleware
app.use(express.static('public'));
app.use(express.json());
app.use(cookieParser());

// view engine
app.set('view engine', 'ejs');

// database connection
const dbURI = 'mongodb+srv://user1:cellardoor@cluster0.h37lvqb.mongodb.net/auth-node-example?retryWrites=true&w=majority'
//const dbURI = 'mongodb+srv://shaun:test1234@cluster0.del96.mongodb.net/node-auth';
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex:true })
  .then((result) => app.listen(3000))
  .catch((err) => console.log(err));

// routes
app.get('*', checkUser);//apply to every single route
app.get('/', (req, res) => res.render('home'));
app.get('/smoothies', requireAuth, (req, res) => res.render('smoothies'));
app.get('/calculate', (req, res) => res.render('calculate'));
app.get('/error', (req, res) => res.render('error'));
//app.get('/accountpage', (req, res) => res.render('accountpage'));
app.use(authRoutes);
app.use(calcRoutes);


//cookies
/*app.get('/set-cookies', (req, res) => {

  //res.setHeader('Set-Cookie', 'newUser=true');

  res.cookie('newUser', false);
  res.cookie('isEmployee', true, { maxAge: 1000 * 60 * 60 * 24, secure: true });//1 day in milliseconds, secure for https, we will not get cookie as we have http httpOnly -> cannot get cookie from the frontEnd
  
  
  res.send('you got the cookies!')

})

app.get('/read-cookies', (req, res) => {

  const cookies = req.cookies;
  console.log(cookies.newUser);

  res.json(cookies);
});*/

