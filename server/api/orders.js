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
				userId: req.user.id,
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

router.get('/cart', async (req, res, next) => {
	try {
		if (!req.session.cart) {
			return res.send('Cart is Empty')
		}
		const cart = await Order.findById(req.session.cart.id, {
			include: [{
				model: Product
			}]
		})
		if (!cart) {
			const err = new Error('Cart Not Found')
			return next(err)
		}
		else {
			res.json(cart)
		}
	} catch (err) {
		next(err)
	}
})

router.put('/cart/:productId', async (req, res, next) => {
	try {
		const lineItem = await LineItem.findOne({
			where: {
				orderId: req.session.cart.id,
				productId: req.params.productId
			}
		})
		const updatedLineItem = await lineItem.update({
			quantity: req.body.quantity
		})
		if (updatedLineItem.quantity === 0) {
			await updatedLineItem.destroy()
		}
		res.json(updatedLineItem)
	} catch (err) {
		next(err)
	}
})

router.put('/:orderId', authorize, async (req, res, next) => {
	try {
		const orderToUpdate = await Order.findById(req.params.orderId)
		const updatedOrder = await orderToUpdate.update(req.body)
		res.json(updatedOrder)
	} catch (err) {
		next(err)
	}
})

router.delete('/cart/:productId', async (req, res, next) => {
	try {
		const lineItemToDelete = await LineItem.findOne({
			where: {
				orderId: req.session.cart.id,
				productId: req.params.productId
			}
		})
		await lineItemToDelete.destroy()
		res.sendStatus(204)
	} catch (err) {
		next(err)
	}
})



module.exports = router