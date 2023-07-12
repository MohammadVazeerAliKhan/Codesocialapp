module.exports.home = function(req, res){
  console.log(req.cookies);
  res.cookie('wasim Khan', 2345);
  return res.render('home',{
    title: 'Home'
  });
}

module.exports.post = function(req, res){
  return res.render('user_profile',{
    title: 'Post'
  });
}  