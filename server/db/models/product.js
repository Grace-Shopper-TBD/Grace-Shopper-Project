const Sequelize = require('sequelize')
const db = require('../db')

const Product = db.define('product', {
  title: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    }
  },
  description: {
    type: Sequelize.TEXT,
    allowNull: false,
    validate: {
      notEmpty: true,
    }
  },
  price: {
    type: Sequelize.DECIMAL(10,2),
    validate: {
      min: 0.00
    }
  },
  quantity: {
    type: Sequelize.INTEGER,
    defaultValue: 0,
    validate: {
      min: 0
    }
  },
  photo: {
    type: Sequelize.STRING,
    defaultValue: 'http://covermyfb.com/media/covers/9151-beach.jpg',
  },

})

Product.findByName = async function (title) {
  try{
    const product = await Product.findAll({
      where: {
        title
      }
      })
      return product
    } catch (error){
      next(error)
  }
}

Product.prototype.isAvailable = () => {
  if (this.quantity>0){
    return true
  }
  return false
}

Product.beforeCreate((prod) => {
  if (prod.photo === '') {
    prod.photo = 'http://covermyfb.com/media/covers/9151-beach.jpg'
  }
})


module.exports = Product
