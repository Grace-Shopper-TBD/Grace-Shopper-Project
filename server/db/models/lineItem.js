const Sequelize = require('sequelize')
const db = require('../db')

const LineItem = db.define('lineItem', {
  quantity:{
    type: Sequelize.INTEGER,
    defaultValue: 0
  },
  price: {
    type: Sequelize.DECIMAL(14,2),
  }
})


module.exports = LineItem;
