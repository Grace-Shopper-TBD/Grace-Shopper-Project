
const router = require('express').Router()
const {User} = require('../db/models')

module.exports = router

router.use('/:userId', (req,res,next)=> {
  if(req.user.id===+req.params.userId || req.user.isAdmin){
    next()
  }
  else {
    const err = new Error('User is not authorized!')
    err.status = 401
    return next(err)
  }
})
// GET /api/users
router.get('/', async (req, res, next) => {
  try {
    console.log('REQ',req.user)
    if(req.user && req.user.isAdmin){
      const users = await User.findAll({
        attributes: ['id', 'email', 'isAdmin']
      })
      res.json(users)
    }
    else {
      const err = new Error('User is not authorized!')
      err.status = 401
      return next(err)
    }

  } catch (err) {
    next(err)
  }
})
// GET /api/users/:userId
router.get('/:userId', async (req, res, next) => {
  try{
    const user = await User.findById(req.params.userId)
    res.json(user)
  } catch (error) {
    next(error)
  }
})

// POST /api/users
router.post('/', async (req, res, next) => {
  try {
    const user = await User.create(req.body)
    res.sendStatus(201)
  } catch (error) {
    next(error)
  }
})

// PUT /api/users/:userId
router.put('/:userId', async (req,res,next) => {
  try {
    const findUser = await User.findById(req.params.userId)
    const updatedUser = await findUser.update(req.body)
    res.status(200).json(updatedUser)
  } catch (error) {
    next (error)
  }
})

// DELETE /api/users/:userId
router.delete('/:userId', async (req,res,next) => {
  try {
    const deleteUser = await User.destroy({
    where: {
      id: req.params.userId
    }
  })
  res.sendStatus(204)
} catch (error) {
  next (error)
}
})
