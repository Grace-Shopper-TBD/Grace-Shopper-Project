const User = require('./user')
const Product = require('./product')

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

 /*

 User.hasMany(Review)
 Review.belongsTo(User)



 Product.belongsToMany(Order, {through: 'product_orders'})
 Order.belongsToMany(Product, {through: 'product_orders'})

 Order.belongsTo(User)
 User.hasMany(Order)

 Review.belongsTo(Product)
 Product.hasMany(Review)
 */
module.exports = {
  User,
  Product
}
