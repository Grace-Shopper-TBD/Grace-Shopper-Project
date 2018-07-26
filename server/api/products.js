const router = require('express').Router()
const { Product, Category } = require('../db/models')
const authorize = require('./authorize')

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

router.get('/:id', async(req,res,next) => {
  try {
    const product = await Product.findById(req.params.id)
    if(!product) {
      const err = new Error('No product found!')
      err.status = 404
      return next(err)
    }
    res.json(product)
  } catch(err){
    next(err)
  }
})


router.post('/', async (req, res, next) => {

  try {
    const thing = await Product.create(req.body)
    res.json(thing)
  }
  catch(err) {
    next(err)
  }
})

router.use('/:id', async (req, res, next) => {
  try {
    const prod = await Product.findById(req.params.id)
    req.prod = prod
    return next()
  }
  catch(err) {
    next(err)
  }
})

router.put('/:id', async(req, res, next) => {
  try {
    const prod = await req.prod.update(req.body)
    res.json(prod)
  }
  catch(err) {
    next(err)
  }
})

router.delete('/:id', async (req,res,next) => {
  try {
    const deleteProd = await Product.destroy({where: { id: req.params.id}})
  res.sendStatus(204)
  } catch (error) {
    next (error)
  }

})



module.exports = router
