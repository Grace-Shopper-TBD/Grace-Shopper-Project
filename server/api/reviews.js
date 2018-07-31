const router = require('express').Router()
const { User, Review } = require('../db/models')


// GET /api/reviews
router.get('/', async(req,res,next) => {
  try{
    const reviews = await Review.findAll({
      include: [User]
    })
    res.json(reviews)
  }catch(error){
    next(error)
  }
})

// GET /api/reviews/:id
router.get('/:id', async(req,res,next) => {
  try {
    const review = await Review.findById(req.params.id, {
      include: [User]
    })
    if(!review) {
      const err = new Error('No review found!')
      err.status = 404
      return next(err)
    }
    res.json(review)
  } catch(err){
    next(err)
  }
})

// POST /api/reviews
router.post('/', async (req, res, next) => {
  try {
    const updatedBody = {
      text: req.body.text,
      productId: req.body.productId,
      userId: req.user ? +req.user.id : null,
    }
    await Review.create(updatedBody)
    res.sendStatus(201)
  } catch (error) {
    next(error)
  }
})

// PUT /api/reviews/:id
router.put('/:id', async (req,res,next) => {
  try {
    const findReview = await Review.findById(req.params.id)
    const updatedReview = await findReview.update(req.body)
    res.status(200).json(updatedReview)
  } catch (error) {
    next (error)
  }
})

// DELETE /api/reviews/:id
router.delete('/:id', async (req,res,next) => {
  try {
    console.log('req.params', req.user.id, req.params)
    if(req.user){
      const findReview = await Review.findOne({
      where: {
        id: req.params.id,
        userId: req.user.id
      }
    })
    if(findReview) {
      await findReview.destroy()
      res.sendStatus(204)
    }
    else res.sendStatus(401)
    }
} catch (error) {
  next (error)
}
})


module.exports = router
