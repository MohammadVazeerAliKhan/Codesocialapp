const express = require('express');
const app = express();
const port = 8000;

// Use express router as middleware
app.use('/',require('./routes/index'));

// Setting ejs for sending back html to browser
app.set('view engine','ejs');
app.set('views','./views');


// connecting server using port
app.listen(port, function(err){
  if (err){
   console.log(`Error connecting to server ${err}`);
   return;
  }
  console.log(`Server up and running on ${port}`);
});
