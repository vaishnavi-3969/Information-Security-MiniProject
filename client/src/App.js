import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Auth from './Auth'

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Auth />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App