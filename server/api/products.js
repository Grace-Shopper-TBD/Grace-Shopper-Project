const router = require('express').Router()
const { Product, Category, Review } = require('../db/models')
const authorize = require('./authorize')

router.get('/', async (req, res, next) => {
  try {
    let products
    if(Object.keys(req.query).length>0){
      let catId = req.query.category
      products = await Product.findAll({
        includes:[{
          model:Category,
          attributes:['id']
        }],
        where:{
          id:catId
        }
      })
    }
    else{
        products = await Product.findAll({include: [{
          model: Category
        }]})
      }
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
    const product = await Product.findById(req.params.id, {
      include: [{
        model: Review
      }]
    })
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


router.post('/',authorize, async (req, res, next) => {

  try {
    const thing = await Product.create(req.body)
    res.json(thing)
  }
  catch(err) {
    next(err)
  }
})

router.use('/:id',authorize, async (req, res, next) => {
  try {
    const prod = await Product.findById(req.params.id)
    req.prod = prod
    return next()
  }
  catch(err) {
    next(err)
  }
})

router.put('/:id',authorize, async(req, res, next) => {
  try {
    const prod = await req.prod.update(req.body)
    res.json(prod)
  }
  catch(err) {
    next(err)
  }
})

router.delete('/:id',authorize, async (req,res,next) => {
  try {
    const deleteProd = await Product.destroy({where: { id: req.params.id}})
  res.sendStatus(204)
  } catch (error) {
    next (error)
  }

})



module.exports = router
