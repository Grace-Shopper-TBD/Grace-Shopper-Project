const router = require('express').Router()
const { Product, User, Order, LineItem } = require('../db/models')
const authorize = require('./authorize')

router.get('/', authorize, async (req, res, next) => {
	try {
		const orders = await Order.findAll({
			include: [{
				model: Product
			}]
		})
		if (!orders) {
			const err = new Error('Orders Not Found')
			err.status = 404
			return next(err)
		}
		res.json(orders)
	} catch (err) {
		next(err)
	}
})

router.post('/', async (req, res, next) => {
	try {
		const product = await Product.findById(req.body.productId)
		req.session.cart = req.session.cart ? await Order.findById(req.session.cart.id)
		 : await Order.create({
				userId: 1,
				isCart: true
			})
		const newLineItem = await LineItem.create({
			quantity: 1,
			price: product.price,
			productId: product.id,
			orderId: req.session.cart.id
		})
		res.json(req.session.cart)

	} catch (err) {
		next(err)
	}
})

module.exports = router