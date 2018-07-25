const router = require('express').Router()
const { Category } = require('../db/models')

router.get('/', async (req, res, next) => {
  try {
    const categories = await Category.findAll()
    if (!categories) {
      const err = new Error('Categories not Found')
      err.status = 404
      return next(err)
    }
    res.json(categories)
  } catch (err) {
    next(err)
  }
})



module.exports = router
