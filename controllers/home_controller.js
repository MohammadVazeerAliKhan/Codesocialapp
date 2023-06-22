module.exports.home = function(req, res){
  return res.end('<h1>Express is up  for codeSocialAPP</h1>');
}

module.exports.post = function(req, res){
  return res.end('<h1>Loading posts from home_controller page</h1>');
}