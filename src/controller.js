
var handleTest = function(req, res){
  console.log('handler test')
  something.something
  res.status(200)
  res.send({errno: 0, error: 'succ'})
}

exports.handleTest = handleTest