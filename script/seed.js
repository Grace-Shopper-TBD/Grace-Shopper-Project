'use strict'

const db = require('../server/db')
<<<<<<< HEAD
const {User, Product, Category, Order} = require('../server/db/models')
=======
const {User, Product, Category, Review, Order, LineItem} = require('../server/db/models')
>>>>>>> master

/**
 * Welcome to the seed file! This seed file uses a newer language feature called...
 *
 *                  -=-= ASYNC...AWAIT -=-=
 *
 * Async-await is a joy to use! Read more about it in the MDN docs:
 *
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function
 *
 * Now that you've got the main idea, check it out in practice below!
 */

async function seed() {
  await db.sync({force: true})
  console.log('db synced!')
  // Whoa! Because we `await` the promise that db.sync returns, the next line will not be
  // executed until that promise resolves!
  const users = await Promise.all([
    User.create({email: 'cody@email.com', password: '123'}),
    User.create({email: 'murphy@email.com', password: '123'}),
    User.create({email: 'karalyn.ferrari@email.com', password: 'abc123', isAdmin:true}),
    User.create({email: 'bronwyneharris@email.com', password: '123', isAdmin:true}),
    User.create({email: 'shoshanarosenfield@email.com', password: 'graceshoppertbd123', isAdmin:true}),
    User.create({email: 'ebner.ali@email.com', password: 'tbd123', isAdmin:true})

  ])
  const products = await Promise.all([
    Product.create({
    title: 'Hawaii',
    description: 'Lets get some sun!',
    price: 2000,
    quantity: 2,
    availability: 'Available'
  }),
    Product.create({
    title: 'Italy',
    description: 'Lets eat some pasta!',
    price: 1500,
    quantity: 2,
    availability: 'Available'
  })
])
const categories = await Promise.all([
  Category.create({
  name: 'Romantic Getaway',
}),
  Category.create({
  name: 'Family Vacation',
})
// console.log('categories',categories)
])
<<<<<<< HEAD
const orders = await Promise.all([
  Order.create({
    status: 'PROCESSING',
    recipientName: 'Cody',
    confirmationEmail: 'cody@email.com',
    recipientAddress: '23 Puppy Street',
    isCart: false
  }),
  Order.create({
    status: 'CREATED',
    recipientName: 'Jack',
    confirmationEmail: 'jack@isback.com',
    recipientAddress: '56 Apple Street',
    isCart: true
  }),
  Order.create({
    status: 'CANCELLED',
    recipientName: 'Patty',
    confirmationEmail: 'patty@pat.com',
    recipientAddress: '234 fiction road',
    isCart: false
  }),
  Order.create({
    status: 'COMPLETED',
    recipientName: 'Patty',
    confirmationEmail: 'patty@pat.com',
    recipientAddress: '234 fiction road',
    isCart: true
  })
])
=======
const reviews = await Promise.all([
  Review.create({
    text: `I loved the hotel and entire trip!! I can't wait to go back!!`,
    
  }),
  Review.create({
    text: `It was an amazing week long trip!! I highly recommend to anyone looking into this destination!`
  })
])
// console.log('REVIEWS',reviews[0])
>>>>>>> master

await Promise.all([
  products[0].addCategory(categories[0]),
  products[1].addCategory(categories[1])
])

await Promise.all([
  reviews[0].setUser(users[0]),
  reviews[1].setUser(users[1])
])

await Promise.all([
  reviews[0].setProduct(products[0]),
  reviews[1].setProduct(products[1])
])
  // Wowzers! We can even `await` on the right-hand side of the assignment operator
  // and store the result that the promise resolves to in a variable! This is nice!
  console.log(`seeded ${users.length} users`)
  console.log(`seeded ${products.length} products`)
  console.log(`seeded ${categories.length} categories`)
<<<<<<< HEAD
  console.log(`seeded ${orders.length} orders`)
=======
  console.log(`seeded ${reviews.length} reviews`)
>>>>>>> master
  console.log(`seeded successfully`)
}

// We've separated the `seed` function from the `runSeed` function.
// This way we can isolate the error handling and exit trapping.
// The `seed` function is concerned only with modifying the database.
async function runSeed() {
  console.log('seeding...')
  try {
    await seed()
  } catch (err) {
    console.error(err)
    process.exitCode = 1
  } finally {
    console.log('closing db connection')
    await db.close()
    console.log('db connection closed')
  }
}

// Execute the `seed` function, IF we ran this module directly (`node seed`).
// `Async` functions always return a promise, so we can use `catch` to handle
// any errors that might occur inside of `seed`.
if (module === require.main) {
  runSeed()
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed
