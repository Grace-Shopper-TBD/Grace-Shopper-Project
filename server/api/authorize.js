function authorize (req, res, next) {
  if (req.user && req.user.isAdmin)
    return next()
  else
    res.sendStatus(401)
}
module.exports = authorize
