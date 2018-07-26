const router = require('express').Router()
const { Category } = require('../db/models')
const authorize = require('./authorize')

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

router.post('/', authorize, async (req, res, next) => {

  try {
  const thing = await Category.create(req.body)
  res.json(thing)
  }
  catch(err) {
    next(err)
  }
})

router.use('/:id', authorize, async (req, res, next) => {
  try {
    const cat = await Category.findById(req.params.id)
    req.cat = cat
    return next()
  }
  catch(err) {
    next(err)
  }
})

router.put('/:id', authorize, async(req, res, next) => {
  try {
    const cat = await req.cat.update(req.body)
    res.json(cat)
  }
  catch(err) {
    next(err)
  }
})

router.delete('/:id', authorize, async (req,res,next) => {
  try {
    const deleteCat = await Category.destroy({where: { id: req.params.id}})
  res.sendStatus(204)
  } catch (error) {
    next (error)
  }

})


module.exports = router
