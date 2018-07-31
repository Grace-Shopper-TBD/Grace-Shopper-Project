function checkIfUser(req,res,next) {
  console.log('ID!!!',req.user.id, typeof req.user.id,req.body)
  if(req.user && (req.user.id===+req.params.id)) next()
  else res.sendStatus(401)
}

module.exports = checkIfUser;
