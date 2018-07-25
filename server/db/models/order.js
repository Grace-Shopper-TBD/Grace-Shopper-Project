const Sequelize = require('sequelize')
const db = require('../db')

const Order = db.define('order', {
    status: {
        type: Sequelize.ENUM('CREATED', 'PROCESSING', 'CANCELLED', 'COMPLETED'),
        defaultValue: 'CREATED',
        allowNull: false
    },
    subTotal: {
        type: Sequelize.VIRTUAL
    },
    recipientName: {
        type: Sequelize.STRING
    },
    confirmationEmail: {
        type: Sequelize.STRING
    },
    recipientAddress: {
        type: Sequelize.STRING
    }
})

module.exports = Order