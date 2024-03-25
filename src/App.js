import React from 'react'
import Navbar from './Components/Navbar'
import About from './Components/About'
import Home from './Components/Home'
import Skills from './Components/Skills'
import Work from './Components/Work'
import Contact from './Components/Contact'
const App = () => {
  return (
    <div>
      <Navbar/>
      <Home/>
    <About/>
    <Skills/>
    <Work/>
    <Contact/>
    </div>
  )
}

export default App

