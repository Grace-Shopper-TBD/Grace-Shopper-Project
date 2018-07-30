import React from 'react'

import {Navbar, Sidebar, Footer} from './components'
import Routes from './routes'

const App = () => {
  return (
    <div>
      <Navbar />
      <Sidebar />
      <Footer />
      <Routes />
    </div>
  )
}

export default App
