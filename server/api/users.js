
const router = require('express').Router()
const {User} = require('../db/models')

module.exports = router

// GET /api/users
router.get('/', async (req, res, next) => {
  try {
    const users = await User.findAll({
      // explicitly select only the id and email fields - even though
      // users' passwords are encrypted, it won't help if we just
      // send everything to anyone who asks!
      attributes: ['id', 'email', 'isAdmin']
    })
    res.json(users)
  } catch (err) {
    next(err)
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
