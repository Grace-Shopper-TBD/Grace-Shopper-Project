const Sequelize = require('sequelize')
const db = require('../db')

const Order = db.define('order', {
    status: {
        type: Sequelize.ENUM('CREATED', 'PROCESSING', 'CANCELLED', 'COMPLETED'),
        defaultValue: 'CREATED',
        allowNull: false
    },
    recipientName: {
        type: Sequelize.STRING
    },
    confirmationEmail: {
        type: Sequelize.STRING
    },
    recipientAddress: {
        type: Sequelize.STRING
    },
    isCart: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
    }
})

module.exports = Order