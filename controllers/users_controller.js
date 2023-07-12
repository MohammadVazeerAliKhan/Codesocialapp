const User = require('../models/user');

module.exports.profile = function(req, res){
  return res.end('<h1>User Profile</h1>');
}


module.exports.likes = function(req, res){
  return res.end('<h1>Like Me I already have 2.6M likes!</h1>');
}


module.exports.signUp = function(req, res){
  return res.render('user_sign_up',{
    title: "CodeSocailApp 1 Sign Up"
  })
}


module.exports.signIn = function(req, res){
  return res.render('user_sign_in',{
    title: "CodeSocailApp 1 Sign In"
  })
}


//get the sign-up data
module.exports.create = function(req, res){
  //TODO
  if (req.body.password != req.body.confirm_password){
    return res.redirect('back');
  }

  User.findOne({email: req.body.email}).then(function(user){
    if(!user){
      User.create(req.body).then(function(user){
        return res.redirect('/users/sign-in');
      });
    }
    else{
      return res.redirect('back');
    }
  }).catch(function(err){
    console.log('Error');  
  });
}



//sign-in and craete session for the user
module.exports.createSession = function(req, res){
  //TODO
}