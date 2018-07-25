const {expect} = require('chai')
const db = require('../index')
const Product = db.model('product')
const User = db.model('user')
const Order = db.model('order')

let user1, product1, product2, order1

let user1Promise = User.create({
    email: 'cody@email.com',
    password: 'codyiskewt',
    isAdmin: true
})

let product1Promise = Product.create({
    title: 'Hawaii',
    description: 'a true getaway',
    price: '1500',
    quantity: 2,
    photo: 'https://www.visittheusa.com/sites/default/files/styles/hero_m_1300x700/public/images/hero_media_image/2016-11/9c4aa211000804c0267ac526a2424918.png?itok=MvvRpkwU',
    availability: 'Available'
})

let product2Promise = Product.create({
    title: 'Italy',
    description: 'escape',
    price: '2000',
    quantity: 5,
    photo: 'https://www.italymototour.com/wp-content/uploads/2017/05/positano.jpg',
    availability: 'true'
})


const CREATED = "CREATED";
const PROCESSING = "PROCESSING";
const CANCELLED = "CANCELLED";
const COMPLETED = "COMPLETED";


describe('Order model', () => {
    beforeEach(() => {
        return db 
            .sync({
                force: true
            })
    })
});

describe('field definitions', function() {
    it("includes `status, subtotal, recipientName, confirmationEmail, recipientAddress, isCart`", function(){
        return product1Promise
            .then(product1 => {
                return Order.create({
                    
                })
            })
    })
})