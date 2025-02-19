import { useState } from 'react'
import './App.css'
import { Searchmovie } from './components/Searchmovie'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Moviesdetails from './components/Moviesdetails'

function App() {
  const [count, setCount] = useState(0)

  return (
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Searchmovie></Searchmovie>}></Route>
      <Route path='/moviedetail/:id' element={<Moviesdetails></Moviesdetails>}></Route>
      </Routes></BrowserRouter>
    
    
  )
}

export default App
