const User = require('../models/user');

module.exports.profile = function(req, res){
  if (req.cookies.user_id){
    User.findById(req.cookies.user_id).then(function(user){
      if(user){
        return res.render('user_profile',{
          title: 'User Profile',
          user: user
        })
      }
      return res.redirect('./sign-in');
    }).catch(function(err){
      console.log('Error in finding user in DB');
      return res.redirect('./sign-in');
    })
  }
  else{
    return res.redirect('./sign-in');
  }
}


module.exports.likes = function(req, res){
  return res.end('<h1>Like Me I already have 2.6M likes!</h1>');
}


module.exports.signUp = function(req, res){
  if (req.isAuthenticated()){
    return res.redirect('/users/profile');
  }
  return res.render('user_sign_up',{
    title: "CodeSocailApp 1 Sign Up"
  })
}


module.exports.signIn = function(req, res){
  if (req.isAuthenticated()){
    return res.redirect('/users/profile');
  }
  return res.render('user_sign_in',{
    title: "CodeSocailApp 1 Sign In"
  })
}

module.exports.destroySession = function(req, res){
  req.logout((err) => {
    if(err){
      console.log(err);
      return;
    }
  });

  return res.redirect('/');
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
  return res.redirect('/');

  
}