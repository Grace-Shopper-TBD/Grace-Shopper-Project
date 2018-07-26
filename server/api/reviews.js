const router = require('express').Router()
const { Review } = require('../db/models')


// GET /api/reviews
router.get('/', async(req,res,next) => {
  try{
    const reviews = await Review.findAll()
    res.json(reviews)
  }catch(error){
    next(error)
  }
})

// GET /api/reviews/:reviewId
router.get('/:id', async(req,res,next) => {
  try {
    const review = await Review.findById(req.params.id)
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
    await Review.create(req.body)
    res.sendStatus(201)
  } catch (error) {
    next(error)
  }
})

// PUT /api/reviews/:reviewId
router.put('/:reviewId', async (req,res,next) => {
  try {
    const findReview = await Review.findById(req.params.reviewId)
    const updatedReview = await findReview.update(req.body)
    res.status(200).json(updatedReview)
  } catch (error) {
    next (error)
  }
})

// DELETE /api/reviews/:reviewId
router.delete('/:reviewId', async (req,res,next) => {
  try {
    const deleteReview = await Review.destroy({
    where: {
      id: req.params.reviewId
    }
  })
  res.sendStatus(204)
} catch (error) {
  next (error)
}
})


module.exports = router
