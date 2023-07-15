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
    console.log('Passwords Mismatch');
    return res.redirect('back');
  }

  User.findOne({email: req.body.email}).then(function(user){
    if(!user){
      User.create(req.body).then(function(user){
        console.log('Successfully created user account');
        return res.redirect('/users/sign-in');
      }).catch(function(err){
        console.log('Error in creating user while signup');
      });
    }
    else{
      console.log('user already found cannot create new acccount sign in with your account detials');
      return res.redirect('back');
    }
  }).catch(function(err){
    console.log('error in finding  user while signing up');  
  });
}



//sign-in and craete session for the user
module.exports.createSession = function(req, res){
  //TODO
  // find the user
  User.findOne({email: req.body.email}).then(function(user){
    //handle user found
    if(user){
      //handle passwords when dont match
      if(user.password != req.body.password){
        console.log('passwprds are nt matcjiong');
        return res.redirect('back');
      }

      //handle sesssioin creation
      res.cookie('user_id',user.id);
      return res.redirect('./profile');
    }
    else{
      console.log('User not found please sign up adnd create an account to login');
      res.redirect('back');
    }
  }).catch(function(err){
      //handle user not found
      console.log('error in finding  user while signing up');  
    });

}


