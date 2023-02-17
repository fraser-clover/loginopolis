const express = require('express');
const app = express();
const bcrypt = require('bcrypt');
const { User } = require('./db');

app.use(express.json());
app.use(express.urlencoded({extended:true}));

const hashPassword = async (password, saltCount) => {
    const hash = await bcrypt.hash(password, saltCount);
    return hash;
}


app.get('/', async (req, res, next) => {
  try {
    res.send('<h1>Welcome to Loginopolis!</h1><p>Log in via POST /login or register via POST /register</p>');
  } catch (error) {
    console.error(error);
    next(error)
  }
});

// POST /register
// TODO - takes req.body of {username, password} and creates a new user with the hashed password
app.post('/register', async (req, res, next) => {
   try {
        const { username, password } = req.body;
        const hashedPw = await hashPassword(password, 9);
        let newUser = await User.create({username: username, password: hashedPw});
        res.send(`successfully created user ${username}`);

    } catch (error) {
        console.log(error);
        next(error);
    }
});

// POST /login
// TODO - takes req.body of {username, password}, finds user by username, and compares the password with the hashed version from the DB

app.post('/login', async (req, res, next) => {
  try {
      const { username, password } = req.body;
      const [foundUser] = await User.findAll({where: {username}});
      if(!foundUser) {

        res.sendStatus(401)

      } else {

        const isMatch = await bcrypt.compare(password, foundUser.password);

        if(isMatch){
          res.send(`successfully logged in user ${username}`);
        } else {
          return res.status(401).send('incorrect username or password')
        }

      }    
  } catch(error) {
      console.log(error);
  }
})

// we export the app, not listening in here, so that we can run tests
module.exports = app;
