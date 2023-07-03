module.exports.home = function(req, res){
  return res.render('home',{
    title: 'Home'
  });
}

module.exports.post = function(req, res){
  return res.render('user_profile',{
    title: 'Post'
  });
}  