// const {expect} = require('chai')
// const db = require('../index')
// const Product = db.model('product')
// const User = db.model('user')
// const Order = db.model('order')

// let user1, product1, product2, order1

// let user1Promise = User.create({
//     name: 'Jack',
//     email: 'jack@email.com',
//     password: 'jackisback',
//     googleId: null,
//     isAdmin: true
// })

// let product1Promise = Product.create({
//     title: 'Hawaii',
//     description: 'a true getaway',
//     price: 1500,
//     quantity: 2,
//     photo: 'https://www.visittheusa.com/sites/default/files/styles/hero_m_1300x700/public/images/hero_media_image/2016-11/9c4aa211000804c0267ac526a2424918.png?itok=MvvRpkwU',
//     availability: 'Available'
// })

// let product2Promise = Product.create({
//     title: 'Italy',
//     description: 'escape',
//     price: 2000,
//     quantity: 5,
//     photo: 'https://www.italymototour.com/wp-content/uploads/2017/05/positano.jpg',
//     availability: 'true'
// })


// const CREATED = "CREATED";
// const PROCESSING = "PROCESSING";
// const CANCELLED = "CANCELLED";
// const COMPLETED = "COMPLETED";


// describe('Order model', () => {
//     beforeEach(() => {
//         return db 
//             .sync({
//                 force: true
//             })
//     })
// });

// describe('field definitions', function() {
//     it("includes `status, recipientName, confirmationEmail, recipientAddress, isCart`", function(){
//         return product1Promise
//             .then(product1 => {
//                 return Order.create({
//                     status: CREATED,
//                     recipientName: 'Cody',
//                     confirmationEmail: 'cody@email.com',
//                     recipientAddress: '123 pug street, ny, NY',
//                     isCart: true
//                 })
//             })
//             .then(function(order){
//                 expect(order.status).to.equal(CREATED)
//                 expect(order.recipientName).to.equal('Cody')
//                 expect(order.confirmationEmail).to.equal('cody@email.com')
//                 expect(order.recipientAddress).to.equal('123 pug street, ny, NY')
//                 expect(order.isCart).to.equal(true)
//             });
//     });
// });

// describe('associations', function(){
//     it(`belongs to a user, stored as the order's 'user'`, function() {
//         let creatingUser = User.create({
//             name: 'Cody the dog',
//             email: 'cody@puppybook.com',
//             password: 'play',
//             googleId: null,
//             isAdmin: true
//         });

//         let creatingOrder = product1Promise
//             .then(product1 => {
//                 return Order.create({
//                     status: CREATED
//                 })
//             })
//         return Promise.all([creatingUser, creatingOrder])
//             .then(([u, r]) => {
//                 user1 = u
//                 return r.setUser(u)
//             })
//             .then(function() {
//                 return Order.findOne({
//                     where: {
//                         userId: user1.id
//                     },
//                     include: {
//                         model: User,
//                         as: "user"
//                     }
//                 })
//             })
//             .then(function(foundOrder){
//                 expect(foundOrder.user).to.exist
//                 expect(foundOrder.user.name).to.equal(user1.name)
//             })

//         })
// })