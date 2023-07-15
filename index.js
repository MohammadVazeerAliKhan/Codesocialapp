const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();
const port = 8000;
const expressLayouts = require('express-ejs-layouts');
const db = require('./config/mongoose');
// used for session cookie and passport authenticaiton
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');
const MongoStore =require('connect-mongo');

app.use(express.urlencoded({extended: true}));

app.use(cookieParser());

app.use(express.static('./assets'));

app.use(expressLayouts);

app.set('layout extractStyles',true);
app.set('layout extractScripts', true);


// Setting ejs for sending back html to browser
app.set('view engine','ejs');
app.set('views','./views');

// mongo store is used to store cookie in the db
// app.use(session({
//   name: 'codeial',
//   // TODO change secret message before deloying to production
//   secret: 'Something',
//   saveUninitialized: false,
//   resave: false,
//   cookie: {
//     maxAge: (1000*60*100)
//   },
//   store: new MongoStore({
//     mongooseConnection: db,
//     autoRemove: 'disabled'
//   },
//   function(err){
//     console.log(err || 'connect-mongodb setup ok');
//   })
// }));

app.use(
  session({
    name: 'codeial',
    // TODO: change secret message before deploying to production
    secret: 'Something',
    saveUninitialized: false,
    resave: false,
    cookie: {
      maxAge: 1000 * 60 * 100,
    },
    // store: new MongoStore.create({
    //   mongooseConnection: db,
    //   autoRemove: 'disabled',
    // }),
    store:MongoStore.create({
        mongoUrl:'mongodb://localhost/Post-Comment-DB',
        autoRemove:'disabled'
    }
  , function(err){
    console.log(err || 'connect-mongodb setup ok');
  })
}));



app.use(passport.initialize());
app.use(passport.session());

app.use(passport.setAuthenticatedUser);


// Use express router as middleware
app.use('/',require('./routes'));


// connecting server using port
app.listen(port, function(err){
  if (err){
   console.log(`Error connecting to server ${err}`);
   return;
  }
  console.log(`Server up and running on ${port}`);
});
