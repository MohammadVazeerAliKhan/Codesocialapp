const Post = require('../models/post');

module.exports.create = function(req, res){
  Post.create({
    content: req.body.content,
    user: req.user._id
  }).then(function(post){
    return res.redirect('back');
  }).catch(function(err){
    console.log('error in creating a post');
    return;
  }); 
}