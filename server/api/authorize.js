function authorize (req, res, next) {
  if (req.user.id===req.params.id || req.user.isAdmin === true)
    return next()
  else
    res.sendStatus(401)
}

module.exports = authorize
