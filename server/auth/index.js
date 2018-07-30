const router = require('express').Router()
const User = require('../db/models/user')
const { Product, Order, LineItem } = require('../db/models')
module.exports = router

router.post('/login', async (req, res, next) => {
  try {
    const user = await User.findOne({where: {email: req.body.email}})
    if (!user) {
      console.log('No such user found:', req.body.email)
      res.status(401).send('Wrong username and/or password')
    } else if (!user.correctPassword(req.body.password)) {
      console.log('Incorrect password for user:', req.body.email)
      res.status(401).send('Wrong username and/or password')
    } else {
      req.login( user, (async(err) => {
        if (err) {
          next (err)
        }
        else {
          try {
            if (req.session.cart) {
              const order = await Order.create({
                userId: user.id,
                isCart: true
              })
              const lineItems = await req.session.cart.forEach(entry => {
                LineItem.create({
                  quantity: entry.quantity,
                  price: entry.price,
                  productId: entry.productId,
                  orderId: order.id
                })
              })
            }
          } catch (error) {
            next (error)
          }
        }
        res.json(user)
      }))


        //(err ? next(err) : res.json(user)))
    }
  } catch (err) {
    next(err)
  }
})

router.post('/signup', async (req, res, next) => {
  try {
    const user = await User.create(req.body)
    req.login(user, err => (err ? next(err) : res.json(user)))
  } catch (err) {
    if (err.name === 'SequelizeUniqueConstraintError') {
      res.status(401).send('User already exists')
    } else {
      next(err)
    }
  }
})

router.post('/logout', (req, res) => {
  req.logout()
  req.session.destroy()
  res.redirect('/')
})

router.get('/me', (req, res) => {
  res.json(req.user)
})

router.use('/google', require('./google'))
