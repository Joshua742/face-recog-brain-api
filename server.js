const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');
const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');

/*const res = require('express/lib/response');*/
 // Enter your own database information here based on what you created
 const db = knex({
 client: 'pg',
 connection: {
   host : '127.0.0.1',
   user : 'postgres',
   password : '',
   database : 'smart-brain'
 }
});

/*db.select('*').from('users').then(data => {
    console.log(data);
});*/

const app = express();

/*app.use(bodyParser.json());*/
app.use(express.json());
app.use(cors())

/*const database = {
    users: [
     {
        id: '123',
        name: 'chris',
        email: 'chris@gmail.com',
        entries: 0,
        joined: new Date()

    },
    {
        id: '124',
        name: 'sally',
        passowrd: 'bananas',
        email: 'sally@gmail.com',
        entries: 0,
        joined: new Date()

    }
  ],
  login: [
      {
          id: 987,
          hash: '',
          email: 'chris@gmail.com'
      }
  ]
}*/

app.get('/', (req, res) => {
    res.send(database.users) })

app.post('/signin', (req, res) => { signin.handleSignin(req, res, db, bcrypt)})

app.post('/register', (req, res) => { register.handleRegister(req, res. db, bcrypt)})

app.get('/profile/:id', (req, res) => { profile.handleProfileGet(req, res, db)})

app.put('/image', (req, res) => { image.handleImage(req, res, db)})

app.post('/imageurl', (req, res) => { image.handleApiCall(req, res)})

app.listen(3000, () => {
    console.log('app is running on port 3000');
})

/*bcrypt.hash("bacon", null, null, function(err, hash) {
    // Store hash in your password DB.
});*/

// Load hash from your password DB.
/*bcrypt.compare("bacon", hash, function(err, res) {
    // res == true
});
bcrypt.compare("veggies", hash, function(err, res) {
    // res = false
});*/

/*  result - this is working
/signin - post = success/fail
/register - post = user
/profile/:userid - get = user
/image - put - user
*/