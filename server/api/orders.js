const router = require('express').Router()
const { Product, User, Order, LineItem } = require('../db/models')
const authorize = require('./authorize')

router.get('/', async (req, res, next) => {
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
		console.log("user", req.user)
		const product = await Product.findById(req.body.productId)
		let order;
		if (req.session.cart) {
			order = await Order.findById(req.session.cart.id)
		}
		else {
			order = await Order.create({
				userId: 2,
				isCart: true
			})
		}
		console.log(order)
		req.session.cart = order
		const newLineItem = await LineItem.create({
			quantity: 1,
			price: product.price,
			productId: product.id,
			orderId: order.id
		})

		res.json(order)

	} catch (err) {
		next(err)
	}
})

module.exports = router