/**
 * `components/index.js` exists simply as a 'central export' for our components.
 * This way, we can import all of our components from the same place, rather than
 * having to figure out which file they belong to!
 */
export {default as Navbar} from './navbar'
export {default as UserHome} from './user-home'
export {Login, Signup} from './auth-form'
export {default as ProductList} from './ProductList'
export {default as Sidebar} from './sidebar'
export{default as SingleProduct} from './SingleProduct'
export {default as AdminUsers} from './AdminUsers'
export {default as UserItem} from './UserBlock'
export {default as AdminProducts} from './AdminProducts'
export {default as UpdateProd} from './AdminUpdateForm'
export {default as Cart} from './Cart'
export {default as Footer} from './footer'
export {default as NewProd} from './AdminNewForm'
export {default as AdminCategories} from './AdminCategories'

