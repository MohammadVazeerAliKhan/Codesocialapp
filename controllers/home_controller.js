const Post = require('../models/post');

module.exports.home = function(req, res){
  // console.log(req.cookies);
  // res.cookie('wasim Khan', 2345);
  // Post.find({}).then(function(posts){
  //   return res.render('home',{
  //     title: 'Code Social ~ Home Page',
  //     posts: posts
  //   })
  // });

  //populating the user to access and show user info from post js

  Post.find({}).populate('user').then(function(posts){
    return res.render('home',{
      title: 'Code Social ~ Home Page',
      posts: posts
    });
    });

}