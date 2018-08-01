const User = require('./user')
const Product = require('./product')
const Order = require('./order')
const Category = require ('./category')
const LineItem = require('./lineItem')
const Review = require('./review')


/**
 * If we had any associations to make, this would be a great place to put them!
 * ex. if we had another model called BlogPost, we might say:
 *
 *    BlogPost.belongsTo(User)
 */

/**
 * We'll export all of our models here, so that any time a module needs a model,
 * we can just require it from 'db/models'
 * for example, we can say: const {User} = require('../db/models')
 * instead of: const User = require('../db/models/user')
 */
Product.belongsToMany(Category, {through: 'product_categories'})
Category.belongsToMany(Product, {through: 'product_categories'})

Product.belongsToMany(Order, {through: LineItem})
Order.belongsToMany(Product, {through: LineItem})

Order.belongsTo(User)
User.hasMany(Order)

User.hasMany(Review)
Review.belongsTo(User)

Review.belongsTo(Product, { onDelete: 'cascade' })
Product.hasMany(Review)

module.exports = {
  User,
  Product,
  Category,
  LineItem,
  Review,
  Order
}
