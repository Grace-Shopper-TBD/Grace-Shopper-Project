const router = require('express').Router()
const { Product, Order, LineItem, Review, User, } = require('../db/models')
const authorize = require('./authorize')

router.get('/', authorize, async (req, res, next) => {
	try {
		const orders = await Order.findAll({
			where: {
				isCart: false
			},
			include: [{
				model: Product,
			},{
				model: User,
				attributes: ['name', 'email']}]
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
			if (!cart) {
				return res.json([])
			}
			if (!req.session.cart) {
				req.session.cart = cart.products.map(product => product.lineItem)
			}
			return res.json(req.session.cart)
		}
	   if (req.session.cart) {
		return res.json(req.session.cart)
		}

		res.json([])

	} catch (err) {
		next(err)
	}
})

router.get('/user/:userId', async (req, res, next) => {
	try {
		const orders = await Order.findAll({
			where: {
				userId: req.params.userId,
				isCart: false
			},
			include: [{
				model: Product
			}]
		})
		if (!orders) {
			const err = new Error('No Orders Found')
			return next(err)
		}
		res.json(orders)
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

const userLineItem = async (userId, product) => {
	const [ order, wasCreated ] = await Order.findOrCreate({
					where: {
						userId: userId,
						isCart: true
					},
					defaults:
					{
						userId: userId,
						isCart: true
					}})
			let [ newLineItem, created ] = await LineItem.findOrCreate({
					where: {
						orderId: order.id,
						productId: product.id
					},
					defaults:
					{
					quantity: 1,
					price: product.price,
					productId: product.id,
					orderId: order.id
				}})
		return [ newLineItem, created ]
}

const sessionLineItem = product => {
	return {
		productId: product.id,
		quantity: 1,
		price: product.price
	}
}

router.post('/', async (req, res, next) => {
	//assuming req.body is product object
	try {
		if (req.user) {
			let [ newLineItem, created ] = await userLineItem(req.user.id, req.body)
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
				if (lineItem) lineItem.quantity++
			}
			if (!lineItem) {
				lineItem = sessionLineItem(req.body)
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
		//assuming req.body is an object with recipientName and recipientAddress (and possibly confirmation email)
		if (req.user) {
			const order = await Order.findOne({
				where: {
					userId: req.user.id,
					isCart: true
				},
				include: [{
					model: Product
				}]
			})
			await order.update({
				recipientName: req.body.recipientName,
				recipientAddress: req.body.recipientAddress,
				status: 'PROCESSING'
			})
			req.session.cart = order.products.map(product => product.lineItem)
		}
		else {
			const guestOrder = await Order.create({
				recipientName: req.body.recipientName,
				recipientAddress: req.body.recipientAddress,
				confirmationEmail: req.body.confirmationEmail,
				status: "PROCESSING"
			})
			await req.session.cart.forEach(entry => LineItem.create({
				quantity: entry.quantity,
				price: entry.price,
				productId: entry.productId
			}))
		}

		req.session.cart.forEach(entry => {
			Product.findById(entry.productId).then(product => product.decrement('quantity', { by: 1 })).catch()
		})

		req.session.cart = null
		res.sendStatus(204)

	} catch (err) {
		next(err)
	}
})



router.put('/cart/:productId', async (req, res, next) => {
	//assuming req.body is the new quantity
	try {
		console.log("req body!!!!!!!!", req.body)
		console.log("old cart", req.session.cart)

		const entryToUpdate = req.session.cart.find(entry => entry.productId === +req.params.productId)
		entryToUpdate.quantity = +req.body.quantity
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
		console.log("new cart", req.session.cart)
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
		const entryToDelete = req.session.cart.find(entry => entry.productId === +req.params.productId)
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

