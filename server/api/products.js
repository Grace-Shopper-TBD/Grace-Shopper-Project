const router = require('express').Router()
const { Product, Category } = require('../db/models')

router.get('/', async (req, res, next) => {
  try {
    const products = await Product.findAll({include: [{
      model: Category
    }]})
    if (!products) {
      const err = new Error('Products not found!')
      err.status = 404
      return next(err)
    }
    res.json(products)
  } catch (err) {
    next(err)
  }
})



module.exports = router