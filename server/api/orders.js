const router = require('express').Router()
const { Product, Order, LineItem } = require('../db/models')
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

router.get('/cart', async (req, res, next) => {
	try {
		if (req.session.cart) {
			return res.json(req.session.cart)
		}

		if (req.user) {
			const cart = await Order.findOne({
				where: {
					userId: req.user.id,
					isCart: true
				},
				include: [{
					model: Product
				}]
			})
			console.log(cart)
			if (!cart) {
				return res.send('Cart is Empty')
		}
			return res.json(cart)
		}
		res.json("Cart is Empty")

	} catch (err) {
		next(err)
	}
})

router.get('/:orderId', authorize, async (req, res, next) => {
	try {
		const order = await Order.findById(req.params.orderId)
		if (!order) {
			const err = new Error('Order Not Found')
			err.status = 404
			return next(err)
		}
		res.json(order)
	} catch (err) {
		next(err)
	}
})

router.post('/', async (req, res, next) => {
	//assuming req.body is product object
	try {
		if (req.user) {
			 const [ order, wasCreated ] = await Order.findOrCreate({
					where: {
						userId: req.user.id,
						isCart: true
					},
					defaults: 
					{
						userId: req.user.id,
						isCart: true
					}})
			let [ newLineItem, created ] = await LineItem.findOrCreate({
					where: {
						orderId: order.id,
						productId: req.body.id
					},
					defaults:
					{
					quantity: 1,
					price: req.body.price,
					productId: req.body.id,
					orderId: order.id
				}})
			if (!created) {
				newLineItem = await newLineItem.update({
					quantity: newLineItem.quantity + 1
				})
				req.session.cart = req.session.cart ? req.session.cart.filter(entry => entry.productId !== newLineItem.productId) : req.session.cart
			}
			req.session.cart ? req.session.cart.push(newLineItem) : req.session.cart = [newLineItem]
		}

		else {
			let lineItem;
			if (req.session.cart) {
				lineItem = req.session.cart.find(entry => entry.productId === req.body.id)
				lineItem.quantity++
			}
			if (!lineItem) {
				lineItem = {
				productId: req.body.id,
				quantity: 1,
				price: req.body.price
				}
				req.session.cart ? req.session.cart.push(lineItem) : req.session.cart = [lineItem]
			}
		}
		res.json(req.session.cart)
	} catch (err) {
		next(err)
	}
})

router.post('/checkout', async (req, res, next) => {
	try {
		//assuming req.body is an object with recipientName and recipientAddress
		if (req.user) {
			const order = await Order.findOne({
				where: {
					userId: req.user.id,
					isCart: true
				}
			})
			await order.update({
				recipientName: req.body.recipientName,
				recipientAddress: req.body.recipientAddress,
				status: 'PROCESSING'
			})
		}
			req.session.cart = null
			res.sendStatus(204)

	} catch (err) {
		next(err)
	}
})



router.put('/cart/:productId', async (req, res, next) => {
	//assuming req.body is the new quantity
	console.log(req.body)
	console.log(req.session)
	try {
		const entryToUpdate = req.session.cart.find(entry => entry.productId === +req.params.productId)
		console.log(entryToUpdate)
		entryToUpdate.quantity = req.body.quantity

		if (req.user) {
			const lineItem = await LineItem.findOne({
				where: {
					orderId: entryToUpdate.orderId,
					productId: req.params.productId
				}
			})
			const updatedLineItem = await lineItem.update({
				quantity: req.body.quantity
			})
			if (updatedLineItem.quantity === 0) {
				await updatedLineItem.destroy()
			}
		}
		req.session.cart = req.session.cart.filter(entry => entry.quantity > 0)
		res.json(req.session.cart)

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
		console.log(req.session)
		const entryToDelete = req.session.cart.find(entry => entry.productId === +req.params.productId)
		console.log(entryToDelete)
		req.session.cart = req.session.cart.filter(entry => entry.productId !== +req.params.productId)

		const lineItemToDelete = await LineItem.findOne({
			where: {
				orderId: entryToDelete.orderId,
				productId: req.params.productId
			}
		})
		await lineItemToDelete.destroy()
		res.status(204).send(req.session.cart)
	} catch (err) {
		next(err)
	}
})



module.exports = router