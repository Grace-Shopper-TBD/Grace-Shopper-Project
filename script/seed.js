'use strict'

const db = require('../server/db')
const {User, Product, Category, Review, Order, LineItem} = require('../server/db/models')

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
    User.create({name: 'Cody', email: 'cody@email.com', password: '123'}),
    User.create({name: 'Murphy', email: 'murphy@email.com', password: '123'}),
    User.create({name: 'Karalyn', email: 'karalyn.ferrari@email.com', password: 'abc123', isAdmin:true}),
    User.create({name: 'Bronwyn', email: 'bronwyneharris@email.com', password: '123', isAdmin:true}),
    User.create({name: 'Shoshana', email: 'shoshanarosenfield@email.com', password: 'graceshoppertbd123', isAdmin:true}),
    User.create({name: 'Ali', email: 'ebner.ali@email.com', password: 'tbd123', isAdmin:true})

  ])
  const products = await Promise.all([
    Product.create({
    title: 'Hawaii',
    description: 'Lets get some sun!',
    price: 2000,
    quantity: 15,
    availability: 'Available',
    photo: 'http://allomamantoutvabien.com/wp-content/uploads/2017/03/Hawaii-oahu-tortues-770x578.jpg'
  }),
    Product.create({
    title: 'Italy',
    description: 'Lets eat some pasta!',
    price: 1500,
    quantity: 12,
    availability: 'Available',
    photo:'http://www.domondonart.com/wp-content/uploads/2016/06/VeniceItaly-restaurant-600x600.jpg'
  }),
    Product.create({
      title: 'Disneyland',
      description: 'the Happiest Place on Earth',
      price: 2500,
      quantity: 15,
      availability: 'Available',
      photo: 'https://secure.cdn1.wdpromedia.com/resize/mwImage/1/900/360/75/dam/wdpro-assets/dlr/parks-and-tickets/destinations/disneyland-park/disneyland-00-full.jpg?1530195031483'
  }),
    Product.create({
    title: 'Sydney',
    description: 'P.Sherman 42 Wallaby Way',
    price:2300,
    quantity: 14,
    availability: 'Available',
    photo: 'http://sf.co.ua/12/12/wallpaper-2485627.jpg'
  }),
    Product.create({
      title: 'Tokyo',
      description: 'Trains that come on time!',
      price: 1400,
      quantity: 15,
      availability: 'Available',
      photo: 'https://cdn.cnn.com/cnnnext/dam/assets/170606110126-tokyo-skyline.jpg'
    }),
    Product.create({
      title: 'Paris',
      description: 'Where anyone can cook (even the rats)',
      price: 1600,
      quantity: 17,
      availability: 'Available',
      photo: 'http://cdn4.dlp-media.com/resize/mwImage/1/630/354/75/wdpromedia.disney.go.com/media/wdpro-dlp-assets/prod/en-gb/system/images/n017729_2050jan01_ratatouille-laventure-completement-toquee_16-9.jpg'
    }),
    Product.create({
      title: 'Iceland',
      description: 'There’s two reasons to go to Iceland: the Aurora Borealis, and Riley Blue. One is a natural phenomenon so beautiful it will blow your mind; and the other is just some pretty light in the sky.',
      price: 2100,
      quantity:23,
      availability: 'Available',
      photo: 'https://www.truenorth.is/wp-content/uploads/2017/08/SENSE8-PHOTO3-1266x613.png'
    })

])
const categories = await Promise.all([
  Category.create({
  name: 'Romantic Getaway',
}),
  Category.create({
  name: 'Family Vacation',
}),
  Category.create({
    name: 'Action'
  }),
  Category.create({
    name: 'Beaches'
  }),
  Category.create({
    name: 'Instagram Worthy'
  })

])
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
    status: 'CREATED',
    recipientName: 'Patty',
    confirmationEmail: 'patty@pat.com',
    recipientAddress: '234 fiction road',
    isCart: true
  })
])

const lineItems = await Promise.all([
  LineItem.create({
    orderId:2,
    productId:1,
    price: 15000,
    quantity: 1
  })])

const reviews = await Promise.all([
  Review.create({
    text: `I loved the hotel and entire trip!! I can't wait to go back!!`,

  }),
  Review.create({
    text: `It was an amazing week long trip!! I highly recommend to anyone looking into this destination!`
  })
])

await Promise.all([
  products[0].addCategory(categories[0]),
  products[1].addCategory(categories[1]),
  products[0].addCategory(categories[3]),
  products[0].addCategory(categories[4]),
  products[1].addCategory(categories[3]),
  products[1].addCategory(categories[4]),
  products[2].addCategory(categories[1]),
  products[2].addCategory(categories[4]),
  products[2].addCategory(categories[2]),
  products[2].addCategory(categories[3]),
  products[3].addCategory(categories[3]),
  products[4].addCategory(categories[0]),
  products[4].addCategory(categories[4]),
  products[5].addCategory(categories[3]),
  products[5].addCategory(categories[4])
])

await Promise.all([
  reviews[0].setUser(users[0]),
  reviews[1].setUser(users[1])
])

await Promise.all([
  reviews[0].setProduct(products[0]),
  reviews[1].setProduct(products[1])
])

await Promise.all([
  orders[0].addProduct(products[0]),
  orders[1].addProduct(products[2]),
  orders[0].addProduct(products[3]),
  orders[2].addProduct(products[4]),
  orders[3].addProduct(products[5])
])

await Promise.all([
  orders[0].setUser(users[3]),
  orders[1].setUser(users[2]),
  orders[2].setUser(users[4]),
  orders[3].setUser(users[5])
])

  // Wowzers! We can even `await` on the right-hand side of the assignment operator
  // and store the result that the promise resolves to in a variable! This is nice!
  console.log(`seeded ${users.length} users`)
  console.log(`seeded ${products.length} products`)
  console.log(`seeded ${categories.length} categories`)
  console.log(`seeded ${orders.length} orders`)
  console.log(`seeded ${reviews.length} reviews`)
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
