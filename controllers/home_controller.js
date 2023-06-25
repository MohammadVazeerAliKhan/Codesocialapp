module.exports.home = function(req, res){
  return res.render('home',{
    title: 'Home'
  });
}

module.exports.post = function(req, res){
  return res.end('<h1>Loading posts from home_controller page</h1>');
}  